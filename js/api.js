export async function obtenerProductos() {

  const cache = localStorage.getItem("productos");
  const cacheTime = localStorage.getItem("productos_time");

  const ahora = Date.now();
  const cincoMin = 5 * 60 * 1000;

  if (cache && cacheTime && (ahora - cacheTime < cincoMin)) {
    return JSON.parse(cache);
  }

  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvr7-LdORSUwxmZceeoMyO5q0h4CPKc0KBL5eR8vLpqodDb1rPEQK6IMMJUtYIc6bUmiW8fKe-xbMr/pub?output=csv";

  const response = await fetch(url);
  const data = await response.text();

  const filas = data.split(/\r?\n/).slice(1);

  const productos = filas
    .filter(fila => fila.trim() !== "")
    .map(fila => {

      const col = fila.split(",");

      return {
        nombre: col[0]?.trim(),
        marca: col[1]?.trim(),
        categoria: col[2]?.trim(),
        precioUSD: Number(col[3]),
        precioARS: Number(col[4]),
        imagen: col[5]?.trim(),
        stock: Number(col[6]),
        activo: col[7]?.trim().toLowerCase() === "true"
      };

    })
    .filter(p => p.activo);

  localStorage.setItem("productos", JSON.stringify(productos));
  localStorage.setItem("productos_time", ahora);

  return productos;
}