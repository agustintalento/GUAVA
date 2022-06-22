//El sitio es un ecommerce de una tienda de plantas
//en esta primera instancia, la idea es crear un cálculo de descuentos por promoción 3x2 y
//además setear envio gratis cuando el precio es mayor a $1000


let cantidadArticulos = parseInt(prompt('Cuantos artículos va a llevar'));
let articulos = [];
let precioArticulos = [];
let precioTotal = 0;
let envioGratis = false;

function agregarArticulo() {
    for (let i = 0; i < cantidadArticulos; i++) {
        precioArticulos.push(parseInt(prompt('precio del articulo'))); 
    }

}

agregarArticulo();

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

function precioFinal() {
    for (let i= 0; i < precioArticulos.length; i++) {
        precioTotal = precioTotal + precioArticulos[i];
    }
    if(precioTotal >= 1000) {
        envioGratis = true;
        alert(`el precio final es de $ ${precioTotal} y el envio es gratis`);
    }
    else {
        alert(`el precio final es de $ ${precioTotal}`);
    }

    
}

precioFinal();
