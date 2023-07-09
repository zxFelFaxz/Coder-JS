
class Producto {
    constructor(id, nombre, descripcion, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio);
        this.img = img;
        this.cantidad = 1;
    }
}

const total = document.getElementById("total");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
const inputSearch = document.querySelector('input#inputSearch');
let data;

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
      const precio = parseFloat(producto.precio);
      const cantidad = parseInt(producto.cantidad);
  
      if (!isNaN(precio) && !isNaN(cantidad)) {
        totalCompra += precio * cantidad;
      }
    });
    total.innerHTML = `Total: $${totalCompra}`;
};

const guardarEnLS = () =>{
    if(carrito.length > 0){
        localStorage.setItem("carrito",JSON.stringify(carrito))
    }
}
const recuperarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

let carrito = recuperarCarritoLS();

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
};

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const addCarrito = (id) => {
    const addedCarrito = carrito.find(producto => producto.id === id);
    if (addedCarrito) {
        addedCarrito.cantidad++;
    } else {
        const producto = data.producto.find(producto => producto.id === id);
        carrito.push(producto);
    }
    mostrarCarrito();
    calcularTotal();
    guardarEnLS();
    console.log(carrito);

    Swal.fire({
        title: 'Agregado',
        text: 'Agregado al carrito.',
        icon: 'success',
        showConfirmButton: false,
        position: 'bottom-end',
        toast: true,
        timer: 1500,
        width: '250px',
        background: '#dee2e7'
    });
}

async function verProductos() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) {
            throw new Error('Error al obtener los datos.');
        }
        data = await response.json();
        const producto = data.producto;
        const contenedorProductos = document.getElementById('contenedorProductos');

        producto.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5>${producto.nombre}</h5>
                        <h6>${producto.descripcion}</h6>
                        <p>${producto.precio}</p>
                        <button id="boton${producto.id}" class="btn colorBoton">Agregar al carrito</button>
                    </div>
                </div>
            `;

            contenedorProductos.appendChild(card);
            const boton = document.getElementById(`boton${producto.id}`);
            boton.addEventListener("click", () => {
                addCarrito(producto.id);
                });
            });
        } 
    catch (error) {
        console.log('Se ha detectado un problema con la petición fetch:', error);
    }
}

verProductos();

const quitarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    if (producto) {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        const indice = carrito.lastIndexOf(producto);
        carrito.splice(indice, 1);
      }
      guardarEnLS();
      mostrarCarrito();
    }
    Swal.fire({
        title: 'Eliminado',
        text: 'Sacado del carrito.',
        icon: 'success',
        showConfirmButton: false,
        position: 'bottom-end',
        toast: true,
        timer: 1500,
        width: '250px',
        background: '#dee2e7'
    });
};

const filtrarProductos = () => {
    const searchTerm = inputSearch.value.trim().toLowerCase();
    const productosFiltrados = data.producto.filter(producto => producto.nombre.toLowerCase().indexOf(searchTerm) !== -1);
  
    contenedorProductos.innerHTML = '';
  
    if (productosFiltrados.length === 0) {

      Swal.fire({
        title: 'No se encontraron productos',
        text: 'Intente con estas opciones "Empanadas", "Pizza" o "Bebida".',
        icon: 'info',
        confirmButtonText: 'Volver',
      }).then(() => {
        verProductos()
        inputSearch.value = '';
      });
    } else {
      productosFiltrados.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <h6>${producto.descripcion}</h6>
                    <p>${producto.precio}</p>
                    <button id="boton${producto.id}" class="btn colorBoton">Agregar al carrito</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(card);
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            addCarrito(producto.id);
        });
      });
    }
};
  
inputSearch.addEventListener("search", filtrarProductos);

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

const finalizarCompra = document.getElementById("finalizaCompra");
finalizarCompra.addEventListener("click", () => {

    Swal.fire({
        title: '¡Gracias por su compra!',
        text: 'Su pedido ha sido procesado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {;
    eliminarCarrito();
    guardarEnLS();
    mostrarCarrito();
        }
    });
});
