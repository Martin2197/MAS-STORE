import { obtenerProductos } from "./api.js";
import { renderProductos } from "./render.js";
import { mostrarSkeleton } from "./skeleton.js";
import { generarFiltros, filtrarProductos } from "./filtros.js";
import { inicializarMenu } from "./menu.js";
import { obtenerTerminoBusqueda } from "./busqueda.js";

let productos = [];

const filtroMarca = document.getElementById("filtroMarca");
const filtroCategoria = document.getElementById("filtroCategoria");
const inputBusqueda = document.querySelector(".navBar__search");

function actualizarVista() {
  const marca = filtroMarca.value;
  const categoria = filtroCategoria.value;
  const termino = obtenerTerminoBusqueda(inputBusqueda);

  const productosFiltrados = filtrarProductos(productos, marca, categoria, termino);
  renderProductos(productosFiltrados);
}

async function iniciar() {
  try {
    mostrarSkeleton();
    inicializarMenu();

    productos = await obtenerProductos();

    generarFiltros(productos, filtroMarca, filtroCategoria);
    renderProductos(productos);

    filtroMarca.addEventListener("change", actualizarVista);
    filtroCategoria.addEventListener("change", actualizarVista);
    inputBusqueda.addEventListener("input", actualizarVista);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    document.getElementById("productos").innerHTML =
      "<p>Hubo un error al cargar los productos.</p>";
  }
}

iniciar();