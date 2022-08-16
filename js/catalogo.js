let envioGratis = false;
let costoEnvio = 50;
let arrayCatalogo = [];
let carritoPath = './cart.html';

/* creo funcion asincronica, donde se hace una petición de los datos en un archivo JSON, y a este
array lo mostramos en la pagina catalogo, si la petición falla, se logea error en la consola */

const getJSONdata = async() => {

    try {
        const resp = await fetch('../catalogo.JSON');
        const data = await resp.json();

        data.forEach(planta => {document.getElementById('plantas').innerHTML +=  `

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

        return data;
    } catch (error) {
        console.log(error);
    }

}

/* funcion que muestra elementos agregados al carrito en el offcanvas */

function mostrarCarrito() {
    let DIV = document.getElementById('itemCarrito');
    DIV.innerHTML = '';
    carrito.forEach(item => {
        let plantaItem = arrayCatalogo.find(function(planta) {
            return item.id == planta.id; } ) 
        DIV.innerHTML += `

        <div class="card align-items-center" style="width: 8rem; border: none">
        <button type="button" class="btn-close" onclick="quitarItem(${plantaItem.id})"></button>
            <img src="${plantaItem.src}" class="card-img-top" alt="dracena">
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



/* se crea evento al cargar el dom donde se hace la petición de los datos */

document.addEventListener("DOMContentLoaded", async function(e){
    arrayCatalogo = await getJSONdata();
    mostrarCarrito();

})
