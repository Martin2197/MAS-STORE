// LOGICA PARA ABRIR Y CERRAR EL MENU DE BOTON DE HAMBURGUESA // 

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("close");


function toggleMenu() {
  mobileMenu.classList.toggle("navBar__menu--open");
}

hamburgerBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);


// Cerrar el menú si el usuario toca fuera del panel
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove("navBar__menu--open");
  }
});


// ARRAY DE PRODUCTOS // 

const productos = [
  {
    id: 1,
    nombre: "iPhone 13",
    marca: "Apple",
    categoria: "Celulares",
    precio: 800,
  },
  {
    id: 2,
    nombre: "iPhone 15",
    marca: "Apple",
    categoria: "Celulares",
    precio: 1100,
  },
  {
    id: 3,
    nombre: "Galaxy S23",
    marca: "Samsung",
    categoria: "Celulares",
    precio: 900,
  },
  {
    id: 4,
    nombre: "Redmi Note 13",
    marca: "Xiaomi",
    categoria: "Celulares",
    precio: 450,
  },
];

// LOGICA PARA MOSTRAR PRODUCTOS EN EL MAIN // 

const resultadosContainer = document.getElementById("resultados");

function renderProductos(lista) {
  // Vaciar lo que haya
  resultadosContainer.innerHTML = "";

  if (lista.length === 0) {
    resultadosContainer.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  // Crear una tarjeta simple por producto
  lista.forEach((producto) => {
    const card = document.createElement("article");
    card.classList.add("producto-card");

    card.innerHTML = `
      <h3 class="producto-card__titulo">${producto.nombre}</h3>
      <p class="producto-card__marca">${producto.marca}</p>
      <p class="producto-card__categoria">${producto.categoria}</p>
      <p class="producto-card__precio">USD ${producto.precio}</p>
    `;

    resultadosContainer.appendChild(card);
  });
}

// Mostrar todos al inicio
renderProductos(productos);

// CONECTAR PRODUCTOS CON EL INPUT //

const inputBusqueda = document.querySelector(".navBar__search");

inputBusqueda.addEventListener("input", () => {
  const termino = inputBusqueda.value.trim().toLowerCase();

  // Si no escribió nada, mostramos todos
  if (termino === "") {
    renderProductos(productos);
    return;
  }

  // Filtrar productos por nombre, marca o categoría
  const filtrados = productos.filter((producto) => {
    return (
      producto.nombre.toLowerCase().includes(termino) ||
      producto.marca.toLowerCase().includes(termino) ||
      producto.categoria.toLowerCase().includes(termino)
    );
  });

  renderProductos(filtrados);
});
