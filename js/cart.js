let costoEnvio = 50;
let arrayCatalogo = [];

/* creo funcion asincronica, donde se hace una petición de los datos en un archivo JSON, y a este
array lo mostramos en la pagina catalogo, si la petición falla, se logea error en la consola */

const getJSONdata = async() => {

    try {
        const resp = await fetch('../catalogo.JSON');
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}

/* creo array de precios de las plantas elegidas por el usuario */

function arrayPrecios() {
    let precioArticulos =[];
    carrito.forEach(item => { 
        let plantaItem = arrayCatalogo.find(function(planta) {
        return item.id == planta.id; } ) 
        for (let i = 0; i < parseInt(document.getElementById(item.id).value); i++) {
            precioArticulos.push(plantaItem.precio);    
        }
    });
    return precioArticulos;
}

/* calcula la promocion 3x2, siendo gratis el de menor precio*/
function promocion(){

    let precioArticulos = arrayPrecios();

    if (precioArticulos.length > 2) {
        precioArticulos.sort(function(a, b) {
            return a - b;
        });
        
        for (let i= 0; i < Math.floor((precioArticulos.length)/3) ; i++) {
            precioArticulos[i] = 0;
        }    
    }
    return precioArticulos;
}

/*creo funcion suma aplicando spread*/

function suma(...numeros) {
    let total = 0;
    numeros.forEach( numero => {
        total += numero;
    });
    return total;
}

/* calculo precio final de la compra, con la promocion incluida */

function calculoTotal() {
    let precioArticulos = promocion();
    let precioFinal = suma(...precioArticulos);
    
    return precioFinal;

}

/* función que calcula el stock disponible de cada articulo, 
si no hay stock se deshabilita el input y se escribe el mensaje correspondiente
ademas se setea el stock en el localStorage */

function stockDisponible(){
    let stockActual ={};
    carrito.forEach(item => { 
        let planta = arrayCatalogo.find(function(planta) {
        return item.id == planta.id; } ); 

        let {id, nombre, stock} = planta;

        document.getElementById(id).value < stock ? (
                
            planta.stock -= parseInt(document.getElementById(id).value)
        ) 
        : ( planta.stock = 0,
            document.getElementById(id).disabled = true,
            document.getElementById(id).hidden = true,
            document.getElementById('disponibilidad'+id).innerHTML = `
                No hay stock disponible
            
            `
        )
        stockActual[nombre] = planta.stock;
        document.getElementById(id).max = planta.stock;
        document.getElementById(id).value = 1;
    });
    localStorage.setItem('Stock', JSON.stringify(stockActual));

}

/* despliego el precio final en el html 
además de mostrar con libreria que la compra fue exitosa y calcula y muestra si el envío es gratis o no
cuando la compra finaliza, se quitan los elementos del carrito y nos redirecciona al index*/

function displayPrecioFinal() {

    let precioFinal = calculoTotal();


    precioFinal >= 1000 ? (
        Swal.fire({
            icon : 'success',
            html: `<p>Su compra se realizó con éxito</p>
            <p>El precio final es de $ ${precioFinal} y el envío es GRATIS</p>
            <button type="button" onclick="window.location.href='../index.html'" class="btn btn-secondary">OK</button>`,
            showConfirmButton: false,
        })
        
 
        ) : (
            Swal.fire({
                icon : 'success',
                html: `<p>Su compra se realizó con éxito</p>
                    <p>el precio final es de $ ${precioFinal}</p>
                    <button type="button" onclick="window.location.href='../index.html'" class="btn btn-secondary">OK</button>`,
                showConfirmButton: false,
            })

    )

    stockDisponible();
    
    for(i = carrito.length-1; i >= 0; i--) {
        quitarItem(carrito[i].id);
    }
}


/* funcion que actualiza el subtotal y el total, cuando se varía el monto modificado en los inputs */

function actualizarPrecio() {
    
    let listaPrecios = arrayPrecios();
    let subtotal = suma(...listaPrecios);
    let total = calculoTotal();

    document.getElementById("subtotal").innerHTML = `$ ${subtotal}`;
    document.getElementById("total").innerHTML = `$ ${total}`;
}

/* nos muestra los items del carrito que los guardamos en el local storage, en nuestra pagina cart
y agrega un event listener en los inputs de cada planta */

function mostrarCarrito() {
    let DIV = document.getElementById('carritoTable');
    DIV.innerHTML = '';
    carrito.forEach(item => {
        let plantaItem = arrayCatalogo.find(function(planta) {
            return item.id == planta.id; } ) 
        DIV.innerHTML += `

            <tr>
                <th scope="row">
                    <button type="button" class="btn-close" onclick="quitarItem(${plantaItem.id})"></button>
                    <label for="${plantaItem.id}">Cantidad: </label>
                    <input id="${plantaItem.id}" type="number" value="1" min="1" max="${plantaItem.stock}" />
                    <p id="disponibilidad${plantaItem.id}"></p>
                </th>
                <td style="width:200px;"><img src="${plantaItem.src}" class="card-img-top" style="width: 8rem; border: none"></td>
                <td><p class="card-text plantaNombre" style="padding-right: 20px;">${plantaItem.nombre}</p></td>
                <td><p class="card-text plantaNombre">$ ${plantaItem.precio}</p></td>
            </tr>

        `
    })
    DIV.innerHTML += `
        <tfooter>
            <tr>
                
                <td></td>
                <td></td>
                <th style="padding-left:500px;">Subtotal</th>
                <td id=subtotal>$0</td>
            </tr>
            
            <tr>
                <td></td>
                <td></td>
                <th style="padding-left:500px;">Total</th>
                <td id=total>$0</td>
            </tr>
        </tfooter>
    `

    carrito.forEach(item => {
        document.getElementById(item.id).addEventListener("input", actualizarPrecio);
    });
    actualizarPrecio();
}

/* se crea evento al cargar el dom donde se hace la petición de los datos, y se agregan los 
event listener en el boton de compra final */

document.addEventListener("DOMContentLoaded", async function(e){
    arrayCatalogo = await getJSONdata();

    document.getElementById("botonCarrito").addEventListener("click", displayPrecioFinal);
      
   
    mostrarCarrito();
    stockDisponible();
})