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