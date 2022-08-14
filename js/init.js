const CARRITO = "carrito";
let carrito = [];

if(localStorage.getItem(CARRITO)) {

    carrito = JSON.parse(localStorage.getItem(CARRITO));
}

function actualizarCarrito() {
    localStorage.setItem(CARRITO, JSON.stringify(carrito));
}

function agregarItem(idPlanta) {
    
    if (carrito.find(function(item, i) {
        return item.id == idPlanta; } ) 
    ) {/* true */} 
    else {

        let item = {id : idPlanta,
                    cantidad : 1            
                };
        carrito.push(item); 
    }

    actualizarCarrito();
    mostrarCarrito();
}

function quitarItem(idPlanta) {
    let index = carrito.findIndex(function(item) {
    return item.id == idPlanta; });

    if(index !== -1) {
        carrito.splice(index, 1)
    } 
    

    actualizarCarrito();
    mostrarCarrito();
}