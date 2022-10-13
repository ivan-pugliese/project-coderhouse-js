
//Me genero mis cards de Productos con JS
const productos = "json/productos.json";

const cardsProductos = document.getElementById("cards-products");

const carrito = [];

fetch(productos)
  .then(response => response.json())
  .then(datos => {
    datos.forEach(producto => {
      let div = document.createElement("div");
      div.className = "cards box-shadow-1 bg-color-white";
      div.innerHTML = `<img src="${producto.imagen}" alt="">
                      <h4 class="text-center">${producto.nombre}</h4>
                      <i class="text-center">Precio: $${producto.precio}</i>
                      <button id="agregar${producto.id}">Agregar al carrito</button>`;
      cardsProductos.appendChild(div);

      const btnAgregar = document.getElementById(`agregar${producto.id}`);
      btnAgregar.addEventListener("click", () => {
        agregarProducto(producto.id);
        Toastify({
          text: "Producto añadido al carrito",
          duration: 1500,
          position: "right",
          style: {
            background: "linear-gradient(to right, #ff4e50, #FD7C60)"
          }
        }).showToast();
      });
      function agregarProducto(id) {
        const producto = datos.find(producto => producto.id === id);
        const productoCantidad = carrito.find(producto => producto.id === id);

        productoCantidad ? productoCantidad.cantidad++ : carrito.push(producto);

        localStorage.setItem("Productos", JSON.stringify(carrito));

        carritoActualizado();
      }
    });
  });

if (localStorage.getItem("Productos")) {
  let productoNuevo = JSON.parse(localStorage.getItem("Productos"));
  for (let i = 0; i < productoNuevo.length; i++) {
    carrito.push(productoNuevo[i]);
  };
};

//Me traigo el contenedor de los div a crear de cada producto.
const contenedorProductos = document.getElementById("products-container");

//Funcion que me va actualizando el carrito a medida que pusheo productos.
function carritoActualizado() {
  let carritoAcumulado = "";
  carrito.forEach(producto => {
    carritoAcumulado += ` <div class="products-cards">
                            <h4 class="text-principal">${producto.nombre}</h4>
                            <i class="text-principal">Precio: $${producto.precio}</i>
                            <i>Cantidad: ${producto.cantidad}</i>
                            <button onclick = eliminarProducto(${producto.id})>Eliminar</button>
                            </div>
                          <hr>`
  });
  contenedorProductos.innerHTML = carritoAcumulado;
  totalCarrito();
}

//Me traigo el boton para mostrar el carrito y el contenido.
const modalShopContenedor = document.getElementById("shop-container");
const btnShop = document.getElementById("sesion-shop");
btnShop.addEventListener("click", () => {
  modalShopContenedor.className = "modal-general";
});

//Me traigo el boton que cierra la muestra del carrito.
const cerrarCarrito = document.getElementById("shop-close");
cerrarCarrito.addEventListener("click", () => {
  modalShopContenedor.className = "none";
});

//Funcion que me elimine un producto a eleccion
let eliminarProducto = (id) => {
  const producto = carrito.find(producto => producto.id === id);
  carrito.splice(carrito.indexOf(producto), 1);
  carritoActualizado();
}

//Funcion para vaciar por completo el carrito
let vaciarCarrito = document.getElementById("delete-shop");
vaciarCarrito.addEventListener("click", () => {
  carrito.splice(0, carrito.length);
  carritoActualizado();
});

//Calculo el total del carrito
const totalCompra = document.getElementById("total");


function totalCarrito() {
  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio * producto.cantidad;
  });
  totalCompra.innerHTML = total;
}

//Abonar y Finalizar compra
const abonarContenedor = document.getElementById("build-process");

const btnAbonar = document.getElementById("pay");
btnAbonar.addEventListener("click", () => {
  modalShopContenedor.className = "none";
  abonarContenedor.className = "modal-general"
})

const buildForm = document.getElementById("build-form");
buildForm.addEventListener("submit", (e) => {
  e.preventDefault()
  Swal.fire({
    title: `Compra realizada con exito, vuelva pronto, ${localStorage.getItem("usuario")}!`,
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#ff4e50",
  });
  carrito.splice(0, carrito.length);
  abonarContenedor.className = "none"
  carritoActualizado();
});


//Boton volver
let btnBack = document.getElementById("back");
btnBack.addEventListener("click", () => {
  modalShopContenedor.className = "modal-general";
  abonarContenedor.className = "none"
});