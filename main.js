// Declaración de precios unitarios

const precioPizza = 2000;
const precioEmpanada = 300;
const precioTarta = 20;
const precioBebida = 600;

// Funciones

function calcularPrecio(pedido, cantidad, tamanio) {
    let precio = 0;
    switch (pedido) {
        case 'pizza':
            precio = cantidad * precioPizza;
            break;
        case 'empanada':
            precio = cantidad * precioEmpanada;
            break;
        case 'tarta':
            precio = cantidad * precioTarta * tamanio;
            break;
        case 'bebida':
            precio = cantidad * precioBebida;
            break;
    }
    return precio;
}

function solicitarPedido() {
    let pedido = prompt('¿Qué desea ordenar? \nPizza, \nEmpanada, \nTarta, \nBebida, \nSalir.').toLowerCase();
    if (pedido === 'pizza' || pedido === 'empanada') {
        cantidad = prompt(`¿Qué cantidad de ${pedido} desea?`);
        console.log(`El costo de ${cantidad} ${pedido} es de $${calcularPrecio(pedido, cantidad)}`);
        alert(`El costo de ${cantidad} ${pedido} es de $${calcularPrecio(pedido, cantidad)}`);
        document.write("<h2> Cotización de: "+ cantidad +" "+ pedido +"</h2>");
        document.write("<h4> El costo es de $" + calcularPrecio(pedido, cantidad,) + "</h4>");
    }
    else if (pedido === 'tarta') {
        ancho = prompt(`Ingrese el ancho de la tarta (hasta 30cm) ${pedido}`);	
        alto = prompt(`Ingrese el alto de la tarta (hasta 5cm) ${pedido}`);
        cantidad = prompt(`¿Qué cantidad de ${pedido} desea?`);
        let tamanio = (ancho * alto * cantidad);
        console.log(`El tamaño del pedido ${pedido} es de ${tamanio}`);
        console.log(`El costo de ${cantidad} ${pedido} es de ${calcularPrecio(pedido, cantidad, tamanio)}`);
        alert(`El costo de producción de ${cantidad} ${pedido} es de $${calcularPrecio(pedido, cantidad, tamanio)}`);
        document.write("<h2> Cotización de: "+ cantidad +" "+ pedido +" "+ "de " + ancho + " x " + alto + " cm" +"</h2>");
        document.write("<h4> El costo es de $" + calcularPrecio(pedido, cantidad, tamanio) + "</h4>");
    }
    else if (pedido === 'bebida') {
        cantidad = prompt(`Ofrecemos bebidas de 1 litro ¿Cuántas unidades de ${pedido} desea?`);
        console.log(`El costo de ${cantidad} ${pedido} es de ${calcularPrecio(pedido, cantidad)}`);
        alert(`El costo de ${cantidad} ${pedido} es de $${calcularPrecio(pedido, cantidad)}`);
        document.write("<h2> Cotización de: "+ cantidad +" "+ pedido +" "+ "de " + " cm3" +"</h2>");
        document.write("<h4> El costo es de $" + calcularPrecio(pedido, cantidad) + "</h4>");
    }
    else if (pedido === 'salir') {
        document.write('<h2> Hasta luego</h2>');
        document.write('<h4> <a href=\Index.html>Click para volver a cotizar</a></h4>')
        }
    return pedido;
}

// Solicitud de datos

let pedido = solicitarPedido();
