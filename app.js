// LOGICA PARA ABRIR Y CERRAR EL MENU DE BOTON DE HAMBURGUESA // 

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu   = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("navbar__menu--open");
});

// Cerrar el menú si el usuario toca fuera del panel
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove("navbar__menu--open");
  }
});
