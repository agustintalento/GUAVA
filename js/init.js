const CARRITO = "carrito";
let carrito = [];

/* funcion que carga el carrito si está en el local storage */

if(localStorage.getItem(CARRITO)) {

    carrito = JSON.parse(localStorage.getItem(CARRITO));
}

/* funcion para actualizar el carrito, guardando la variable carrito en el local storage */

function actualizarCarrito() {
    localStorage.setItem(CARRITO, JSON.stringify(carrito));
}

/* función para agregar item al carrito, busca id de la planta en el carrito, y si no está la agrega
se muestra mensaje de producto agregado al carrito */

function agregarItem(idPlanta) {
    
    if (carrito.find(function(item) {
        return item.id == idPlanta; } ) 
    ) {/* true */} 
    else {

        let item = {id : idPlanta,
                    cantidad : 1            
                };
        carrito.push(item); 

        Swal.fire({
          icon: 'success',
          title: 'Se agregó tu producto al carrito',
          text: 'Continúa viendo más productos',
          footer: `<a href="${carritoPath}" ><i class="fa-solid fa-cart-shopping"></i> IR AL CARRITO</a>`
        })


        
    }


    actualizarCarrito();
    mostrarCarrito();
}

/* funcion para quitar item del carro utilizando la misma logica que la función agregar item,
busca el índice, y si está, lo quita del carrito  */

function quitarItem(idPlanta) {
    let index = carrito.findIndex(function(item) {
    return item.id == idPlanta; });

    if(index !== -1) {
        carrito.splice(index, 1)
    } 
    

    actualizarCarrito();
    mostrarCarrito();
}