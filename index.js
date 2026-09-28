import { DurableObject } from "cloudflare:workers";

const VERSION = "0.6.0";
const HTML = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="theme-color" content="#f5f3ed" />
  <title>Folio · Consulta judicial</title>
  <style>
:root{--paper:#f5f3ed;--ink:#18201d;--muted:#66706b;--line:#d9d6cc;--card:#fbfaf6;--accent:#1d5d4c;--danger:#8a342f;--shadow:0 18px 55px rgba(25,31,28,.08)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:-.01em}
button,input,select{font:inherit}.topbar{height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 max(24px,5vw);border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(245,243,237,.94);backdrop-filter:blur(15px);z-index:10}.brand{font-family:Georgia,serif;font-size:30px;color:var(--ink);text-decoration:none}.brand span{color:var(--accent)}nav{display:flex;gap:18px;align-items:center}.link-btn{border:0;background:transparent;color:var(--ink);cursor:pointer}.pill{border:1px solid var(--ink);border-radius:999px;padding:10px 15px;color:var(--ink);text-decoration:none;font-size:14px}
main{width:min(1120px,90vw);margin:0 auto}.hero{padding:76px 0 44px}.eyebrow{font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--muted);margin:0 0 14px}.hero h1{font-family:Georgia,serif;font-size:clamp(44px,7vw,78px);line-height:.98;letter-spacing:-.05em;margin:0;max-width:900px;font-weight:500}.hero em{font-weight:400;color:var(--accent)}.lead{font-size:18px;line-height:1.6;color:var(--muted);max-width:760px;margin:28px 0 20px}.status-strip{display:flex;align-items:center;gap:9px;font-size:13px;color:var(--muted)}.dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 5px rgba(29,93,76,.08)}.demo-badge{font-size:10px;letter-spacing:.12em;font-weight:800;padding:5px 8px;border-radius:999px;border:1px solid #c9a25d;color:#795719;background:#fff9ea;margin-left:6px}
.search-card{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:30px;box-shadow:var(--shadow)}.card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.card-head>div{display:flex;gap:12px;align-items:center}.card-head p{font-size:12px;font-weight:800;letter-spacing:.13em;margin:0}.num{font-family:Georgia,serif;font-size:18px;color:var(--accent)}.scope{font-size:12px;color:var(--muted)}.compact{margin-top:2px}.grid.two{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.scope-block{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
.scope-group{border:1px solid var(--line);border-radius:15px;padding:14px;background:#fff}
.scope-group>span{display:block;font-size:12px;color:var(--muted);font-weight:800;margin-bottom:10px}
.segmented{display:grid;grid-template-columns:1fr 1fr;gap:6px;background:#f1eee6;border-radius:11px;padding:4px}
.seg{border:0;background:transparent;color:var(--muted);border-radius:8px;padding:10px 8px;font-size:12px;font-weight:800;cursor:pointer}
.seg.active{background:#fff;color:var(--ink);box-shadow:0 1px 5px rgba(0,0,0,.08)}
.field-disabled{opacity:.48;pointer-events:none}label{display:flex;flex-direction:column;gap:9px;font-size:13px;color:var(--muted);font-weight:700}select,input{width:100%;border:1px solid var(--line);background:#fff;border-radius:12px;padding:15px;color:var(--ink);outline:none}select:focus,input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(29,93,76,.09)}.hint{font-size:12px;color:var(--muted);margin:13px 0 0}.divider{height:1px;background:var(--line);margin:28px 0}.tabs{display:flex;gap:8px;margin-bottom:18px}.tab{border:1px solid var(--line);background:transparent;border-radius:999px;padding:10px 14px;cursor:pointer;color:var(--muted)}.tab.active{background:var(--ink);color:#fff;border-color:var(--ink)}.query-label{color:var(--ink)}.query-row{display:grid;grid-template-columns:1fr auto;gap:10px}.primary,.danger{border:0;border-radius:12px;padding:0 22px;cursor:pointer;font-weight:800}.primary{background:var(--accent);color:#fff;min-height:50px}.primary:disabled{opacity:.45;cursor:not-allowed}.danger{border:1px solid #e3b6b2;background:#fff7f6;color:var(--danger);min-height:44px}
.progress-panel{margin-top:18px;border:1px solid var(--line);border-radius:18px;padding:22px;background:#fff}.hidden{display:none}.progress-top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.progress-top h2{font-family:Georgia,serif;font-weight:500;font-size:26px;margin:0}.bar{height:9px;border-radius:999px;background:#ebe8df;overflow:hidden;margin:22px 0 12px}.bar>div{height:100%;width:0;background:var(--accent);transition:width .35s ease}.metrics{display:flex;gap:24px;color:var(--muted);font-size:13px}.metrics span:last-child{margin-left:auto;font-weight:800;color:var(--ink)}
.results{padding:58px 0 28px}.results-head{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid var(--line);padding-bottom:20px}.results-head h2{font-family:Georgia,serif;font-size:34px;font-weight:500;margin:0}.results-head>span{font-size:13px;color:var(--muted)}.results-list{padding-top:18px}.empty{padding:36px 0 48px;max-width:560px}.empty>span{font-family:Georgia,serif;color:var(--accent);font-size:15px}.empty h3{font-family:Georgia,serif;font-size:28px;font-weight:500;margin:10px 0}.empty p{color:var(--muted);line-height:1.6;margin:0}.result-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px;margin-bottom:12px;display:grid;grid-template-columns:1.5fr 1fr auto;gap:18px;align-items:center}.result-card h3{font-family:Georgia,serif;font-weight:500;font-size:20px;margin:0 0 8px}.meta{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--muted)}.result-card .where{font-size:13px;line-height:1.5;color:var(--muted)}.demo-tag{display:inline-flex;font-size:10px;font-weight:900;letter-spacing:.1em;border:1px solid #c9a25d;background:#fff9ea;color:#795719;padding:6px 8px;border-radius:999px}.notice{margin:20px 0 70px;padding:20px;border-left:3px solid var(--accent);background:rgba(255,255,255,.5)}.notice strong{font-size:14px}.notice p{margin:5px 0 0;color:var(--muted);line-height:1.55;font-size:13px}footer{border-top:1px solid var(--line);padding:28px max(24px,5vw) 44px;display:flex;justify-content:space-between;gap:20px;color:var(--muted);font-size:12px}footer span{font-family:Georgia,serif;font-size:25px;color:var(--ink)}footer p{max-width:680px;text-align:right}
dialog{border:1px solid var(--line);border-radius:18px;padding:30px;width:min(560px,90vw);background:var(--card);color:var(--ink);box-shadow:0 30px 80px rgba(0,0,0,.2)}dialog::backdrop{background:rgba(24,32,29,.35);backdrop-filter:blur(4px)}dialog h2{font-family:Georgia,serif;font-size:30px;font-weight:500;margin:0 0 18px}dialog li{margin:10px 0;color:var(--muted);line-height:1.5}.close{float:right;border:0;background:transparent;font-size:28px;cursor:pointer}
@media(max-width:760px){.topbar{height:66px}.link-btn{display:none}.hero{padding:40px 0 28px}.hero h1{font-size:44px}.lead{font-size:16px}.search-card{padding:20px;border-radius:18px}.scope-block,.grid.two,.query-row{grid-template-columns:1fr}.primary{min-height:52px}.progress-top{flex-direction:column}.danger{width:100%}.metrics{gap:10px;flex-wrap:wrap}.metrics span:last-child{margin-left:0}.result-card{grid-template-columns:1fr}.results-head{align-items:flex-start;gap:15px}.results-head h2{font-size:28px}footer{flex-direction:column}footer p{text-align:left}.tabs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}.tab{white-space:normal;padding:10px 7px;font-size:11px;line-height:1.15}}

</style>
</head>
<body>
  <header class="topbar">
    <a class="brand" href="#">folio<span>.</span></a>
    <nav>
      <button class="link-btn" id="howBtn">Cómo buscar</button>
      <a class="pill" href="https://mev.scba.gov.ar/loguin.asp" target="_blank" rel="noopener">Abrir MEV ↗</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <p class="eyebrow">PROVINCIA DE BUENOS AIRES</p>
      <h1>Encontrá el expediente.<br><em>Sin perderte en el camino.</em></h1>
      <p class="lead">Folio organiza la consulta judicial en una sola pantalla. Folio ya tiene preparado el motor de búsqueda progresiva. Los datos reales se conectarán únicamente mediante una fuente oficial o integración autorizada por la SCBA.</p>
      <div class="status-strip">
        <span class="dot"></span><span id="sourceStatus">Motor de búsqueda listo</span>
        <span class="demo-badge" id="demoBadge">MODO DEMO</span>
      </div>
    </section>

    <section class="search-card" aria-labelledby="searchTitle">
      <div class="card-head">
        <div><span class="num">01</span><p>DÓNDE BUSCAR</p></div>
        <span class="scope">23 departamentos</span>
      </div>

      <div class="scope-block">
        <div class="scope-group">
          <span>Jurisdicción</span>
          <div class="segmented">
            <button type="button" class="seg active" id="allJurBtn">Todas</button>
            <button type="button" class="seg" id="oneJurBtn">Una específica</button>
          </div>
        </div>
        <div class="scope-group">
          <span>Juzgados / organismos</span>
          <div class="segmented">
            <button type="button" class="seg active" id="allOrgBtn">Todos</button>
            <button type="button" class="seg" id="oneOrgBtn">Uno específico</button>
          </div>
        </div>
      </div>

      <div class="grid two">
        <label id="departmentField" class="field-disabled">Departamento judicial
          <select id="department" disabled>
            <option value="all">Elegí un departamento</option>
            <option>Azul</option><option>Bahía Blanca</option><option>Dolores</option><option>Junín</option><option>La Matanza</option>
            <option>La Plata</option><option>Lomas de Zamora</option><option>Mar del Plata</option><option>Mercedes</option><option>Merlo</option>
            <option>Moreno-General Rodríguez</option><option>Morón</option><option>Necochea</option><option>Pergamino</option><option>Quilmes</option>
            <option>San Isidro</option><option>San Martín</option><option>San Nicolás</option><option>Trenque Lauquen</option><option>Zárate-Campana</option>
            <option>Avellaneda-Lanús</option><option>San Miguel</option><option>Tres Arroyos</option>
          </select>
        </label>

        <label id="organismField" class="field-disabled">Juzgado u organismo
          <select id="organism" disabled>
            <option value="all">Todos los organismos</option>
          </select>
        </label>
      </div>
      <p class="hint" id="scopeHint">Se buscará en todos los departamentos y todos los organismos disponibles.</p>

      <div class="divider"></div>
      <div class="card-head compact"><div><span class="num">02</span><p>QUÉ BUSCAR</p></div></div>
      <div class="tabs" role="tablist">
        <button class="tab active" data-type="caption">Carátula</button>
        <button class="tab" data-type="case">N.º de expediente</button>
        <button class="tab" data-type="receptoria">Receptoría</button>
      </div>

      <label class="query-label" id="queryLabel">Carátula o nombre de las partes
        <div class="query-row">
          <input id="term" autocomplete="off" placeholder="Ej.: PÉREZ JUAN" />
          <button id="searchBtn" class="primary">Buscar</button>
        </div>
      </label>
    </section>

    <section id="progressPanel" class="progress-panel hidden" aria-live="polite">
      <div class="progress-top">
        <div>
          <p class="eyebrow" id="stateLabel">BUSCANDO</p>
          <h2 id="progressTitle">Preparando consulta…</h2>
        </div>
        <button id="stopBtn" class="danger">Detener búsqueda</button>
      </div>
      <div class="bar"><div id="barFill"></div></div>
      <div class="metrics">
        <span><strong id="processed">0</strong> / <span id="total">0</span> organismos</span>
        <span><strong id="found">0</strong> resultados</span>
        <span id="percent">0%</span>
      </div>
    </section>

    <section class="results" id="resultsSection">
      <div class="results-head">
        <div><p class="eyebrow">RESULTADOS</p><h2 id="resultsTitle">La lectura empieza por encontrar.</h2></div>
        <span id="resultCount">0 causas</span>
      </div>
      <div id="resultsList" class="results-list">
        <div class="empty">
          <span>F 01</span>
          <h3>Cada causa, en su lugar.</h3>
          <p>Escribí la carátula o el número. Folio organiza la búsqueda y te muestra el avance sin obligarte a navegar pantalla por pantalla.</p>
        </div>
      </div>
    </section>

    <section class="notice">
      <strong>Privacidad por diseño.</strong>
      <p>Folio no pide ni almacena usuario o contraseña de MEV. Mientras se tramita una vía de integración oficial, el acceso humano a MEV se mantiene directamente en el sitio de la SCBA.</p>
    </section>
  </main>

  <footer>
    <span>folio.</span>
    <p>Herramienta independiente · No es un sitio oficial de la SCBA · Los resultados demo están identificados expresamente.</p>
  </footer>

  <dialog id="howDialog">
    <button class="close" id="closeHow">×</button>
    <p class="eyebrow">CÓMO FUNCIONA</p>
    <h2>Una búsqueda visible de principio a fin.</h2>
    <ol>
      <li>Elegís el alcance y escribís la causa.</li>
      <li>Folio crea una cola de organismos y muestra el progreso.</li>
      <li>Los resultados aparecen sin esperar al final.</li>
      <li>Podés detener la búsqueda y conservar lo encontrado.</li>
    </ol>
  </dialog>

  <script>
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let searchType = "caption";
let jurisdictionMode = "all";
let organismMode = "all";
let jobId = null;
let pollTimer = null;
let lastResultsSignature = "";

const ui = {
  department: $("#department"), organism: $("#organism"), term: $("#term"), searchBtn: $("#searchBtn"),
  departmentField: $("#departmentField"), organismField: $("#organismField"), scopeHint: $("#scopeHint"),
  progressPanel: $("#progressPanel"), stopBtn: $("#stopBtn"), barFill: $("#barFill"), processed: $("#processed"),
  total: $("#total"), found: $("#found"), percent: $("#percent"), progressTitle: $("#progressTitle"),
  stateLabel: $("#stateLabel"), resultsList: $("#resultsList"), resultCount: $("#resultCount"),
  resultsTitle: $("#resultsTitle"), queryLabel: $("#queryLabel"), demoBadge: $("#demoBadge"), sourceStatus: $("#sourceStatus")
};


const DEMO_ORGANISMS = [
  "Juzgado Civil y Comercial N.º 1",
  "Juzgado Civil y Comercial N.º 2",
  "Juzgado Civil y Comercial N.º 3",
  "Tribunal del Trabajo N.º 1",
  "Juzgado Contencioso Administrativo N.º 1"
];

$("#allJurBtn").addEventListener("click", () => setJurisdictionMode("all"));
$("#oneJurBtn").addEventListener("click", () => setJurisdictionMode("one"));
$("#allOrgBtn").addEventListener("click", () => setOrganismMode("all"));
$("#oneOrgBtn").addEventListener("click", () => setOrganismMode("one"));
ui.department.addEventListener("change", refreshOrganisms);
ui.organism.addEventListener("change", updateScopeHint);

function setJurisdictionMode(mode) {
  jurisdictionMode = mode;
  $("#allJurBtn").classList.toggle("active", mode === "all");
  $("#oneJurBtn").classList.toggle("active", mode === "one");

  const specific = mode === "one";
  ui.department.disabled = !specific;
  ui.departmentField.classList.toggle("field-disabled", !specific);

  if (!specific) {
    ui.department.value = "all";
    if (organismMode === "one") {
      organismMode = "all";
      $("#allOrgBtn").classList.add("active");
      $("#oneOrgBtn").classList.remove("active");
    }
  } else if (ui.department.value === "all") {
    ui.department.selectedIndex = 1;
  }

  refreshOrganisms();
  updateScopeHint();
}

function setOrganismMode(mode) {
  if (mode === "one" && jurisdictionMode !== "one") {
    setJurisdictionMode("one");
  }

  organismMode = mode;
  $("#allOrgBtn").classList.toggle("active", mode === "all");
  $("#oneOrgBtn").classList.toggle("active", mode === "one");

  refreshOrganisms();
  updateScopeHint();
}

function refreshOrganisms() {
  if (organismMode !== "one") {
    ui.organism.innerHTML = '<option value="all">Todos los organismos</option>';
    ui.organism.value = "all";
    ui.organism.disabled = true;
    ui.organismField.classList.add("field-disabled");
    return;
  }

  ui.organism.innerHTML = DEMO_ORGANISMS.map(name =>
    '<option value="' + escapeAttr(name) + '">' + escapeHtml(name) + '</option>'
  ).join("");

  ui.organism.disabled = false;
  ui.organismField.classList.remove("field-disabled");
}

function updateScopeHint() {
  if (jurisdictionMode === "all") {
    ui.scopeHint.textContent = "Se buscará en todos los departamentos y todos los organismos disponibles.";
    return;
  }

  const jur = ui.department.value === "all" ? "el departamento seleccionado" : ui.department.value;

  if (organismMode === "all") {
    ui.scopeHint.textContent = "Se buscará en todos los juzgados y organismos de " + jur + ".";
  } else {
    ui.scopeHint.textContent = "Se buscará sólo en " + ui.organism.value + " de " + jur + ".";
  }
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}


$$('.tab').forEach(btn => btn.addEventListener('click', () => {
  $$('.tab').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  searchType = btn.dataset.type;
  const labels = {
    caption: ['Carátula o nombre de las partes', 'Ej.: PÉREZ JUAN'],
    case: ['Número de expediente', 'Ej.: SI-6072-2024'],
    receptoria: ['Número de receptoría', 'Ej.: ZC 2260/2026']
  };
  ui.queryLabel.childNodes[0].textContent = labels[searchType][0] + ' ';
  ui.term.placeholder = labels[searchType][1];
}));

ui.searchBtn.addEventListener('click', startSearch);
ui.term.addEventListener('keydown', e => { if (e.key === 'Enter') startSearch(); });
ui.stopBtn.addEventListener('click', stopSearch);

$("#howBtn").addEventListener('click', () => $("#howDialog").showModal());
$("#closeHow").addEventListener('click', () => $("#howDialog").close());

async function startSearch() {
  const term = ui.term.value.trim();
  if (!term) { ui.term.focus(); return; }
  resetResults();
  ui.searchBtn.disabled = true;
  ui.progressPanel.classList.remove('hidden');
  ui.stopBtn.disabled = false;
  ui.stateLabel.textContent = 'BUSCANDO';
  ui.progressTitle.textContent = 'Creando cola de organismos…';

  try {
    const r = await fetch('/api/jobs', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: searchType, term, department: jurisdictionMode === "all" ? "all" : ui.department.value, organism: organismMode === "all" ? "all" : ui.organism.value, state: "active" })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.message || 'No se pudo iniciar la búsqueda');
    jobId = data.id;
    renderJob(data);
    schedulePoll(220);
  } catch (err) {
    showError(err.message);
    ui.searchBtn.disabled = false;
  }
}

async function poll() {
  if (!jobId) return;
  try {
    const r = await fetch(\`/api/jobs/\${jobId}\`);
    const data = await r.json();
    if (!r.ok) throw new Error('No se pudo actualizar el estado.');
    renderJob(data);
    if (data.state === 'running') schedulePoll(450);
    else finish(data);
  } catch (err) {
    showError(err.message);
    ui.searchBtn.disabled = false;
  }
}

function schedulePoll(ms) {
  clearTimeout(pollTimer);
  pollTimer = setTimeout(poll, ms);
}

async function stopSearch() {
  if (!jobId) return;
  ui.stopBtn.disabled = true;
  clearTimeout(pollTimer);
  const r = await fetch(\`/api/jobs/\${jobId}/cancel\`, { method: 'POST' });
  const data = await r.json();
  renderJob(data);
  finish(data);
}

function renderJob(job) {
  ui.processed.textContent = job.processed;
  ui.total.textContent = job.total;
  ui.found.textContent = job.results.length;
  ui.percent.textContent = \`\${job.progress}%\`;
  ui.barFill.style.width = \`\${job.progress}%\`;
  ui.progressTitle.textContent = job.message;
  ui.stateLabel.textContent = job.state === 'running' ? 'BUSCANDO' : job.state === 'cancelled' ? 'DETENIDA' : 'FINALIZADA';
  renderResults(job.results);
}

function renderResults(results) {
  const signature = results.map(r => r.id).join('|');
  if (signature === lastResultsSignature) return;
  lastResultsSignature = signature;
  ui.resultCount.textContent = \`\${results.length} \${results.length === 1 ? 'causa' : 'causas'}\`;
  if (!results.length) return;
  ui.resultsTitle.textContent = 'Causas encontradas durante la búsqueda.';
  ui.resultsList.innerHTML = results.map(r => \`
    <article class="result-card">
      <div>
        <h3>\${escapeHtml(r.caption)}</h3>
        <div class="meta"><span>\${escapeHtml(r.caseNumber)}</span><span>\${escapeHtml(r.receptoria)}</span><span>\${escapeHtml(r.status)}</span></div>
      </div>
      <div class="where"><strong>\${escapeHtml(r.department)}</strong><br>\${escapeHtml(r.organism)}<br>\${escapeHtml(r.lastAction)}</div>
      \${r.demo ? '<span class="demo-tag">DEMO</span>' : ''}
    </article>\`).join('');
}

function finish(job) {
  clearTimeout(pollTimer);
  ui.searchBtn.disabled = false;
  ui.stopBtn.disabled = true;
  ui.resultsTitle.textContent = job.state === 'cancelled' ? 'Búsqueda detenida: conservamos lo encontrado.' : 'Búsqueda finalizada.';
}

function resetResults() {
  lastResultsSignature = '';
  ui.resultsList.innerHTML = \`<div class="empty"><span>F 01</span><h3>Buscando…</h3><p>Los resultados irán apareciendo sin esperar al final.</p></div>\`;
  ui.resultCount.textContent = '0 causas';
  ui.found.textContent = '0';
  ui.barFill.style.width = '0%';
}

function showError(message) {
  ui.progressPanel.classList.remove('hidden');
  ui.stateLabel.textContent = 'ERROR';
  ui.progressTitle.textContent = message;
  ui.stopBtn.disabled = true;
}

async function loadCapabilities() {
  try {
    const r = await fetch('/api/capabilities');
    const c = await r.json();
    ui.demoBadge.hidden = c.sourceMode !== 'demo';
    ui.sourceStatus.textContent = c.sourceMode === 'demo' ? 'Motor listo · fuente real pendiente de autorización' : 'Fuente autorizada conectada';
  } catch (_) {}
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

setJurisdictionMode("all");
setOrganismMode("all");
loadCapabilities();

</script>
</body>
</html>
`;

const DEPARTMENTS = [
  "Azul", "Bahía Blanca", "Dolores", "Junín", "La Matanza", "La Plata",
  "Lomas de Zamora", "Mar del Plata", "Mercedes", "Merlo", "Moreno-General Rodríguez",
  "Morón", "Necochea", "Pergamino", "Quilmes", "San Isidro", "San Martín",
  "San Nicolás", "Trenque Lauquen", "Zárate-Campana", "Avellaneda-Lanús",
  "San Miguel", "Tres Arroyos"
];

const demoSource = {
  id: "demo",
  label: "Demostración",
  authorized: true,
  async searchTarget({ job, target, index }) {
    if (!shouldAddDemoResult(job.query.term, index)) return [];
    return [demoResult(job, target, index)];
  }
};

function getSource(mode) {
  return mode === "demo" ? demoSource : null;
}

function sourceCapabilities(mode) {
  const source = getSource(mode);
  return {
    mode,
    available: Boolean(source),
    authorized: Boolean(source?.authorized),
    label: source?.label || "No configurado"
  };
}

const jsonResponse = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...headers
  }
});

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    if (!url.pathname.startsWith("/api/")) {
      return new Response(HTML, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-cache",
          "x-content-type-options": "nosniff"
        }
      });
    }

    const sourceMode = env.SOURCE_MODE || "demo";

    if (url.pathname === "/api/health") {
      return jsonResponse({
        ok: true,
        service: "folio",
        version: VERSION,
        source: sourceCapabilities(sourceMode)
      }, 200, cors);
    }

    if (url.pathname === "/api/capabilities") {
      const source = sourceCapabilities(sourceMode);
      return jsonResponse({
        progressiveSearch: true,
        cancelSearch: true,
        deduplication: true,
        sourceMode,
        source,
        mevAutomation: false,
        expectedWorkersDevUrl: "https://folio.desarrollarg.workers.dev",
        reason: "Folio no automatiza cuentas humanas de MEV. La fuente real se habilitará únicamente mediante una vía oficial o autorización de integración."
      }, 200, cors);
    }

    if (url.pathname === "/api/source-policy") {
      return jsonResponse({
        current: sourceMode,
        allowedModes: ["demo"],
        mevCredentialsAccepted: false,
        externalAutomationEnabled: false,
        note: "No enviar credenciales MEV a Folio."
      }, 200, cors);
    }

    if (url.pathname === "/api/jobs" && request.method === "POST") {
      const source = getSource(sourceMode);
      if (!source) {
        return jsonResponse({ error: "source_unavailable", message: "No hay una fuente de datos habilitada." }, 503, cors);
      }

      const body = await request.json().catch(() => ({}));
      const id = crypto.randomUUID();
      const stub = env.SEARCH_JOBS.get(env.SEARCH_JOBS.idFromName(id));
      const response = await stub.fetch("https://job/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, id, sourceMode })
      });
      const payload = await response.json();
      return jsonResponse(payload, response.status, cors);
    }

    const m = url.pathname.match(/^\/api\/jobs\/([a-f0-9-]+)(?:\/(cancel))?$/i);
    if (m) {
      const [, id, action] = m;
      const stub = env.SEARCH_JOBS.get(env.SEARCH_JOBS.idFromName(id));
      const target = action === "cancel" ? "https://job/cancel" : "https://job/status";
      const method = action === "cancel" ? "POST" : "GET";
      const response = await stub.fetch(target, { method });
      const payload = await response.json();
      return jsonResponse(payload, response.status, cors);
    }

    return jsonResponse({ error: "not_found" }, 404, cors);
  }
};

