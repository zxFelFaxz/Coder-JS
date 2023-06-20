const generarID = (()=>(id = 1, ()=>id++))();

class Producto {
    constructor(nombre, descripcion, precio, img) {
        this.id = generarID();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const productos = [
    new Producto ("Empanada","Carne Suave", 400, "../img/Carne-Suave.jpg"),
    new Producto ("Empanada","Verdura", 350, "https://tse4.mm.bing.net/th?id=OIP.Fjzhp9qmDQOJmYV52R9KZgHaE8&pid=Api&P=0&w=300&h=300"),
    new Producto ("Empanada","JyQ", 400, "https://www.minutoneuquen.com/u/fotografias/m/2023/4/10/f800x450-597361_648807_5050.jpg"),
    new Producto ("Empanada","Soja", 300, "https://resizer.glanacion.com/resizer/mY4K4ZqVbf5ACPKlGgL1fnpJ0tA=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/RO6NGLT2ZVCFHEPUVOZYQOWNF4.jpg"),
    new Producto ("Empanada","Seitan", 320, "https://static.wixstatic.com/media/8e2b47_e144d7aefbac4c84be8cc6fa550b7ed0~mv2.jpg/v1/fit/w_902%2Ch_602%2Cal_c%2Cq_80,enc_auto/file.jpg"),
    new Producto ("Pizza","Muzzarela", 2000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFhnxte7QWnPLuIgwbRi6P410tQW7-6_B4SzCKE8NkYENNLfK6tTPJOVfDOgGrvumdb4U&usqp=CAU"),
    new Producto ("Pizza","Jamón", 2500, "https://betos.com.ar/wp-content/uploads/2019/08/Pizza-Jamon-Crudo.png"),
    new Producto ("Pizza","Napolitana", 2800, "https://cdn0.recetasgratis.net/es/posts/5/2/6/pizza_napolitana_32625_orig.jpg"),
    new Producto ("Pizza","MuzzaVegana", 2000, "https://d3ugyf2ht6aenh.cloudfront.net/stores/859/431/products/pizza-sin-tacc1-d35348889cf832c7a616353468997383-640-0.webp"),
    new Producto ("Pizza","NapoVegana", 2500, "https://pizzavegana.com/wp-content/uploads/2020/04/Vegalitana_-1.jpg"),
    new Producto ("Bebida","Gaseosa 2L", 1000, "https://pizzerialamia.sk/assets/images/products/267/7.png"),
    new Producto ("Bebida","Agua 2L", 500, "https://d2r9epyceweg5n.cloudfront.net/stores/001/151/835/products/77903150004221-38a23e8ed1600a1a5c15942264124471-640-0.jpg"),
];

const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

const guardarEnLS = () =>{
    if(carrito.length > 0){
        localStorage.setItem("carrito",JSON.stringify(carrito))
    }
}
const recuperarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

let carrito = recuperarCarritoLS();

const addCarrito = (id) => {
    const addedCarrito = carrito.find(producto => producto.id === id);
    if (addedCarrito) {
        addedCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    calcularTotal();
    mostrarCarrito();
    guardarEnLS();
    console.log(carrito);
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
const quitarDelCarrito = (id) => {
    const producto = carrito.find(producto=> producto.id === id);
    const indice = carrito.lastIndexOf(producto);
    carrito.splice(indice, 1);
    guardarEnLS();
    mostrarCarrito();
}

const contenedorProductos = document.getElementById("contenedorProductos");

const verProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                        <div class="card">
                            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5> ${producto.nombre}</h5>
                                <h6> ${producto.descripcion}</h6>
                                <p> $ ${producto.precio}</p>
                                <button id="boton${producto.id}" class="btn colorBoton"> Agregar al carrito</button>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(card);
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            addCarrito(producto.id);
        })
    })
}
verProductos();

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
    })
    const mostrarCarrito = () => {
        contenedorCarrito.innerHTML = "",
        carrito.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = `
                            <div class="card">
                                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h5> ${producto.nombre}</h5>
                                    <h6> ${producto.descripcion}</h6>
                                    <p> $ ${producto.precio}</p>
                                    <p> ${producto.cantidad}</p>
                                    <button id="eliminar${producto.id}" class="btn colorBoton">Eliminar</button>
                                </div>
                            </div>
                            `
                        contenedorCarrito.appendChild(card);
                        const boton = document.getElementById(`eliminar${producto.id}`);
                        boton.addEventListener("click", ()=> {
                            quitarDelCarrito(producto.id);
                        })
        })
        calcularTotal();
        //const carritoJSON = JSON.stringify(carrito);
        //localStorage.setItem('carrito', carrito);
    }
    const vaciarCarrito = document.getElementById ("vaciarCarrito");
    vaciarCarrito.addEventListener("click", () =>{
        eliminarCarrito();
})

const eliminarCarrito = () => {
    carrito = [];
    if(carrito.length == 0){
        localStorage.setItem("carrito",JSON.stringify(carrito))
    }
    mostrarCarrito();
}
