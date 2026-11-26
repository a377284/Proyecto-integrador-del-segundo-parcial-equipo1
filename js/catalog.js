// Carga el catálogo desde /data/vehicles.json y lo dibuja en la página principal.
const DETAIL_PAGES = { 1: '/vehiculo1.html', 2: '/vehiculo2.html', 3: '/vehiculo3.html' };

function createCard(v) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <img src="${v.imagen}" alt="${v.marca} ${v.modelo}" loading="lazy">
    <h3>${v.marca} ${v.modelo}</h3>
    <p>Año: ${v.anio}</p>
    <p class="price">$${v.precio.toLocaleString("es-MX")} MXN / día</p><p class="list">Desde $${v.precioLista.toLocaleString("es-MX")}</p>`;
  if (DETAIL_PAGES[v.id]) {
    const a = document.createElement('a');
    a.href = DETAIL_PAGES[v.id];
    a.className = 'btn small';
    a.textContent = 'Ver detalle';
    card.appendChild(a);
  }
  return card;
}

fetch('/data/vehicles.json')
  .then(r => r.json())
  .then(list => {
    const box = document.getElementById('catalog');
    list.forEach(v => box.appendChild(createCard(v)));
  })
  .catch(() => {
    document.getElementById('catalog').textContent = 'No se pudo cargar el catálogo.';
  });
