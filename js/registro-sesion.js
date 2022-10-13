//Formulario de registro e inicio de sesion - procesos

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

//Eventos para cerrar los mismos
let closeRegister = document.getElementById("register-close");
closeRegister.addEventListener("click", () => {
  modalRegister.className = "none";
});

let closeSesion = document.getElementById("sesion-close");
closeSesion.addEventListener("click", () => {
  modalSesion.className = "none";
});

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
});

// Inicio de sesión tomando los datos del registro y que los productos me aparezcan para armar mi carrito.
let welcomeSesion = document.getElementById("welcome-sesion");

let productsTitle = document.getElementById("product-title");

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
    welcomeSesion.className = "none";
    productsTitle.className = "products-title";
    cardsProductos.className = "cards-container";
  } else {
    Swal.fire({
      title: "Los datos son invalidos!",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff4e50",
    });
  }
});