export class SearchJob extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/create" && request.method === "POST") return this.create(request);
    if (url.pathname === "/status" && request.method === "GET") return this.status();
    if (url.pathname === "/cancel" && request.method === "POST") return this.cancel();
    return jsonResponse({ error: "not_found" }, 404);
  }

  async create(request) {
    const body = await request.json();
    const query = normalizeQuery(body);
    if (!query.term) {
      return jsonResponse({ error: "missing_term", message: "Ingresá una carátula, expediente o receptoría." }, 400);
    }

    const source = getSource(body.sourceMode);
    if (!source) {
      return jsonResponse({ error: "source_unavailable", message: "La fuente solicitada no está habilitada." }, 503);
    }

    const targets = buildTargets(query);
    const now = Date.now();
    const job = {
      id: body.id,
      state: "running",
      createdAt: now,
      updatedAt: now,
      query,
      targets,
      processed: 0,
      total: targets.length,
      results: [],
      sourceMode: body.sourceMode,
      message: "Preparando búsqueda…"
    };
    await this.ctx.storage.put("job", job);
    return jsonResponse(publicJob(job), 201);
  }

  async status() {
    let job = await this.ctx.storage.get("job");
    if (!job) return jsonResponse({ error: "not_found" }, 404);

    if (job.state === "running") {
      job = await advance(job);
      await this.ctx.storage.put("job", job);
    }
    return jsonResponse(publicJob(job));
  }

  async cancel() {
    const job = await this.ctx.storage.get("job");
    if (!job) return jsonResponse({ error: "not_found" }, 404);
    if (job.state === "running") {
      job.state = "cancelled";
      job.updatedAt = Date.now();
      job.message = `Búsqueda detenida. Se conservaron ${job.results.length} resultado(s).`;
      await this.ctx.storage.put("job", job);
    }
    return jsonResponse(publicJob(job));
  }
}

