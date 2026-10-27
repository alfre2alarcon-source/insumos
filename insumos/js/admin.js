(() => {
const C = window.CONFIG, $ = s => document.querySelector(s), app = $("#app");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ars = n => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
const cod = p => "TS-" + String(p.codigo).padStart(4, "0");
if (!C.SUPABASE_URL || !C.SUPABASE_ANON_KEY) {
  app.innerHTML = '<div class="card narrow"><h2>Configuración pendiente</h2><p>Completá <code>js/config.js</code> con los datos de tu proyecto Supabase (ver README) para usar el panel.</p></div>'; return;
}
const sb = supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY);
let cats = [], prods = [], recovering = location.hash.includes("type=recovery");

const msg = (t, ok) => `<p class="${ok ? "okm" : "err"}" role="alert">${esc(t)}</p>`;
function login(note = "") {
  $("#out").hidden = true;
  app.innerHTML = `<form class="card narrow" id="f"><h2>Ingreso de administrador</h2>
    <label for="e">Correo</label><input id="e" type="email" required autocomplete="username">
    <label for="p">Contraseña</label><input id="p" type="password" required autocomplete="current-password">
    <div id="m">${note}</div><p><button class="btn">Ingresar</button></p><p><a href="#" id="forgot">Olvidé mi contraseña</a></p></form>`;
  $("#f").onsubmit = async e => { e.preventDefault();
    const { error } = await sb.auth.signInWithPassword({ email: $("#e").value, password: $("#p").value });
    if (error) $("#m").innerHTML = msg("Correo o contraseña incorrectos."); };
  $("#forgot").onclick = async e => { e.preventDefault();
    if (!$("#e").value) return $("#m").innerHTML = msg("Escribí tu correo y volvé a tocar el enlace.");
    const { error } = await sb.auth.resetPasswordForEmail($("#e").value, { redirectTo: location.origin + location.pathname });
    $("#m").innerHTML = error ? msg("No se pudo enviar el correo. Probá más tarde.") : msg("Si el correo es correcto, recibirás un enlace para crear una nueva contraseña.", true); };
}
function recovery() {
  $("#out").hidden = true;
  app.innerHTML = `<form class="card narrow" id="f"><h2>Nueva contraseña</h2><label for="n">Nueva contraseña (mínimo 8 caracteres)</label>
    <input id="n" type="password" minlength="8" required autocomplete="new-password"><div id="m"></div><p><button class="btn">Guardar contraseña</button></p></form>`;
  $("#f").onsubmit = async e => { e.preventDefault();
    const { error } = await sb.auth.updateUser({ password: $("#n").value });
    if (error) return $("#m").innerHTML = msg("No se pudo guardar. Revisá que tenga al menos 8 caracteres.");
    recovering = false; history.replaceState(null, "", location.pathname); panel(); };
}
async function data() {
  const [a, b] = await Promise.all([sb.from("categorias").select("*").order("nombre"), sb.from("productos").select("*").order("codigo")]);
  if (a.error || b.error) throw new Error("No se pudieron cargar los datos.");
  cats = a.data; prods = b.data;
}
const catName = id => cats.find(c => c.id === id)?.nombre || "—";
async function panel(note = "") {
  $("#out").hidden = false;
  try { await data(); } catch (e) { app.innerHTML = msg(e.message); return; }
  app.innerHTML = `${note}<div class="card"><div class="row"><h2 style="margin:0">Productos (${prods.length})</h2><button class="btn" data-new>Nuevo producto</button></div>
    <div class="scroll"><table><tr><th>Cód.</th><th></th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th></th></tr>
    ${prods.map(p => `<tr><td>${cod(p)}</td><td><img class="thumb" src="${esc(p.imagenes?.[0] || "")}" alt="" onerror="this.style.visibility='hidden'"></td><td>${esc(p.nombre)}</td><td>${esc(catName(p.categoria_id))}</td><td>${ars(p.precio)}</td><td>${p.stock}</td>
    <td>${p.activo ? "Publicado" : "Oculto"}</td><td class="acts"><button class="btn alt" data-edit="${p.id}">Editar</button><button class="btn bad" data-del="${p.id}">Eliminar</button></td></tr>`).join("") || '<tr><td colspan="8">Todavía no hay productos. Creá el primero con “Nuevo producto”.</td></tr>'}</table></div></div>
    <div class="card"><h2 style="margin-top:0">Categorías</h2><table>${cats.map(c => `<tr><td>${esc(c.nombre)}</td><td class="acts"><button class="btn alt" data-rcat="${c.id}">Renombrar</button><button class="btn bad" data-dcat="${c.id}">Eliminar</button></td></tr>`).join("")}</table>
    <form id="cf" class="row" style="margin-top:.8rem"><input id="cn" placeholder="Nueva categoría" required><button class="btn">Agregar categoría</button></form></div>
    <div id="ov" class="overlay" hidden><div class="box" id="bx"></div></div>`;
  $("#cf").onsubmit = async e => { e.preventDefault(); const { error } = await sb.from("categorias").insert({ nombre: $("#cn").value.trim() }); panel(error ? msg("No se pudo crear (¿ya existe?).") : msg("Categoría creada.", true)); };
}
const specsToText = o => Object.entries(o || {}).map(([k, v]) => `${k}: ${v}`).join("\n");
const textToSpecs = t => Object.fromEntries(t.split("\n").map(l => l.trim()).filter(l => l.includes(":")).map(l => { const i = l.indexOf(":"); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }).filter(([k]) => k));
function form(p) {
  p = p || { nombre: "", marca: "", descripcion: "", precio: 0, stock: 0, imagenes: [], especificaciones: {}, activo: true, categoria_id: cats[0]?.id };
  $("#bx").innerHTML = `<button class="x" data-x aria-label="Cerrar">×</button><form id="pf"><h2 style="margin-top:0">${p.id ? "Editar" : "Nuevo"} producto</h2>
    <label>Nombre</label><input id="f_n" required value="${esc(p.nombre)}">
    <div class="two"><div><label>Categoría</label><select id="f_c">${cats.map(c => `<option value="${c.id}" ${c.id === p.categoria_id ? "selected" : ""}>${esc(c.nombre)}</option>`).join("")}</select></div>
    <div><label>Marca</label><input id="f_m" value="${esc(p.marca)}"></div></div>
    <label>Descripción</label><textarea id="f_d">${esc(p.descripcion)}</textarea>
    <div class="two"><div><label>Precio (ARS)</label><input id="f_p" type="number" min="0" step="0.01" required value="${p.precio}"></div>
    <div><label>Stock (unidades)</label><input id="f_s" type="number" min="0" step="1" required value="${p.stock}"></div></div>
    <label>Imágenes (una URL por línea; la primera es la principal)</label><textarea id="f_i">${esc((p.imagenes || []).join("\n"))}</textarea>
    <label>Especificaciones técnicas (una por línea, formato “Característica: valor”)</label><textarea id="f_e">${esc(specsToText(p.especificaciones))}</textarea>
    <label><input id="f_a" type="checkbox" ${p.activo ? "checked" : ""}> Publicado en la tienda</label><div id="fm"></div>
    <p><button class="btn">Guardar</button> <button type="button" class="btn alt" data-x>Cancelar</button></p></form>`;
  $("#ov").hidden = false;
  $("#pf").onsubmit = async e => { e.preventDefault();
    const row = { nombre: $("#f_n").value.trim(), categoria_id: Number($("#f_c").value) || null, marca: $("#f_m").value.trim(), descripcion: $("#f_d").value.trim(),
      precio: Number($("#f_p").value), stock: parseInt($("#f_s").value, 10), activo: $("#f_a").checked,
      imagenes: $("#f_i").value.split("\n").map(s => s.trim()).filter(Boolean), especificaciones: textToSpecs($("#f_e").value) };
    if (!row.nombre || !(row.precio >= 0) || !(row.stock >= 0)) return $("#fm").innerHTML = msg("Revisá nombre, precio y stock.");
    if (row.imagenes.some(u => !/^https:\/\//i.test(u))) return $("#fm").innerHTML = msg("Las imágenes deben ser URLs que empiecen con https://");
    const { error } = p.id ? await sb.from("productos").update(row).eq("id", p.id) : await sb.from("productos").insert(row);
    if (error) return $("#fm").innerHTML = msg("No se pudo guardar el producto.");
    panel(msg("Producto guardado.", true)); };
}
app.addEventListener("click", async e => {
  const g = a => e.target.closest(`[${a}]`); let el;
  if (g("data-new")) form();
  else if ((el = g("data-edit"))) form(prods.find(p => p.id === el.dataset.edit));
  else if (g("data-x")) $("#ov").hidden = true;
  else if ((el = g("data-del"))) { const p = prods.find(x => x.id === el.dataset.del);
    if (confirm(`¿Eliminar "${p.nombre}"? No se puede deshacer. Si solo querés ocultarlo, editá el producto y desmarcá "Publicado".`)) { const { error } = await sb.from("productos").delete().eq("id", p.id); panel(error ? msg("No se pudo eliminar.") : msg("Producto eliminado.", true)); } }
  else if ((el = g("data-rcat"))) { const c = cats.find(x => x.id === Number(el.dataset.rcat)); const n = prompt("Nuevo nombre de la categoría:", c.nombre);
    if (n && n.trim()) { const { error } = await sb.from("categorias").update({ nombre: n.trim() }).eq("id", c.id); panel(error ? msg("No se pudo renombrar.") : msg("Categoría renombrada.", true)); } }
  else if ((el = g("data-dcat"))) { const c = cats.find(x => x.id === Number(el.dataset.dcat));
    if (confirm(`¿Eliminar la categoría "${c.nombre}"?`)) { const { error } = await sb.from("categorias").delete().eq("id", c.id); panel(error ? msg("No se puede eliminar una categoría que tiene productos. Movelos antes a otra categoría.") : msg("Categoría eliminada.", true)); } }
});
$("#out").onclick = () => sb.auth.signOut();
sb.auth.onAuthStateChange((ev, s) => {
  if (ev === "PASSWORD_RECOVERY") { recovering = true; return recovery(); }
  if (recovering) return;
  if (ev === "SIGNED_OUT" || (ev === "INITIAL_SESSION" && !s)) login();
  else if (s && (ev === "SIGNED_IN" || ev === "INITIAL_SESSION")) setTimeout(panel, 0);
});
})();
