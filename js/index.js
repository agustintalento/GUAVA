//El sitio es un ecommerce de una tienda de plantas
//en esta primera instancia, la idea es crear un cálculo de descuentos por promoción 3x2 y
//además setear envio gratis cuando el precio es mayor a $1000

let envioGratis = false;
let costoEnvio = 50;

/* con el siguiente constructor, la idea es importar las plantas, para mostrarlas en el index 
en forma de cards. El index va a tener una sección de plantas recomendadas, donde se clickea una planta
y se abre un modal con info detallada de la misma. El usuario indica la cantidad que quiere 
agregar al carrito de compras, donde finalmente se suman los totales y se hace la compra*/

function planta(nombre, tipo, altura, macetaIncluida, precio, stock, src) {

    this.nombre = nombre;
    this.tipo = tipo;
    this.altura = altura;
    this.macetaIncluida = macetaIncluida;
    this.precio = precio;
    this.stock = stock;
    this.src = src;
}


const dracena = new planta('Dracena', 'Arbusto', '55', true,  1100, 12, './img/productos/dracena.jpg');
const pilea = new planta('Pilea peperomioides', 'Herbácea', '12', true, 400, 10, './img/productos/pilea.jpg');
const crisantemo = new planta('Crisantemo', 'Herbácea', '30', true, 320, 15, './img/productos/crisantemo.jpg');

let arrayPlantas = [dracena, pilea, crisantemo];

arrayPlantas.forEach(planta => {document.getElementById('plantas').innerHTML +=  `

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

/* creo array de precios de las plantas elegidas por el usuario */

function arrayPrecios() {
    let precioArticulos =[];
    arrayPlantas.forEach(planta => { 
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
    arrayPlantas.forEach(planta => { 
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

/* eventos que se llaman en los inputs del html utilizando las funciones 
creadas previamente, se utiliza el domContentLoaded para asegurar que la pagina haya cargado 
actualizo el stock en el localStorage, y la ganancia total cuando se vuelve a cargar la pagina
*/

/*agregué la librería sweet alert, para que cuando se agreguen productos al carrito se nos notifique.
me pareció una buena herramienta para distinguir cuando se agrega el producto al carro,
cosa que no ocurría antes de utilizar esta alerta. */

document.addEventListener("DOMContentLoaded", function(e){

    arrayPlantas.forEach(planta => {
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

