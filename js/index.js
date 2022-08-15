//El sitio es un ecommerce de una tienda de plantas

let arrayCatalogo = [];

/* creo funcion asincronica, donde se hace una petición de los datos en un archivo JSON, y a este
array lo mostramos en la pagina catalogo, si la petición falla, se logea error en la consola */

const getJSONdata = async() => {

    try {
        const resp = await fetch('./catalogo.JSON');
        const data = await resp.json();

    
        return data;
    } catch (error) {
        console.log(error);
    }

}


/* con el siguiente constructor, la idea es importar las plantas, para mostrarlas en el index 
en forma de cards. El index va a tener una sección de plantas recomendadas, donde se clickea una planta
y se abre un modal con info detallada de la misma. El usuario indica la cantidad que quiere 
agregar al carrito de compras, donde finalmente se suman los totales y se hace la compra*/

function planta(id, nombre, tipo, altura, macetaIncluida, precio, stock, src) {

    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.altura = altura;
    this.macetaIncluida = macetaIncluida;
    this.precio = precio;
    this.stock = stock;
    this.src = src;
}


const dracena = new planta(10,'Dracena', 'Arbusto', '55', true,  1100, 12, './img/productos/dracena.jpg');
const pilea = new planta(11, 'Pilea Peperomioides', 'Herbácea', '12', true, 400, 10, './img/productos/pilea.jpg');
const crisantemo = new planta(12, 'Crisantemo', 'Herbácea', '30', true, 320, 15, './img/productos/crisantemo.jpg');

let arrayPlantas = [dracena, pilea, crisantemo];

arrayPlantas.forEach(planta => {document.getElementById('plantas').innerHTML +=  `

        <div class="card align-items-center" style="width: 18rem; border: none">
            <img src="${planta.src}" class="card-img-top" alt="dracena">
        <div class="card-body">
            <div class="d-flex">
                <p class="card-text plantaNombre" style="padding-right: 20px;">${planta.nombre}</p>
                <p class="card-text plantaNombre">$ ${planta.precio}</p>
            </div>    
            <div class="d-flex justify-content-center">
                <button class="btn btn-secondary agregarItem" type="submit" onclick="agregarItem(${planta.id})">Agregar al carrito</button>
            </div>
        </div>
        </div>
    `
    
});

function mostrarCarrito() {
    let DIV = document.getElementById('itemCarrito');
    DIV.innerHTML = '';
    carrito.forEach(item => {
        let plantaItem = arrayCatalogo.find(function(planta) {
            return item.id == planta.id; } ) 
        DIV.innerHTML += `

        <div class="card align-items-center" style="width: 8rem; border: none">
        <button type="button" class="btn-close" onclick="quitarItem(${plantaItem.id})"></button>
            <img src="${plantaItem.src.slice(1)}" class="card-img-top" alt="dracena">
        <div class="card-body">
            <div class="d-flex">
                <p class="card-text plantaNombre" style="padding-right: 20px;">${plantaItem.nombre}</p>
                <p class="card-text plantaNombre">$ ${plantaItem.precio}</p>
            </div>    
            
           
        </div>
        </div>
    `
    })
}


document.addEventListener("DOMContentLoaded", async function(e){
    arrayCatalogo = await getJSONdata();
    mostrarCarrito();

})