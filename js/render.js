export function renderProductos(lista) {
  const container = document.getElementById("productos");

  container.innerHTML = "";

  if(lista.length === 0){

    container.innerHTML = `
    <div class="empty-state">
      <h3>No se encontraron productos</h3>
      <p>Prueba cambiando los filtros o el buscador</p>
    </div>
    `;
    return;
  }

  lista.forEach(producto => {
    const card = document.createElement("article");
    card.classList.add("producto-card");

    let estadoStock = "";

    if (producto.stock === 0) {
      estadoStock = `<span class="stock stock--rojo">Sin stock</span>`;
    } else if (producto.stock <= 3) {
      estadoStock = `<span class="stock stock--amarillo">Últimas unidades</span>`;
    } else {
      estadoStock = `<span class="stock stock--verde">Disponible</span>`;
    }

    card.innerHTML = `
      <img loading="lazy" decoding="async" src="Assets/${producto.imagen}" 
      alt="${producto.nombre}" class="producto-card__img">

      <div class="producto-card__info">
        <h3 class="producto-card__titulo">${producto.nombre}</h3>
        <p class="producto-card__marca">${producto.marca}</p>
        <p class="producto-card__categoria">${producto.categoria}</p>
        <p class="producto-card__precio-usd">USD $${producto.precioUSD}</p>
        <p class="producto-card__precio-ars">$${producto.precioARS.toLocaleString()} ARS</p>
        <p class="producto-card__stock">${estadoStock}</p>
      </div>

      <a 
        href="https://wa.me/3795028387?text=Hola!%20Quería%20consultar%20por%20el%20${encodeURIComponent(producto.nombre)}" 
        target="_blank" 
        class="producto-card__btn"
      >
        Consultar
      </a>
    `;

    container.appendChild(card);
  });
}