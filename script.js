//Clase producto
class Producto {
    //Funcion constructora
    constructor(nombre, descripcion,precio){
        this.id = generarID();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    //Agregar IVA al 21%
    calcularIVA(){
        return this.precio + (this.precio * (21/100));
    }
}

//Generador ID automatico incremental
const generarID = (()=>(id = 1, ()=>id++))();

//Mostrar productos
function mostrarProducto(){
    arrayProductos.forEach(element => {
        console.log(element);        
    });
}

//Crear productos con dos argumentos y devolver
function crearProducto(nombre, descripcion, precio){
    return new Producto(nombre, descripcion, precio);
}

//Buscar producto por id
function encontrarPorId(hallarId){
    for(let i = 0; i < arrayProductos.length; i++){
        if (arrayProductos[i].id == hallarId)
        return arrayProductos[i];
    }
    return "No se encontró el ID"
}

//Buscar productos por nombre, puede devolver varios productos
function hallarPorNombre(n){
    let producto = [];
    for(let i = 0; i < arrayProductos.length; i++){
        if (arrayProductos[i].nombre == n) {
            producto.push(arrayProductos[i])};
    }
    return producto;
}

//Ordenar por precio de menor a mayor y viceversa
function ordenarMayor(){
    return arrayProductos.sort((a,b) => (a.precio - b.precio));
}
function ordenarMenor(){
    return arrayProductos.sort((a,b) => (b.precio - a.precio));
}

//Array de productos
let arrayProductos = [
    new Producto ("Empanada","Carne Suave", 400),
    new Producto ("Empanada","Verdura", 350),
    new Producto ("Empanada","JyQ", 400),
    new Producto ("Empanada","Soja", 300),
    new Producto ("Empanada","Seitan", 320),
    new Producto ("Pizza","Muzzarela", 2000),
    new Producto ("Pizza","Jamón", 2500),
    new Producto ("Pizza","Napolitana", 2800),
    new Producto ("Pizza","MuzzaVegana", 2000),
    new Producto ("Pizza","NapoVegana", 2500),
    new Producto ("Bebida","Gaseosa 2L", 1000),
    new Producto ("Bebida","Agua 2L", 500),
];

//Comprar y eliminar un producto del stock, retorna true si se vendio de lo contrario false
function comprarProductoPorId(id){
    x = encontrarPorId(id);
    indexProducto = arrayProductos.indexOf(x);
    if (arrayProductos.includes(x)){
        arrayProductos.splice(indexProducto, indexProducto + 1);
        return true;
    }
    return false;
}

//Solo es false cuando se quiere salir del bucle.
let proceso = true;
//Menu
const menu = `1-Crear un producto para agregar a la lista.\n
              2-Mostrar lista de productos.\n
              3-Encontrar productos por nombre\n
              4-Buscar producto por ID\n
              5-Ordenar productos.\n
              6-Comprar algún producto.\n
              0-Salir.`;

//Ciclo while, se sale con "0"
while(proceso){
    let opcion = parseInt(prompt(menu));
    //opciones del menu
    switch(opcion){
        case 1:
            var nombreProducto = prompt("Ingrese el nombre del producto.");
            var descripcionProducto = prompt("Ingrese la descripcion del producto");
            var precioProducto = parseFloat(prompt("Ingrese el precio."));
            arrayProductos.push(crearProducto(nombreProducto, descripcionProducto, precioProducto));
            break;
        case 2:
            mostrarProducto();
            break;
        case 3:
            let encontrarNombre = prompt("Ingrese el nombre del producto.");
            console.log(hallarPorNombre(encontrarNombre));
            break;
        case 4:
            let encontrarId = parseInt(prompt("Ingrese el ID del producto"));
            console.log(encontrarPorId(encontrarId));
            break;
        case 5:
            let opcFiltro = parseInt(prompt(`1-Ordenar por mayor.\n
                                             2-Ordenar por menor.`));
            if (opcFiltro == 1){
                console.log(ordenarMayor());
            }
            else if (opcFiltro == 2){
                console.log(ordenarMenor());
            }
            else{
                alert("Por favor ingrese 1 o 2")
            }
            break;
        case 6:
            let comprarPorId = parseInt(prompt("Ingrese el ID del producto a comprar."));
            if (arrayProductos.includes(encontrarPorId(comprarPorId))){
                alert("El precio con IVA es " + encontrarPorId(comprarPorId).calcularIVA());
                let confirmarCompra = prompt("¿Está seguro?\n Ingrese si o no").toUpperCase();
                if (confirmarCompra == "SI") console.log(comprarProductoPorId(comprarPorId));
                else if (confirmarCompra == "NO") alert("Lamentamos su elección");
            }
            else{
                console.log("ID no encontrado, intente nuevamente")
            }
            break;
        case 0:
            proceso = false;
            break;
    }
}