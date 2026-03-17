export function inicializarMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("close");

  if (!hamburgerBtn || !mobileMenu || !closeBtn) return;

  function toggleMenu() {
    mobileMenu.classList.toggle("navBar__menu--open");
  }

  hamburgerBtn.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);

  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove("navBar__menu--open");
    }
  });
}