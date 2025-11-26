// LOGICA PARA ABRIR Y CERRAR EL MENU DE BOTON DE HAMBURGUESA // 

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu   = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("close");


function toggleMenu(){
  mobileMenu.classList.toggle("navbar__menu--open");
}

hamburgerBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);


// Cerrar el menú si el usuario toca fuera del panel
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove("navbar__menu--open");
  }
});
