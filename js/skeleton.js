export function mostrarSkeleton() {
  const container = document.getElementById("productos");

  container.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const card = document.createElement("div");
    card.classList.add("skeleton-card", "skeleton");

    card.innerHTML = `
      <div class="skeleton-img skeleton"></div>
      <div class="skeleton-text skeleton"></div>
      <div class="skeleton-text short skeleton"></div>
      <div class="skeleton-text short skeleton"></div>
    `;

    container.appendChild(card);
  }
}