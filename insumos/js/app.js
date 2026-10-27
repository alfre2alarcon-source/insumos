(() => {
const C = window.CONFIG, $ = s => document.querySelector(s);
const demo = !C.SUPABASE_URL || !C.SUPABASE_ANON_KEY;
const sb = demo ? null : supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY);
const ars = n => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const cod = p => "TS-" + String(p.codigo).padStart(4, "0");
const PH = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" fill="#64748b" font-family="sans-serif" font-size="28" text-anchor="middle">Sin imagen</text></svg>');
const img = (u, cls = "", data = "") => `<img class="${cls}" ${data} src="${esc(u || PH)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${PH}'">`;
let prods = [], cats = [], cat = 0, q = "", cart = {};
try { cart = JSON.parse(localStorage.getItem("ts_cart") || "{}"); } catch (e) {}
const persist = () => { try { localStorage.setItem("ts_cart", JSON.stringify(cart)); } catch (e) {} };
const byId = id => prods.find(p => String(p.id) === String(id));
const link = p => `${location.origin}${location.pathname}#p=${p.id}`;
const wa = t => `https://wa.me/${C.WHATSAPP}?text=${encodeURIComponent(t)}`;

async function load() {
  if (demo) { cats = DEMO.categorias; prods = DEMO.productos; $("#msg").textContent = "Modo demostración: datos de ejemplo."; return; }
  const [a, b] = await Promise.all([
    sb.from("categorias").select("*").order("nombre"),
    sb.from("productos").select("*").eq("activo", true).order("nombre")]);
  if (a.error || b.error) { $("#msg").textContent = "No se pudo cargar el catálogo. Probá de nuevo en unos minutos."; return; }
  cats = a.data; prods = b.data;
}

function render() {
  $("#cats").innerHTML = [{ id: 0, nombre: "Todas" }, ...cats].map(c => `<button data-cat="${c.id}" class="${c.id === cat ? "on" : ""}">${esc(c.nombre)}</button>`).join("");
  const l = prods.filter(p => (!cat || p.categoria_id === cat) && `${p.nombre} ${p.marca || ""}`.toLowerCase().includes(q));
  $("#grid").innerHTML = l.map(p => `<article class="item">${img(p.imagenes?.[0], "", `data-open="${p.id}"`)}
    <div class="b"><h3 data-open="${p.id}">${esc(p.nombre)}</h3><div class="meta">${esc(p.marca || "")} · ${cod(p)}</div>
    <div class="price">${ars(p.precio)}</div>
    ${p.stock > 0 ? `<span class="tag ok">Stock: ${p.stock}</span><button class="btn" data-add="${p.id}">Agregar al carrito</button>` : `<span class="tag">Agotado</span><button class="btn alt" data-open="${p.id}">Consultar</button>`}</div></article>`).join("");
  if (!l.length && !$("#msg").textContent) $("#grid").innerHTML = '<p class="note">No hay productos que coincidan con la búsqueda.</p>';
  $("#cnt").textContent = Object.values(cart).reduce((a, b) => a + b, 0);
}

function openProd(id) {
  const p = byId(id); if (!p) return;
  const im = p.imagenes?.length ? p.imagenes : [""];
  const sp = Object.entries(p.especificaciones || {});
  const t = `Hola ${C.NEGOCIO}! Quiero consultar por: ${p.nombre} (Cód. ${cod(p)}) - ${ars(p.precio)}.\n${link(p)}`;
  $("#mbox").innerHTML = `<button class="x" data-close aria-label="Cerrar">×</button><div class="det"><div>${img(im[0], "main")}
    <div class="thumbs">${im.length > 1 ? im.map((u, i) => img(u, i ? "" : "on", `data-th="${esc(u)}"`)).join("") : ""}</div></div>
    <div><h2 style="margin-top:0">${esc(p.nombre)}</h2><div class="meta">${esc(p.marca || "")} · Código ${cod(p)}</div>
    <p>${esc(p.descripcion)}</p><div class="price">${ars(p.precio)}</div>
    <p>${p.stock > 0 ? `<span class="tag ok">Stock disponible: ${p.stock}</span>` : '<span class="tag">Agotado por el momento</span>'}</p>
    <div class="row">${p.stock > 0 ? `<button class="btn alt" data-add="${p.id}">Agregar al carrito</button>` : ""}<a class="btn wa" target="_blank" rel="noopener" href="${wa(t)}">Consultar por WhatsApp</a></div></div></div>
    ${sp.length ? `<h3>Especificaciones técnicas</h3><table>${sp.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table>` : ""}`;
  $("#modal").hidden = false;
  history.replaceState(null, "", `#p=${p.id}`);
}
const closeModal = () => { $("#modal").hidden = true; history.replaceState(null, "", location.pathname); };

function drawer() {
  const rows = Object.entries(cart).map(([id, n]) => [byId(id), n]).filter(([p]) => p);
  const total = rows.reduce((s, [p, n]) => s + p.precio * n, 0);
  const t = `Hola ${C.NEGOCIO}! Quiero hacer este pedido:\n` + rows.map(([p, n]) => `• ${n} x ${p.nombre} (Cód. ${cod(p)}) - ${ars(p.precio * n)}\n  ${link(p)}`).join("\n") + `\nTotal: ${ars(total)}`;
  $("#drawer").innerHTML = `<div class="row"><h2 style="margin:0">Tu carrito</h2><button class="x" style="position:static" data-dclose aria-label="Cerrar">×</button></div>
  ${rows.length ? rows.map(([p, n]) => `<div class="row"><div><strong>${esc(p.nombre)}</strong><div class="meta">${cod(p)} · ${ars(p.precio)}</div></div>
    <div class="qty"><button class="btn alt" data-dec="${p.id}">−</button> ${n} <button class="btn alt" data-add="${p.id}">+</button></div></div>`).join("")
    + `<div class="row"><strong>Total</strong><strong>${ars(total)}</strong></div><a class="btn wa" target="_blank" rel="noopener" href="${wa(t)}">Enviar pedido por WhatsApp</a><button class="btn alt" data-clear>Vaciar carrito</button>`
    : '<p class="note">Todavía no agregaste productos.</p>'}`;
  $("#drawer").hidden = false;
}

document.addEventListener("click", e => {
  const g = a => e.target.closest(`[${a}]`);
  let el;
  if ((el = g("data-th"))) { const m = $("#mbox .main"); m.src = el.dataset.th; document.querySelectorAll(".thumbs img").forEach(i => i.classList.toggle("on", i === el)); }
  else if ((el = g("data-open"))) openProd(el.dataset.open);
  else if (g("data-close") || e.target.id === "modal") closeModal();
  else if ((el = g("data-add"))) { const p = byId(el.dataset.add); if (p && (cart[p.id] || 0) < p.stock) { cart[p.id] = (cart[p.id] || 0) + 1; persist(); render(); if (!$("#drawer").hidden) drawer(); else el.textContent = "Agregado ✓"; } }
  else if ((el = g("data-dec"))) { const id = el.dataset.dec; if (--cart[id] <= 0) delete cart[id]; persist(); render(); drawer(); }
  else if (g("data-clear")) { cart = {}; persist(); render(); drawer(); }
  else if (g("data-dclose")) $("#drawer").hidden = true;
  else if ((el = g("data-cat"))) { cat = Number(el.dataset.cat); render(); }
  else if (e.target.closest("#cartBtn")) drawer();
});
$("#q").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); render(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { $("#drawer").hidden = true; if (!$("#modal").hidden) closeModal(); } });

load().then(() => {
  for (const id of Object.keys(cart)) if (!byId(id)) delete cart[id];
  render();
  const m = location.hash.match(/^#p=(.+)$/); if (m) openProd(m[1]);
});
})();
