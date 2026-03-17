export function generarFiltros(productos, filtroMarca, filtroCategoria) {
  filtroMarca.innerHTML = `<option value="todas">Todas</option>`;
  filtroCategoria.innerHTML = `<option value="todas">Todas</option>`;

  const marcas = [...new Set(productos.map(p => p.marca))];
  const categorias = [...new Set(productos.map(p => p.categoria))];

  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;
    filtroMarca.appendChild(option);
  });

  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    filtroCategoria.appendChild(option);
  });
}

export function filtrarProductos(productos, marca, categoria, termino) {
  return productos.filter(producto => {
    const marcaOK = marca === "todas" || producto.marca === marca;
    const categoriaOK = categoria === "todas" || producto.categoria === categoria;

    const texto = `
      ${producto.nombre}
      ${producto.marca}
      ${producto.categoria}
    `.toLowerCase();

    const busquedaOK = texto.includes(termino.toLowerCase());

    return marcaOK && categoriaOK && busquedaOK;
  });
}