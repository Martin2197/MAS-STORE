import { obtenerProductos } from "./api.js";
import { renderProductos } from "./render.js";
import { mostrarSkeleton } from "./skeleton.js";
import { generarFiltros, filtrarProductos } from "./filtros.js";
import { inicializarMenu } from "./menu.js";
import { obtenerTerminoBusqueda } from "./busqueda.js";

let productos = [];
let paginaActual = 1;
const productosPorPagina = 8;

let inputBusqueda;
let btnVerMas;
let filtroMarca;
let filtroCategoria;

function obtenerProductosPaginados(lista) {
  const fin = paginaActual * productosPorPagina;
  return lista.slice(0, fin);
}

function obtenerProductosFiltrados() {
  const marca = filtroMarca.value;
  const categoria = filtroCategoria.value;
  const termino = obtenerTerminoBusqueda(inputBusqueda);

  return filtrarProductos(productos, marca, categoria, termino);
}

function actualizarBotonVerMas(productosVisibles, productosFiltrados) {
  if (!btnVerMas) return;

  if (productosVisibles.length >= productosFiltrados.length) {
    btnVerMas.style.display = "none";
  } else {
    btnVerMas.style.display = "inline-block";
  }
}

function renderVista() {
  const productosFiltrados = obtenerProductosFiltrados();
  const productosVisibles = obtenerProductosPaginados(productosFiltrados);

  renderProductos(productosVisibles);
  actualizarBotonVerMas(productosVisibles, productosFiltrados);
}

function actualizarVista() {
  paginaActual = 1;
  renderVista();
}

function mostrarMasProductos() {
  paginaActual++;
  renderVista();
}

async function iniciar() {
  try {
    mostrarSkeleton();
    inicializarMenu();

    filtroMarca = document.getElementById("filtroMarca");
    filtroCategoria = document.getElementById("filtroCategoria");
    inputBusqueda = document.querySelector(".navBar__search");
    btnVerMas = document.getElementById("btnVerMas");

    productos = await obtenerProductos();

    generarFiltros(productos, filtroMarca, filtroCategoria);

    renderVista();

    filtroMarca.addEventListener("change", actualizarVista);
    filtroCategoria.addEventListener("change", actualizarVista);
    inputBusqueda.addEventListener("input", actualizarVista);

    if (btnVerMas) {
      btnVerMas.addEventListener("click", mostrarMasProductos);
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
    document.getElementById("productos").innerHTML =
      "<p>Hubo un error al cargar los productos.</p>";
  }
}

iniciar();