//El sitio es un ecommerce de una tienda de plantas
//en esta primera instancia, la idea es crear un cálculo de descuentos por promoción 3x2 y
//además setear envio gratis cuando el precio es mayor a $1000

let envioGratis = false;

/* con el siguiente constructor, la idea es importar las plantas, para mostrarlas en el index 
en forma de cards. El index va a tener una sección de plantas recomendadas, donde se clickea una planta
y se abre un modal con info detallada de la misma. El usuario indica la cantidad que quiere 
agregar al carrito de compras, donde finalmente se suman los totales y se hace la compra*/

function planta(nombre, tipo, altura, macetaIncluida, precio, src) {

    this.nombre = nombre;
    this.tipo = tipo;
    this.altura = altura;
    this.macetaIncluida = macetaIncluida;
    this.precio = precio;
    this.src = src;
}

const dracena = new planta('Dracena', 'Arbusto', '55', true,  1100, './img/productos/dracena.jpg');
const pilea = new planta('Pilea peperomioides', 'Herbácea', '12', true, 400, './img/productos/pilea.jpg');
const crisantemo = new planta('Crisantemo', 'Herbácea', '30', true, 320,'./img/productos/crisantemo.jpg');

let arrayPlantas = [dracena, pilea, crisantemo];

arrayPlantas.forEach(planta => {document.getElementById('plantas').innerHTML +=  `

    <div class="card align-items-center" style="width: 18rem;">
        <img src="${planta.src}" class="card-img-top" alt="dracena">
    <div class="card-body">
        <p class="card-text plantaNombre">${planta.nombre}</p>
        <p class="card-text plantaNombre">$ ${planta.precio}</p>

        <input id="${planta.nombre}" type="number" value="0" min="0" max="10" />
    </div>
    </div>
`
    
});



/* calculo el precio final de la compra y la muestro en el html */
function promocion(){

    let precioArticulos =[];
    arrayPlantas.forEach(planta => { 
        for (let i = 0; i < parseInt(document.getElementById(planta.nombre).value); i++) {
            precioArticulos.push(planta.precio);
            
        }
    });

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

function calculoTotal() {
    let precioArticulos = promocion();
    let precioFinal = 0;
    precioArticulos.forEach(precio => { precioFinal += precio;
        
    });

    
    if(precioFinal >= 1000) {
        envioGratis = true;
        document.getElementById('precioTotal').innerHTML = 
        `el precio final es de $ ${precioFinal} y el envio es gratis`;
        
    }
    else {
        document.getElementById('precioTotal').innerHTML = 
        `el precio final es de $ ${precioFinal}`;
        
    }

 
}







document.getElementById("botonCarrito").addEventListener("click", calculoTotal);