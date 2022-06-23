//El sitio es un ecommerce de una tienda de plantas
//en esta primera instancia, la idea es crear un cálculo de descuentos por promoción 3x2 y
//además setear envio gratis cuando el precio es mayor a $1000


let cantidadArticulos = parseInt(prompt('Cuantos artículos va a llevar'));
let articulos = [];
let precioArticulos = [];
let precioTotal = 0;
let envioGratis = false;

/* se le pide al usuario la cantidad de productos que va a comprar,
con la cantidad ingresada. se pide el precio de cada uno para sumar a un array */

function agregarArticulo() {
    for (let i = 0; i < cantidadArticulos; i++) {
        precioArticulos.push(parseInt(prompt('precio del articulo'))); 
    }

}

agregarArticulo();

/* si la cantidad de elementos del array es de 3 o más se ordenan por precio,
para setear el mas barato como producto gratis (por la promo 3x2) (ver en la consola el orden),
se ve si la cantidad de productos que lleva el cliente es multiplo de 3, y con el multiplo este se 
setea la cantidad de productos gratis, siempre siendo estos los más baratos */

function promocion(){
    if (precioArticulos.length > 2) {
        precioArticulos.sort(function(a, b) {
            return a - b;
        });
        
        for (let i= 0; i < Math.floor((precioArticulos.length)/3) ; i++) {
            precioArticulos[i] = 0;
        }    
        console.log(precioArticulos);
    }
}

promocion();

/* con la siguiente funcion, se suma el precio de los productos del array, dandonos el precio total
de los productos que va a comprar el cliente, y si el precio es mayor a $1000, 
el envio se hace gratis. Se agrega el total al index.html */

function precioFinal() {
    for (let i= 0; i < precioArticulos.length; i++) {
        precioTotal = precioTotal + precioArticulos[i];
    }
    if(precioTotal >= 1000) {
        envioGratis = true;
        document.getElementById('precioTotal').innerHTML = 
        `el precio final es de $ ${precioTotal} y el envio es gratis`;
        
    }
    else {
        document.getElementById('precioTotal').innerHTML = 
        `el precio final es de $ ${precioTotal}`;
        
    }

    
}

precioFinal();
