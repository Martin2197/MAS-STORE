let productos = [];

const filtroMarca = document.getElementById("filtroMarca");
const filtroCategoria = document.getElementById("filtroCategoria");

function aplicarFiltros(){

  const marca = filtroMarca.value;
  const categoria = filtroCategoria.value;

  const filtrados = productos.filter(p => {

    const marcaOK = marca === "todas" || p.marca === marca;
    const categoriaOK = categoria === "todas" || p.categoria === categoria;

    return marcaOK && categoriaOK;

  });

  renderProductos(filtrados);

}

filtroMarca.addEventListener("change", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);

async function cargarProductos() {

  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvr7-LdORSUwxmZceeoMyO5q0h4CPKc0KBL5eR8vLpqodDb1rPEQK6IMMJUtYIc6bUmiW8fKe-xbMr/pub?output=csv";

  const response = await fetch(url);
  const data = await response.text();

  const filas = data.split("\n").slice(1);



  productos = filas
    .filter(fila => fila.trim() !== "")
    .map(fila => {
      productos = productos.filter(p => p.activo);
      const col = fila.split(",");

      return {
        nombre: col[0].trim(),
        marca: col[1].trim(),
        categoria: col[2].trim(),
        precioUSD: Number(col[3]),
        precioARS: Number(col[4]),
        imagen: col[5].trim(),
        stock: Number(col[6]),
        activo: col[7].trim().toLowerCase() === "true"
      };

    });

    renderProductos(productos);
    generarFiltros();

  } 

cargarProductos();

function generarFiltros() {

  const marcas = [...new Set(productos.map(p => p.marca))];
  const categorias = [...new Set(productos.map(p => p.categoria))];

  const filtroMarca = document.getElementById("filtroMarca");
  const filtroCategoria = document.getElementById("filtroCategoria");

  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;
    filtroMarca.appendChild(option);
  });

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });

}

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

// LOGICA PARA MOSTRAR PRODUCTOS EN EL MAIN // 

const resultadosContainer = document.getElementById("productos");

function renderProductos(lista) {

  resultadosContainer.innerHTML = "";

  if (lista.length === 0) {
    resultadosContainer.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  lista.forEach((producto) => {

    const card = document.createElement("article");
    card.classList.add("producto-card");

    // 👉 lógica del stock
    let estadoStock = "";

    if(producto.stock === 0){
      estadoStock = `<span class="stock stock--rojo">Sin stock</span>`;
    }
    else if(producto.stock <= 3){
      estadoStock = `<span class="stock stock--amarillo">Últimas unidades</span>`;
    }
    else{
      estadoStock = `<span class="stock stock--verde">Disponible</span>`;
    }

    card.innerHTML = `

      <img src="Assets/${producto.imagen}" alt="${producto.nombre}" class="producto-card__img">

      <div class="producto-card__info">

        <h3 class="producto-card__titulo">${producto.nombre}</h3>

        <p class="producto-card__marca">${producto.marca}</p>

        <p class="producto-card__categoria">${producto.categoria}</p>

        <p class="producto-card__precio-usd">USD $${producto.precioUSD}</p>
        
        <p class="producto-card__precio-ars">$${producto.precioARS.toLocaleString()} ARS</p>

        <p class="producto-card__stock">${estadoStock}</p>

      </div>

      <a href="https://wa.me/3795028387?text=Hola!%20Quería%20consultar%20por%20el%20${producto.nombre}" 
      target="_blank" 
      class="producto-card__btn">Consultar</a>

    `;

    resultadosContainer.appendChild(card);

  });

}

// Mostrar todos al inicio
renderProductos(productos);

// CONECTAR PRODUCTOS CON EL INPUT //

const inputBusqueda = document.querySelector(".navBar__search");

inputBusqueda.addEventListener("input", () => {

  const termino = inputBusqueda.value.toLowerCase().trim();

  if (!termino) {
    renderProductos(productos);
    return;
  }

  const filtrados = productos.filter(producto => {

    const texto = `
      ${producto.nombre}
      ${producto.marca}
      ${producto.categoria}
    `.toLowerCase();

    return texto.includes(termino);

  });

  renderProductos(filtrados);

});