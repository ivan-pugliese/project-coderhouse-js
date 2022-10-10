/********** Activacion de Menu - Eventos **********/
((d) => {
  const btnMenu = d.querySelector(".menu-btn");
  const menu = d.querySelector(".menu");

  btnMenu.addEventListener("click", (e) => {
    btnMenu.firstElementChild.classList.toggle("none");
    btnMenu.lastElementChild.classList.toggle("none");
    menu.classList.toggle("menu-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false; //si el selector que activa el evento no es un enlace dentro del menu no retorna nada.

    btnMenu.firstElementChild.classList.remove("none");
    btnMenu.lastElementChild.classList.add("none");
    menu.classList.remove("menu-active");
  });
})(document);


// Formulario de registro e inicio de sesion - procesos

//Eventos mostrar modales de los formularios
let modalRegister = document.getElementById("modal-register");

let btnSesion = document.getElementById("btnSesion");
let modalSesion = document.getElementById("modal-sesion");
btnSesion.addEventListener("click", () => {
  modalSesion.className = "modal-general";
});


let btn2 = document.getElementById("btn2");
btn2.addEventListener("click", () => {
  modalSesion.className = "none";
  modalRegister.className = "modal-general";
});


// Simulación de registro e inicio de sesión

//Registro y guardado de datos en el localStorage
let formRegister = document.getElementById("formRegister");
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  if ((!formRegister.children[0].value) || (!formRegister.children[1].value)) {
    Swal.fire({
      title: "Debe completar los datos!",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff4e50",
    });
  } else {
    localStorage.setItem("usuario", formRegister.children[0].value);
    localStorage.setItem("contraseña", formRegister.children[1].value);
    Swal.fire({
      title: "Usted se ha registrado correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff4e50",
    });
    modalRegister.className = "none";
  }
})

// Inicio de sesion tomando los datos del registro
let formSesion = document.getElementById("formSesion");
formSesion.addEventListener("submit", (e) => {
  e.preventDefault();
  if ((localStorage.getItem("usuario") === formSesion.children[0].value) && (localStorage.getItem("contraseña") === formSesion.children[1].value)) {
    Swal.fire({
      title: "Usted ha ingresado correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff4e50",
    });
    modalSesion.className = "none";
    btnSesion.innerHTML = `<span class="jam jam-user"></span>${localStorage.getItem("usuario")}`;
  } else {
    Swal.fire({
      title: "Los datos son invalidos!",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff4e50",
    });
  }
})

