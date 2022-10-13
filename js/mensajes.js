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

//Botón que cierra el modal de "mensaje enviado"
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