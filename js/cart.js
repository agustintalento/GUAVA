let envioGratis = false;
let costoEnvio = 50;
let arrayCatalogo = [];

/* creo funcion asincronica, donde se hace una petición de los datos en un archivo JSON, y a este
array lo mostramos en la pagina catalogo, si la petición falla, se logea error en la consola */

const getJSONdata = async() => {

    try {
        const resp = await fetch('../catalogo.JSON');
        const data = await resp.json();

        data.forEach(planta => {document.getElementById('plantas').innerHTML +=  `
            <div class="card align-items-center" style="width: 18rem;">
                <img src="${planta.src}" class="card-img-top" alt="dracena">
            <div class="card-body">
                <p class="card-text plantaNombre">${planta.nombre}</p>
                <p class="card-text plantaNombre">$ ${planta.precio}</p>
                <label for="${planta.nombre}">Cantidad: </label>
                <input id="${planta.nombre}" type="number" value="0" min="0" max="${planta.stock}" />
                <p id="disponibilidad${planta.nombre}"></p>
            </div>
            </div>
        `
        
        });

        return data;
    } catch (error) {
        console.log(error);
    }

}

/* se crea evento al cargar el dom donde se hace la petición de los datos, y se agregan los 
event listeners de cada input y una alerta al agregar producto al carrito de compras */

document.addEventListener("DOMContentLoaded", async function(e){
    arrayCatalogo = await getJSONdata();

    arrayCatalogo.forEach(planta => {
        document.getElementById(planta.nombre).addEventListener("input", actualizarPrecio);
    }) 

    document.getElementById("botonCarrito").addEventListener("click", displayPrecioFinal);
    document.getElementById("botonCarrito").addEventListener("click", () => {
        Swal.fire(
            'Se agregó tu producto al carrito',
            'Continúa viendo más productos',
            'success'
        )}
    );
   
    localStorage.clear();
    localStorage.setItem('Ganancia Total', 0);
    actualizarPrecio();
    stockDisponible();

})

/* creo array de precios de las plantas elegidas por el usuario */

function arrayPrecios() {
    let precioArticulos =[];
    arrayCatalogo.forEach(planta => { 
        for (let i = 0; i < parseInt(document.getElementById(planta.nombre).value); i++) {
            precioArticulos.push(planta.precio);
            
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
    arrayCatalogo.forEach(planta => { 
        let {nombre, stock} = planta;

        document.getElementById(nombre).value < stock ? (
                
            planta.stock -= parseInt(document.getElementById(nombre).value)
        ) 
        : ( planta.stock = 0,
            document.getElementById(nombre).disabled = true,
            document.getElementById(nombre).hidden = true,
            document.getElementById('disponibilidad'+nombre).innerHTML = `
                No hay stock disponible
            
            `
        )
        stockActual[nombre] = planta.stock;
        document.getElementById(nombre).max = planta.stock;
        document.getElementById(nombre).value = 0;
    });
    localStorage.setItem('Stock', JSON.stringify(stockActual));

}

/* despliego el precio final en el html y calcula si el envio es gratis o no,
guardo la ganancia por compra, y ganancia total en el local storage */

function displayPrecioFinal(e) {
    
    e.preventDefault();

    let precioFinal = calculoTotal();
    let gananciaTotal = parseInt(localStorage.getItem('Ganancia Total'));

    precioFinal >= 1000 ? (
        envioGratis = true,
        document.getElementById('precioTotal').innerHTML = 
        `el precio final es de $ ${precioFinal} y el envio es gratis`,
        localStorage.setItem('Ganancia', precioFinal - costoEnvio) ,
        localStorage.setItem('Ganancia Total', gananciaTotal + precioFinal - costoEnvio)
        
        ) : (
        document.getElementById('precioTotal').innerHTML = 
        `el precio final es de $ ${precioFinal}`,
        localStorage.setItem('Ganancia', precioFinal),
        localStorage.setItem('Ganancia Total', gananciaTotal + precioFinal)


    )

    stockDisponible();
}


/* funcion que actualiza el subtotal, variando el monto modificado en los inputs */

function actualizarPrecio() {
    
    let listaPrecios = arrayPrecios();
    let subtotal = suma(...listaPrecios);
    

    document.getElementById("subtotal").innerHTML = `El subtotal es ${subtotal}`;
}