// Molde para mis productos
class Producto {
  constructor(id, imagen, nombre, precio, cantidad) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

// Cafés
const cafeLeche = new Producto(1, "images/cafe-con-leche.jpg", "Café con leche", 250, 1);
const cafeCrema = new Producto(2, "images/cafe-con-crema.jpg", "Café con crema", 280, 1);
const cafeSolo = new Producto(3, "images/cafe-solo.jpg", "Café solo", 220, 1);
const latte = new Producto(4, "images/latte.jpg", "Latte", 300, 1);
const cafeConTorta = new Producto(5, "images/combo-cake.jpg", "Café con porción de torta", 700, 1);
const cafeConMedialunas = new Producto(6, "images/combo-medialunas.jpg", "Café con 4 Medialunas", 500, 1);

//Tortas y postres
const blueberryCake = new Producto(7, "images/blueberry-cake.jpg", "Blueberry-Cake", 1200, 1);
const bombCake = new Producto(8, "images/bomb-cake.jpg", "Bomb-Cake", 1500, 1);
const frutiCake = new Producto(9, "images/fruti-cake.jpg", "Fruti-Cake", 1250, 1);
const lemonPie = new Producto(10, "images/lemon-pie.jpg", "Lemon Pie", 900, 1);
const paradiseCake = new Producto(11, "images/paradise-cake.jpg", "Paradise-Cake", 1300, 1);
const dona = new Producto(12, "images/donas.jpg", "Dona", 300, 1);

const carrito = [];

//cards de cafes con JS - DOM
const arrayCafes = [cafeLeche, cafeCrema, cafeSolo, latte, cafeConTorta, cafeConMedialunas];
const cardsCafes = document.getElementById("cards-cafes");
arrayCafes.forEach(producto => {
  let div = document.createElement("div");
  div.className = "cards box-shadow-1 bg-color-white";
  div.innerHTML = `<img src="${producto.imagen}" alt="">
                   <h4 class="text-center">${producto.nombre}</h4>
                   <i class="text-center">Precio: $${producto.precio}</i>
                   <button id="agregar${producto.id}">Agregar al carrito</button>`;
  cardsCafes.appendChild(div);

  const btnAgregar = document.getElementById(`agregar${producto.id}`);
  btnAgregar.addEventListener("click", () => {
    agregarCafes(producto.id);
    Toastify({
      text: "Producto añadido al carrito",
      duration: 1500,
      position: "right",
      style: {
        background: "linear-gradient(to right, #ff4e50, #FD7C60)"
      }
    }).showToast();
  });
});

function agregarCafes(id) {
  const producto = arrayCafes.find(producto => producto.id === id);
  const productoCantidad = carrito.find(producto => producto.id === id);

  productoCantidad ? productoCantidad.cantidad++ : carrito.push(producto);

  localStorage.setItem("Productos", JSON.stringify(carrito));

  carritoActualizado();
}

//cards de tortas con JS - DOM
const arrayTortas = [blueberryCake, bombCake, frutiCake, lemonPie, paradiseCake, dona];
const cardsTortas = document.getElementById("cards-tortas");
arrayTortas.forEach(producto => {
  let div = document.createElement("div");
  div.className = "cards box-shadow-1 bg-color-white";
  div.innerHTML = `<img src="${producto.imagen}" alt="">
                   <h4 class="text-center">${producto.nombre}</h4>
                   <i class="text-center">Precio: $${producto.precio}</i>
                   <button id="agregar${producto.id}">Agregar al carrito</button>`;
  cardsTortas.appendChild(div);

  const btnAgregar = document.getElementById(`agregar${producto.id}`);
  btnAgregar.addEventListener("click", () => {
    agregarTortas(producto.id);
    Toastify({
      text: "Producto añadido al carrito",
      duration: 1500,
      position: "right",
      style: {
        background: "linear-gradient(to right, #ff4e50, #FD7C60)"
      }
    }).showToast();
  });
});

function agregarTortas(id) {
  const producto = arrayTortas.find(producto => producto.id === id);
  const productoCantidad = carrito.find(producto => producto.id === id);

  productoCantidad ? productoCantidad.cantidad++ : carrito.push(producto);

  localStorage.setItem("Productos", JSON.stringify(carrito));

  carritoActualizado();
}

if (localStorage.getItem("Productos")) {
  let productoNuevo = JSON.parse(localStorage.getItem("Productos"));
  for (let i = 0; i < productoNuevo.length; i++) {
    carrito.push(productoNuevo[i]);
  };
};

//Me traigo el contenedor de los div de cada producto.
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

//Me traigo el boton para mostrar el carrito y el contenedor a mostrar.
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

//Evento finalizar compra
const btnFinalizarCompra = document.getElementById("build");
btnFinalizarCompra.addEventListener("click", () => {
  Swal.fire({
    title: "Compra realizada con exito, vuelva pronto!",
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#ff4e50",
  });
  carrito.splice(0, carrito.length);
  modalShopContenedor.className = "none";
  carritoActualizado();
});


//Formulario de mensajes y comentarios - los almaceno en el localStorage
class Mensaje {
  constructor(nombre, email, comentario) {
    this.nombre = nombre;
    this.email = email;
    this.comentario = comentario;
  }
}

const mensajes = [];

const mensajeEnviadoModal = document.getElementById("send-coment");

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const comentarios = document.getElementById("comentarios").value;
  const mensaje = new Mensaje(nombre, email, comentarios);
  mensajes.push(mensaje);
  localStorage.setItem("Mensajes", JSON.stringify(mensajes));
  mensajeEnviadoModal.className = "modal-general";
  form.reset();
});

const btnReturn = document.getElementById("return");
btnReturn.addEventListener("click", () => {
  mensajeEnviadoModal.className = "none";
});

if (localStorage.getItem("Mensajes")) {
  let mensajeNuevo = JSON.parse(localStorage.getItem("Mensajes"));
  for (let i = 0; i < mensajeNuevo.length; i++) {
    mensajes.push(mensajeNuevo[i]);
  };
};