function normalizeQuery(body) {
  const type = ["caption", "case", "receptoria"].includes(body.type) ? body.type : "caption";
  const term = String(body.term || "").trim().slice(0, 180);
  const department = String(body.department || "all");
  const organism = String(body.organism || "all");
  const state = String(body.state || "active");
  return { type, term, department, organism, state };
}

function buildTargets(query) {
  const departments = query.department === "all" ? DEPARTMENTS : [query.department];
  const perDepartment = query.organism === "all" ? 5 : 1;
  const targets = [];
  for (const d of departments) {
    for (let i = 1; i <= perDepartment; i++) {
      targets.push({
        department: d,
        organism: query.organism === "all" ? `Organismo ${String(i).padStart(2, "0")}` : query.organism
      });
    }
  }
  return targets;
}

async function advance(job) {
  const source = getSource(job.sourceMode);
  if (!source) {
    job.state = "failed";
    job.message = "La fuente dejó de estar disponible.";
    return job;
  }

  const chunk = Math.min(4, job.total - job.processed);
  for (let i = 0; i < chunk; i++) {
    const index = job.processed;
    const target = job.targets[index];
    job.processed += 1;
    job.message = `Consultando ${target.department} · ${target.organism}`;

    try {
      const found = await source.searchTarget({ job, target, index });
      if (Array.isArray(found) && found.length) job.results.push(...found);
    } catch (_) {}
  }

  job.updatedAt = Date.now();
  if (job.processed >= job.total) {
    job.state = "completed";
    job.message = job.sourceMode === "demo"
      ? `Búsqueda de demostración finalizada. ${job.total} organismos recorridos.`
      : `Búsqueda finalizada. ${job.total} organismos recorridos.`;
  }
  return job;
}

function publicJob(job) {
  const results = dedupe(job.results);
  return {
    id: job.id,
    state: job.state,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    elapsedMs: Math.max(0, job.updatedAt - job.createdAt),
    query: job.query,
    processed: job.processed,
    total: job.total,
    progress: job.total ? Math.round((job.processed / job.total) * 100) : 0,
    results,
    sourceMode: job.sourceMode,
    demoMode: job.sourceMode === "demo",
    message: job.message
  };
}

function dedupe(results) {
  const seen = new Set();
  return results.filter(r => {
    const key = `${r.caseNumber}|${r.department}|${r.organism}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shouldAddDemoResult(term, index) {
  if (!term) return false;
  const seed = [...term].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (seed + index * 7) % 41 === 0;
}

function demoResult(job, target, index) {
  const safe = job.query.term.toUpperCase().replace(/[^A-ZÁÉÍÓÚÜÑ0-9 .\/-]/g, "").slice(0, 72);
  return {
    id: `${job.id}-${index}`,
    source: "demo",
    demo: true,
    caption: `${safe} · RESULTADO DE DEMOSTRACIÓN`,
    caseNumber: `DEMO-${String(index + 1).padStart(5, "0")}/2026`,
    receptoria: `DEMO-${String((index + 17) * 31).padStart(6, "0")}`,
    department: target.department,
    organism: target.organism,
    status: "Demostración",
    lastAction: "Dato simulado para validar la interfaz. No proviene de MEV.",
    sourceUrl: null
  };
}
