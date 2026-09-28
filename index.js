import { DurableObject } from "cloudflare:workers";

const VERSION = "0.8.0";
const HTML = "<!doctype html>\n<html lang=\"es\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\" />\n  <meta name=\"theme-color\" content=\"#f5f3ed\" />\n  <title>Folio · Consulta judicial</title>\n  <style>\n:root{--paper:#f5f3ed;--ink:#18201d;--muted:#66706b;--line:#d9d6cc;--card:#fbfaf6;--accent:#1d5d4c;--danger:#8a342f;--shadow:0 18px 55px rgba(25,31,28,.08)}\n*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;letter-spacing:-.01em}\nbutton,input,select{font:inherit}.topbar{height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 max(24px,5vw);border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(245,243,237,.94);backdrop-filter:blur(15px);z-index:10}.brand{font-family:Georgia,serif;font-size:30px;color:var(--ink);text-decoration:none}.brand span{color:var(--accent)}nav{display:flex;gap:18px;align-items:center}.link-btn{border:0;background:transparent;color:var(--ink);cursor:pointer}.pill{border:1px solid var(--ink);border-radius:999px;padding:10px 15px;color:var(--ink);text-decoration:none;font-size:14px}\nmain{width:min(1120px,90vw);margin:0 auto}.hero{padding:76px 0 44px}.eyebrow{font-size:11px;font-weight:800;letter-spacing:.16em;color:var(--muted);margin:0 0 14px}.hero h1{font-family:Georgia,serif;font-size:clamp(44px,7vw,78px);line-height:.98;letter-spacing:-.05em;margin:0;max-width:900px;font-weight:500}.hero em{font-weight:400;color:var(--accent)}.lead{font-size:18px;line-height:1.6;color:var(--muted);max-width:760px;margin:28px 0 20px}.status-strip{display:flex;align-items:center;gap:9px;font-size:13px;color:var(--muted)}.dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 5px rgba(29,93,76,.08)}.demo-badge{font-size:10px;letter-spacing:.12em;font-weight:800;padding:5px 8px;border-radius:999px;border:1px solid #c9a25d;color:#795719;background:#fff9ea;margin-left:6px}\n.import-card,.search-card{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:30px;box-shadow:var(--shadow)}.import-card{margin-bottom:18px}.import-top{display:flex;justify-content:space-between;gap:18px;align-items:flex-start}.import-top h2{font-family:Georgia,serif;font-size:28px;font-weight:500;margin:3px 0 8px}.import-top p{margin:0;color:var(--muted);line-height:1.55;max-width:720px}.internal-badge{display:inline-flex;border:1px solid #9cbcaf;color:var(--accent);background:#f3faf7;border-radius:999px;padding:7px 9px;font-size:10px;font-weight:900;letter-spacing:.1em;white-space:nowrap}.import-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}.secondary{border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:12px;padding:12px 15px;font-weight:800;cursor:pointer;text-decoration:none}.secondary.critical{color:var(--danger)}.real-stats{margin-top:15px;padding-top:14px;border-top:1px solid var(--line);font-size:12px;color:var(--muted);display:flex;gap:14px;flex-wrap:wrap}.real-stats strong{color:var(--ink)}.import-note{font-size:12px;color:var(--muted);line-height:1.5;margin:12px 0 0}.card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.card-head>div{display:flex;gap:12px;align-items:center}.card-head p{font-size:12px;font-weight:800;letter-spacing:.13em;margin:0}.num{font-family:Georgia,serif;font-size:18px;color:var(--accent)}.scope{font-size:12px;color:var(--muted)}.compact{margin-top:2px}.grid.two{display:grid;grid-template-columns:1fr 1fr;gap:18px}\n.scope-block{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}\n.scope-group{border:1px solid var(--line);border-radius:15px;padding:14px;background:#fff}\n.scope-group>span{display:block;font-size:12px;color:var(--muted);font-weight:800;margin-bottom:10px}\n.segmented{display:grid;grid-template-columns:1fr 1fr;gap:6px;background:#f1eee6;border-radius:11px;padding:4px}\n.seg{border:0;background:transparent;color:var(--muted);border-radius:8px;padding:10px 8px;font-size:12px;font-weight:800;cursor:pointer}\n.seg.active{background:#fff;color:var(--ink);box-shadow:0 1px 5px rgba(0,0,0,.08)}\n.field-disabled{opacity:.48;pointer-events:none}label{display:flex;flex-direction:column;gap:9px;font-size:13px;color:var(--muted);font-weight:700}select,input{width:100%;border:1px solid var(--line);background:#fff;border-radius:12px;padding:15px;color:var(--ink);outline:none}select:focus,input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(29,93,76,.09)}.hint{font-size:12px;color:var(--muted);margin:13px 0 0}.divider{height:1px;background:var(--line);margin:28px 0}.tabs{display:flex;gap:8px;margin-bottom:18px}.tab{border:1px solid var(--line);background:transparent;border-radius:999px;padding:10px 14px;cursor:pointer;color:var(--muted)}.tab.active{background:var(--ink);color:#fff;border-color:var(--ink)}.query-label{color:var(--ink)}.query-row{display:grid;grid-template-columns:1fr auto;gap:10px}.primary,.danger{border:0;border-radius:12px;padding:0 22px;cursor:pointer;font-weight:800}.primary{background:var(--accent);color:#fff;min-height:50px}.primary:disabled{opacity:.45;cursor:not-allowed}.danger{border:1px solid #e3b6b2;background:#fff7f6;color:var(--danger);min-height:44px}\n.progress-panel{margin-top:18px;border:1px solid var(--line);border-radius:18px;padding:22px;background:#fff}.hidden{display:none}.progress-top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.progress-top h2{font-family:Georgia,serif;font-weight:500;font-size:26px;margin:0}.bar{height:9px;border-radius:999px;background:#ebe8df;overflow:hidden;margin:22px 0 12px}.bar>div{height:100%;width:0;background:var(--accent);transition:width .35s ease}.metrics{display:flex;gap:24px;color:var(--muted);font-size:13px}.metrics span:last-child{margin-left:auto;font-weight:800;color:var(--ink)}\n.results{padding:58px 0 28px}.results-head{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid var(--line);padding-bottom:20px}.results-head h2{font-family:Georgia,serif;font-size:34px;font-weight:500;margin:0}.results-head>span{font-size:13px;color:var(--muted)}.results-list{padding-top:18px}.empty{padding:36px 0 48px;max-width:560px}.empty>span{font-family:Georgia,serif;color:var(--accent);font-size:15px}.empty h3{font-family:Georgia,serif;font-size:28px;font-weight:500;margin:10px 0}.empty p{color:var(--muted);line-height:1.6;margin:0}.result-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px;margin-bottom:12px;display:grid;grid-template-columns:1.5fr 1fr auto;gap:18px;align-items:center}.result-card h3{font-family:Georgia,serif;font-weight:500;font-size:20px;margin:0 0 8px}.meta{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--muted)}.result-card .where{font-size:13px;line-height:1.5;color:var(--muted)}.demo-tag{display:inline-flex;font-size:10px;font-weight:900;letter-spacing:.1em;border:1px solid #c9a25d;background:#fff9ea;color:#795719;padding:6px 8px;border-radius:999px}.notice{margin:20px 0 70px;padding:20px;border-left:3px solid var(--accent);background:rgba(255,255,255,.5)}.notice strong{font-size:14px}.notice p{margin:5px 0 0;color:var(--muted);line-height:1.55;font-size:13px}footer{border-top:1px solid var(--line);padding:28px max(24px,5vw) 44px;display:flex;justify-content:space-between;gap:20px;color:var(--muted);font-size:12px}footer span{font-family:Georgia,serif;font-size:25px;color:var(--ink)}footer p{max-width:680px;text-align:right}\ndialog{border:1px solid var(--line);border-radius:18px;padding:30px;width:min(560px,90vw);background:var(--card);color:var(--ink);box-shadow:0 30px 80px rgba(0,0,0,.2)}dialog::backdrop{background:rgba(24,32,29,.35);backdrop-filter:blur(4px)}dialog h2{font-family:Georgia,serif;font-size:30px;font-weight:500;margin:0 0 18px}dialog li{margin:10px 0;color:var(--muted);line-height:1.5}.close{float:right;border:0;background:transparent;font-size:28px;cursor:pointer}\n@media(max-width:760px){.topbar{height:66px}.link-btn{display:none}.hero{padding:40px 0 28px}.hero h1{font-size:44px}.lead{font-size:16px}.import-card,.search-card{padding:20px;border-radius:18px}.import-top{flex-direction:column}.scope-block,.grid.two,.query-row{grid-template-columns:1fr}.primary{min-height:52px}.progress-top{flex-direction:column}.danger{width:100%}.metrics{gap:10px;flex-wrap:wrap}.metrics span:last-child{margin-left:0}.result-card{grid-template-columns:1fr}.results-head{align-items:flex-start;gap:15px}.results-head h2{font-size:28px}footer{flex-direction:column}footer p{text-align:left}.tabs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}.tab{white-space:normal;padding:10px 7px;font-size:11px;line-height:1.15}}\n\n</style>\n</head>\n<body>\n  <header class=\"topbar\">\n    <a class=\"brand\" href=\"#\">folio<span>.</span></a>\n    <nav>\n      <button class=\"link-btn\" id=\"howBtn\">Cómo buscar</button>\n      <a class=\"pill\" href=\"https://mev.scba.gov.ar/loguin.asp\" target=\"_blank\" rel=\"noopener\">Abrir MEV ↗</a>\n    </nav>\n  </header>\n\n  <main>\n    <section class=\"hero\">\n      <p class=\"eyebrow\">PROVINCIA DE BUENOS AIRES</p>\n      <h1>Encontrá el expediente.<br><em>Sin perderte en el camino.</em></h1>\n      <p class=\"lead\">Folio organiza la consulta judicial en una sola pantalla. En esta versión de prueba interna podés trabajar con resultados reales que vos mismo importás desde una sesión abierta de MEV, sin entregar tu contraseña a Folio.</p>\n      <div class=\"status-strip\">\n        <span class=\"dot\"></span><span id=\"sourceStatus\">Esperando datos reales de MEV</span>\n        <span class=\"demo-badge\" id=\"demoBadge\">PRUEBA INTERNA</span>\n      </div>\n    </section>\n\n    <section class=\"import-card\" aria-labelledby=\"importTitle\">\n      <div class=\"import-top\">\n        <div>\n          <p class=\"eyebrow\">FUENTE REAL · PRUEBA INTERNA</p>\n          <h2 id=\"importTitle\">Traé resultados reales desde MEV.</h2>\n          <p>Entrás a MEV normalmente, hacés la búsqueda y ejecutás el importador sobre la página de resultados. Folio recibe solamente el contenido visible de esa página; no copia cookies, usuario ni contraseña.</p>\n        </div>\n        <span class=\"internal-badge\">MEV MANUAL</span>\n      </div>\n      <div class=\"import-actions\">\n        <a class=\"secondary\" href=\"https://mev.scba.gov.ar/loguin.asp\" target=\"_blank\" rel=\"noopener\">1. Abrir MEV ↗</a>\n        <button type=\"button\" class=\"secondary\" id=\"copyImporterBtn\">2. Copiar importador</button><button type=\"button\" class=\"secondary\" id=\"showImporterBtn\">Mostrar código</button>\n        <button type=\"button\" class=\"secondary critical\" id=\"clearRealBtn\">Vaciar datos importados</button>\n      </div>\n      <p class=\"import-note\" id=\"copyStatus\">En iPhone: “Copiar importador” genera la versión compacta para Safari. Pegala como dirección del marcador y ejecutala sobre la lista de resultados de MEV.</p><div id=\"importCodeBox\" class=\"hidden\" style=\"margin-top:12px\"><textarea id=\"importCode\" readonly style=\"width:100%;min-height:120px;border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;font-size:11px;line-height:1.35\"></textarea></div>\n      <div class=\"real-stats\">\n        <span><strong id=\"realCount\">0</strong> filas reales guardadas</span>\n        <span><strong id=\"importCount\">0</strong> importaciones</span>\n        <span id=\"lastImport\">Sin importaciones todavía</span>\n      </div>\n    </section>\n\n    <section class=\"search-card\" aria-labelledby=\"searchTitle\">\n      <div class=\"card-head\">\n        <div><span class=\"num\">01</span><p>DÓNDE BUSCAR</p></div>\n        <span class=\"scope\">23 departamentos</span>\n      </div>\n\n      <div class=\"scope-block\">\n        <div class=\"scope-group\">\n          <span>Jurisdicción</span>\n          <div class=\"segmented\">\n            <button type=\"button\" class=\"seg active\" id=\"allJurBtn\">Todas</button>\n            <button type=\"button\" class=\"seg\" id=\"oneJurBtn\">Una específica</button>\n          </div>\n        </div>\n        <div class=\"scope-group\">\n          <span>Juzgados / organismos</span>\n          <div class=\"segmented\">\n            <button type=\"button\" class=\"seg active\" id=\"allOrgBtn\">Todos</button>\n            <button type=\"button\" class=\"seg\" id=\"oneOrgBtn\">Uno específico</button>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"grid two\">\n        <label id=\"departmentField\" class=\"field-disabled\">Departamento judicial\n          <select id=\"department\" disabled>\n            <option value=\"all\">Elegí un departamento</option>\n            <option>Azul</option><option>Bahía Blanca</option><option>Dolores</option><option>Junín</option><option>La Matanza</option>\n            <option>La Plata</option><option>Lomas de Zamora</option><option>Mar del Plata</option><option>Mercedes</option><option>Merlo</option>\n            <option>Moreno-General Rodríguez</option><option>Morón</option><option>Necochea</option><option>Pergamino</option><option>Quilmes</option>\n            <option>San Isidro</option><option>San Martín</option><option>San Nicolás</option><option>Trenque Lauquen</option><option>Zárate-Campana</option>\n            <option>Avellaneda-Lanús</option><option>San Miguel</option><option>Tres Arroyos</option>\n          </select>\n        </label>\n\n        <label id=\"organismField\" class=\"field-disabled\">Juzgado u organismo\n          <select id=\"organism\" disabled>\n            <option value=\"all\">Todos los organismos</option>\n          </select>\n        </label>\n      </div>\n      <p class=\"hint\" id=\"scopeHint\">Se buscará en todos los departamentos y todos los organismos disponibles.</p>\n\n      <div class=\"divider\"></div>\n      <div class=\"card-head compact\"><div><span class=\"num\">02</span><p>QUÉ BUSCAR</p></div></div>\n      <div class=\"tabs\" role=\"tablist\">\n        <button class=\"tab active\" data-type=\"caption\">Carátula</button>\n        <button class=\"tab\" data-type=\"case\">N.º de expediente</button>\n        <button class=\"tab\" data-type=\"receptoria\">Receptoría</button>\n      </div>\n\n      <label class=\"query-label\" id=\"queryLabel\">Carátula o nombre de las partes\n        <div class=\"query-row\">\n          <input id=\"term\" autocomplete=\"off\" placeholder=\"Ej.: PÉREZ JUAN\" />\n          <button id=\"searchBtn\" class=\"primary\">Buscar</button>\n        </div>\n      </label>\n    </section>\n\n    <section id=\"progressPanel\" class=\"progress-panel hidden\" aria-live=\"polite\">\n      <div class=\"progress-top\">\n        <div>\n          <p class=\"eyebrow\" id=\"stateLabel\">BUSCANDO</p>\n          <h2 id=\"progressTitle\">Preparando consulta…</h2>\n        </div>\n        <button id=\"stopBtn\" class=\"danger\">Detener búsqueda</button>\n      </div>\n      <div class=\"bar\"><div id=\"barFill\"></div></div>\n      <div class=\"metrics\">\n        <span><strong id=\"processed\">0</strong> / <span id=\"total\">0</span> organismos</span>\n        <span><strong id=\"found\">0</strong> resultados</span>\n        <span id=\"percent\">0%</span>\n      </div>\n    </section>\n\n    <section class=\"results\" id=\"resultsSection\">\n      <div class=\"results-head\">\n        <div><p class=\"eyebrow\">RESULTADOS</p><h2 id=\"resultsTitle\">La lectura empieza por encontrar.</h2></div>\n        <span id=\"resultCount\">0 causas</span>\n      </div>\n      <div id=\"resultsList\" class=\"results-list\">\n        <div class=\"empty\">\n          <span>F 01</span>\n          <h3>Cada causa, en su lugar.</h3>\n          <p>Escribí la carátula o el número. Folio organiza la búsqueda y te muestra el avance sin obligarte a navegar pantalla por pantalla.</p>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"notice\">\n      <strong>Privacidad por diseño.</strong>\n      <p>Folio no pide ni almacena usuario o contraseña de MEV. Mientras se tramita una vía de integración oficial, el acceso humano a MEV se mantiene directamente en el sitio de la SCBA.</p>\n    </section>\n  </main>\n\n  <footer>\n    <span>folio.</span>\n    <p>Herramienta independiente · No es un sitio oficial de la SCBA · Los datos reales se incorporan manualmente desde una sesión abierta de MEV.</p>\n  </footer>\n\n  <dialog id=\"howDialog\">\n    <button class=\"close\" id=\"closeHow\">×</button>\n    <p class=\"eyebrow\">CÓMO FUNCIONA</p>\n    <h2>Una búsqueda visible de principio a fin.</h2>\n    <ol>\n      <li>Elegís el alcance y escribís la causa.</li>\n      <li>Folio crea una cola de organismos y muestra el progreso.</li>\n      <li>Los resultados aparecen sin esperar al final.</li>\n      <li>Podés detener la búsqueda y conservar lo encontrado.</li>\n    </ol>\n  </dialog>\n\n  <script>\nconst $ = (s) => document.querySelector(s);\nconst $$ = (s) => [...document.querySelectorAll(s)];\n\nlet searchType = \"caption\";\nlet jurisdictionMode = \"all\";\nlet organismMode = \"all\";\nlet jobId = null;\nlet pollTimer = null;\nlet lastResultsSignature = \"\";\nlet realScan = null;\nconst REAL_STORE_KEY = \"folio_mev_real_v1\";\nconst REAL_IMPORTS_KEY = \"folio_mev_imports_v1\";\nconst PENDING_IMPORT_KEY = \"folio_mev_pending_v1\";\nlet realRecords = loadJson(REAL_STORE_KEY, []);\nlet realImports = loadJson(REAL_IMPORTS_KEY, []);\n\nconst ui = {\n  department: $(\"#department\"), organism: $(\"#organism\"), term: $(\"#term\"), searchBtn: $(\"#searchBtn\"),\n  departmentField: $(\"#departmentField\"), organismField: $(\"#organismField\"), scopeHint: $(\"#scopeHint\"),\n  progressPanel: $(\"#progressPanel\"), stopBtn: $(\"#stopBtn\"), barFill: $(\"#barFill\"), processed: $(\"#processed\"),\n  total: $(\"#total\"), found: $(\"#found\"), percent: $(\"#percent\"), progressTitle: $(\"#progressTitle\"),\n  stateLabel: $(\"#stateLabel\"), resultsList: $(\"#resultsList\"), resultCount: $(\"#resultCount\"),\n  resultsTitle: $(\"#resultsTitle\"), queryLabel: $(\"#queryLabel\"), demoBadge: $(\"#demoBadge\"), sourceStatus: $(\"#sourceStatus\"),\n  realCount: $(\"#realCount\"), importCount: $(\"#importCount\"), lastImport: $(\"#lastImport\")\n};\n\n\nfunction loadJson(key, fallback) {\n  try { return JSON.parse(localStorage.getItem(key) || \"\") || fallback; }\n  catch (_) { return fallback; }\n}\n\nfunction saveRealStore() {\n  localStorage.setItem(REAL_STORE_KEY, JSON.stringify(realRecords));\n  localStorage.setItem(REAL_IMPORTS_KEY, JSON.stringify(realImports));\n  updateRealStats();\n}\n\nfunction normalizeKey(value) {\n  return String(value || \"\").normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\").toLowerCase().replace(/\\s+/g, \" \").trim();\n}\n\nfunction uniqueValues(values) {\n  return [...new Set(values.map(v => String(v || \"\").trim()).filter(Boolean))].sort((a,b) => a.localeCompare(b, \"es\"));\n}\n\n$(\"#allJurBtn\").addEventListener(\"click\", () => setJurisdictionMode(\"all\"));\n$(\"#oneJurBtn\").addEventListener(\"click\", () => setJurisdictionMode(\"one\"));\n$(\"#allOrgBtn\").addEventListener(\"click\", () => setOrganismMode(\"all\"));\n$(\"#oneOrgBtn\").addEventListener(\"click\", () => setOrganismMode(\"one\"));\nui.department.addEventListener(\"change\", refreshOrganisms);\nui.organism.addEventListener(\"change\", updateScopeHint);\n\nfunction setJurisdictionMode(mode) {\n  jurisdictionMode = mode;\n  $(\"#allJurBtn\").classList.toggle(\"active\", mode === \"all\");\n  $(\"#oneJurBtn\").classList.toggle(\"active\", mode === \"one\");\n\n  const specific = mode === \"one\";\n  ui.department.disabled = !specific;\n  ui.departmentField.classList.toggle(\"field-disabled\", !specific);\n\n  if (!specific) {\n    ui.department.value = \"all\";\n    if (organismMode === \"one\") {\n      organismMode = \"all\";\n      $(\"#allOrgBtn\").classList.add(\"active\");\n      $(\"#oneOrgBtn\").classList.remove(\"active\");\n    }\n  } else if (ui.department.value === \"all\") {\n    ui.department.selectedIndex = 1;\n  }\n\n  refreshOrganisms();\n  updateScopeHint();\n}\n\nfunction setOrganismMode(mode) {\n  if (mode === \"one\" && jurisdictionMode !== \"one\") {\n    setJurisdictionMode(\"one\");\n  }\n\n  organismMode = mode;\n  $(\"#allOrgBtn\").classList.toggle(\"active\", mode === \"all\");\n  $(\"#oneOrgBtn\").classList.toggle(\"active\", mode === \"one\");\n\n  refreshOrganisms();\n  updateScopeHint();\n}\n\nfunction refreshOrganisms() {\n  if (organismMode !== \"one\") {\n    ui.organism.innerHTML = '<option value=\"all\">Todos los organismos</option>';\n    ui.organism.value = \"all\";\n    ui.organism.disabled = true;\n    ui.organismField.classList.add(\"field-disabled\");\n    updateScopeHint();\n    return;\n  }\n\n  const dep = jurisdictionMode === \"one\" ? ui.department.value : \"all\";\n  const names = uniqueValues(realRecords\n    .filter(r => dep === \"all\" || normalizeKey(r.department) === normalizeKey(dep))\n    .map(r => r.organism));\n\n  if (!names.length) {\n    ui.organism.innerHTML = '<option value=\"all\">No hay organismos importados</option>';\n    ui.organism.disabled = true;\n    ui.organismField.classList.add(\"field-disabled\");\n  } else {\n    ui.organism.innerHTML = names.map(name =>\n      '<option value=\"' + escapeAttr(name) + '\">' + escapeHtml(name) + '</option>'\n    ).join(\"\");\n    ui.organism.disabled = false;\n    ui.organismField.classList.remove(\"field-disabled\");\n  }\n  updateScopeHint();\n}\n\nfunction updateScopeHint() {\n  if (jurisdictionMode === \"all\") {\n    ui.scopeHint.textContent = \"Se buscará en todos los departamentos y todos los organismos disponibles.\";\n    return;\n  }\n\n  const jur = ui.department.value === \"all\" ? \"el departamento seleccionado\" : ui.department.value;\n\n  if (organismMode === \"all\") {\n    ui.scopeHint.textContent = \"Se buscará en todos los juzgados y organismos de \" + jur + \".\";\n  } else {\n    ui.scopeHint.textContent = \"Se buscará sólo en \" + ui.organism.value + \" de \" + jur + \".\";\n  }\n}\n\nfunction escapeAttr(value) {\n  return escapeHtml(value);\n}\n\n\n\n$(\"#copyImporterBtn\").addEventListener(\"click\", async () => {\n  const bookmarklet = buildImporterBookmarklet();\n  const status = $(\"#copyStatus\");\n\n  try {\n    if (navigator.clipboard && navigator.clipboard.writeText) {\n      await navigator.clipboard.writeText(bookmarklet);\n      $(\"#copyImporterBtn\").textContent = \"Copiado ✓\";\n      status.textContent = \"Importador copiado. Ahora pegalo como dirección de un marcador de Safari.\";\n      setTimeout(() => $(\"#copyImporterBtn\").textContent = \"2. Copiar importador\", 1800);\n      return;\n    }\n    throw new Error(\"clipboard_unavailable\");\n  } catch (_) {\n    const box = $(\"#importCodeBox\");\n    const field = $(\"#importCode\");\n    box.classList.remove(\"hidden\");\n    field.value = bookmarklet;\n    field.focus();\n    field.select();\n    status.textContent = \"Safari no permitió copiar automáticamente. El código quedó seleccionado abajo: mantené presionado y elegí Copiar.\";\n  }\n});\n\n$(\"#showImporterBtn\").addEventListener(\"click\", () => {\n  const box = $(\"#importCodeBox\");\n  const field = $(\"#importCode\");\n  field.value = buildImporterBookmarklet();\n  box.classList.remove(\"hidden\");\n  field.focus();\n  field.select();\n  $(\"#copyStatus\").textContent = \"Código del importador visible. Mantené presionado sobre el texto y elegí Copiar.\";\n});\n\n$(\"#clearRealBtn\").addEventListener(\"click\", () => {\n  if (!confirm(\"¿Vaciar todos los datos reales importados de este navegador?\")) return;\n  realRecords = [];\n  realImports = [];\n  localStorage.removeItem(REAL_STORE_KEY);\n  localStorage.removeItem(REAL_IMPORTS_KEY);\n  updateRealStats();\n  refreshOrganisms();\n  resetResults();\n});\n\nfunction buildImporterBookmarklet() {\n  const endpoint = location.origin + \"/import\";\n\n  return 'javascript:(()=>{try{' +\n    'let q=s=>[...document.querySelectorAll(s)],c=s=>String(s||\"\").replace(/\\\\s+/g,\" \").trim(),' +\n    'r=q(\"tr\").map((x,i)=>({i,cells:[...x.querySelectorAll(\"th,td\")].map(e=>c(e.innerText)).filter(Boolean),text:c(x.innerText)})).filter(x=>x.text.length>20),' +\n    's=q(\"select\").map(x=>({name:x.name||x.id||\"\",text:x.options&&x.selectedIndex>=0?c(x.options[x.selectedIndex].text):\"\",value:x.value||\"\"})),' +\n    'b=c(document.body.innerText),' +\n    'D=[\"Azul\",\"Bahía Blanca\",\"Dolores\",\"Junín\",\"La Matanza\",\"La Plata\",\"Lomas de Zamora\",\"Mar del Plata\",\"Mercedes\",\"Merlo\",\"Moreno-General Rodríguez\",\"Morón\",\"Necochea\",\"Pergamino\",\"Quilmes\",\"San Isidro\",\"San Martín\",\"San Nicolás\",\"Trenque Lauquen\",\"Zárate-Campana\",\"Avellaneda-Lanús\",\"San Miguel\",\"Tres Arroyos\"],' +\n    'd=D.find(x=>b.includes(x))||\"\",o=s.map(x=>x.text).find(x=>/(Juzgado|Tribunal|Cámara|Camara|Organismo)/i.test(x))||\"\",' +\n    'h=b.match(/(?:Juzgado|Tribunal|Cámara|Camara)[A-Za-zÁÉÍÓÚÑÜáéíóúñüº° .-]{2,80}\\\\d{1,3}\\\\b/i);if(!o&&h)o=h[0].trim();' +\n    'm=b.match(/Total\\\\s+Expedientes\\\\s*:\\\\s*(\\\\d+)/i),' +\n    'p={ts:Date.now(),url:location.href,title:document.title,department:d,organism:o,total:m?+m[1]:null,limited:/exceden\\\\s+el\\\\s+l[ií]mite\\\\s+permitido\\\\s*:\\\\s*1000/i.test(b),rows:r,selects:s},' +\n    'f=document.createElement(\"form\"),i=document.createElement(\"input\");' +\n    'f.method=\"POST\";f.action=' + JSON.stringify(endpoint) + ';f.target=\"_blank\";' +\n    'i.type=\"hidden\";i.name=\"payload\";i.value=btoa(unescape(encodeURIComponent(JSON.stringify(p))));' +\n    'f.appendChild(i);document.body.appendChild(f);f.submit();f.remove()' +\n    '}catch(e){alert(\"Folio: \"+e.message)}})()';\n}\n\nfunction decodeBase64Utf8(value) {\n  return decodeURIComponent(escape(atob(value)));\n}\n\nfunction consumePendingImport() {\n  const encoded = localStorage.getItem(PENDING_IMPORT_KEY);\n  if (!encoded) return;\n  localStorage.removeItem(PENDING_IMPORT_KEY);\n\n  try {\n    const payload = JSON.parse(decodeBase64Utf8(encoded));\n    const normalized = normalizeImportedPayload(payload);\n    if (!normalized.records.length) {\n      alert(\"Folio recibió la página, pero todavía no pudo identificar filas de expedientes.\");\n      return;\n    }\n\n    const before = realRecords.length;\n    const mergeKey = (r) => normalizeKey([\n      r.department || \"\",\n      r.caseNumber || r.receptoria || \"\",\n      r.caption || \"\"\n    ].join(\"|\"));\n    const index = new Map(realRecords.map(r => [mergeKey(r), r]));\n    normalized.records.forEach(r => index.set(mergeKey(r), r));\n    realRecords = [...index.values()];\n    realImports.push(normalized.meta);\n    if (realImports.length > 100) realImports = realImports.slice(-100);\n    saveRealStore();\n    refreshOrganisms();\n\n    const added = Math.max(0, realRecords.length - before);\n    const cap = normalized.meta.limited ? \" MEV informó que la búsqueda superó el límite de 1000.\" : \"\";\n    alert(\"Importación real recibida: \" + normalized.records.length + \" filas detectadas, \" + added + \" nuevas.\" + cap);\n  } catch (err) {\n    alert(\"Folio no pudo leer la importación: \" + err.message);\n  }\n}\n\nfunction normalizeImportedPayload(payload) {\n  const rows = Array.isArray(payload.rows) ? payload.rows : [];\n  const department = String(payload.department || \"\").trim();\n  const organism = String(payload.organism || \"\").trim();\n\n  const skip = /(Nueva Búsqueda|Organizar Mis Sets|Cambiar Jurisdicción|Desconectarse|Total Expedientes|Expresión de búsqueda|Búsqueda por Carátula|Búsqueda por Set|Estado del Expediente)/i;\n  const statuses = [\"EN LETRA\",\"ARCHIVADA\",\"PARALIZADA\",\"A DESPACHO\",\"FUERA DEL ORGANISMO\"];\n\n  const records = rows.map((row, idx) => {\n    const cells = Array.isArray(row.cells)\n      ? row.cells.map(x => String(x || \"\").replace(/\\s+/g, \" \").trim()).filter(Boolean)\n      : [];\n    const text = String(row.text || cells.join(\" \")).replace(/\\s+/g, \" \").trim();\n\n    if (text.length < 28 || skip.test(text)) return null;\n\n    const upper = text.toUpperCase();\n    const status = statuses.find(s => upper.includes(s)) || \"\";\n    const dates = [...text.matchAll(/\\b\\d{2}\\/\\d{2}\\/\\d{4}\\b/g)].map(m => m[0]);\n    const formalIds = [...text.matchAll(/\\b[A-Z]{1,4}\\s*-\\s*\\d{1,7}\\s*-\\s*\\d{1,4}\\b/g)].map(m => m[0]);\n    const receptorIds = [...text.matchAll(/\\b[A-Z]{1,4}\\s+\\d{1,7}\\/\\d{4}\\b/g)].map(m => m[0]);\n\n    let caption = cells.find(c =>\n      c.length > 18 &&\n      (/\\bC\\//i.test(c) || /\\bS\\//i.test(c)) &&\n      !statuses.includes(c.toUpperCase())\n    );\n\n    if (!caption) {\n      caption = cells.find(c =>\n        c.length > 18 &&\n        !statuses.includes(c.toUpperCase()) &&\n        !/^\\d{2}\\/\\d{2}\\/\\d{4}$/.test(c)\n      ) || text;\n    }\n\n    if (status && caption.toUpperCase().includes(status)) {\n      caption = caption.slice(0, caption.toUpperCase().indexOf(status)).trim() || caption;\n    }\n\n    caption = caption.replace(/^\\s*[□☐○]\\s*/, \"\").trim();\n\n    const numericCells = cells.filter(c =>\n      /^\\d{1,8}$/.test(c) || /^\\d{1,8}\\s*-\\s*\\d{1,8}$/.test(c)\n    );\n\n    const caseNumber = formalIds[0] || \"\";\n    const receptoria = receptorIds[0] || \"\";\n    const lastDate = dates.length ? dates[dates.length - 1] : \"\";\n    const firstDate = dates.length ? dates[0] : \"\";\n\n    let lastAction = \"\";\n    if (lastDate && text.indexOf(lastDate) >= 0) {\n      lastAction = text.slice(text.indexOf(lastDate) + lastDate.length).trim();\n    }\n\n    if (!lastAction) {\n      lastAction = \"Dato importado desde la página visible de MEV.\";\n    }\n\n    const metaParts = [];\n    if (status) metaParts.push(status);\n    if (numericCells.length) metaParts.push(numericCells.slice(0, 3).join(\" · \"));\n    if (firstDate) metaParts.push(firstDate);\n    if (lastDate && lastDate !== firstDate) metaParts.push(lastDate);\n\n    const fingerprint = normalizeKey([\n      department,\n      caseNumber || receptoria || \"\",\n      caption\n    ].join(\"|\"));\n\n    return {\n      id: \"mev-\" + Math.abs(hashString(fingerprint || text + idx)),\n      fingerprint,\n      source: \"mev-import\",\n      demo: false,\n      caption: caption.slice(0, 240),\n      caseNumber,\n      receptoria,\n      department,\n      organism,\n      status: status || \"MEV\",\n      lastAction,\n      lastDate,\n      mevMeta: metaParts.join(\" · \"),\n      raw: text,\n      rawCells: cells,\n      importedAt: Number(payload.ts || Date.now())\n    };\n  }).filter(Boolean);\n\n  return {\n    records,\n    meta: {\n      importedAt: Number(payload.ts || Date.now()),\n      department,\n      organism,\n      sourceUrl: String(payload.url || \"\"),\n      pageTitle: String(payload.title || \"\"),\n      reportedTotal: payload.total == null ? null : Number(payload.total),\n      limited: Boolean(payload.limited),\n      rowsReceived: rows.length,\n      rowsDetected: records.length\n    }\n  };\n}\n\nfunction hashString(value) {\n  let h = 0;\n  for (let i = 0; i < value.length; i++) h = ((h << 5) - h + value.charCodeAt(i)) | 0;\n  return h;\n}\n\nfunction updateRealStats() {\n  ui.realCount.textContent = String(realRecords.length);\n  ui.importCount.textContent = String(realImports.length);\n  if (realImports.length) {\n    const last = realImports[realImports.length - 1];\n    const where = [last.department, last.organism].filter(Boolean).join(\" · \");\n    const coverage = last.reportedTotal\n      ? \" · \" + last.rowsDetected + \" importados de \" + last.reportedTotal + \" informados por MEV\"\n      : \" · \" + last.rowsDetected + \" filas importadas\";\n    ui.lastImport.textContent = \"Última: \" + new Date(last.importedAt).toLocaleString(\"es-AR\") + (where ? \" · \" + where : \"\") + coverage;\n    ui.sourceStatus.textContent = \"Datos reales de MEV cargados en este navegador\";\n    ui.demoBadge.textContent = \"MEV REAL\";\n  } else {\n    ui.lastImport.textContent = \"Sin importaciones todavía\";\n    ui.sourceStatus.textContent = \"Esperando datos reales de MEV\";\n    ui.demoBadge.textContent = \"PRUEBA INTERNA\";\n  }\n}\n\n$$('.tab').forEach(btn => btn.addEventListener('click', () => {\n  $$('.tab').forEach(x => x.classList.remove('active'));\n  btn.classList.add('active');\n  searchType = btn.dataset.type;\n  const labels = {\n    caption: ['Carátula o nombre de las partes', 'Ej.: PÉREZ JUAN'],\n    case: ['Número de expediente', 'Ej.: SI-6072-2024'],\n    receptoria: ['Número de receptoría', 'Ej.: ZC 2260/2026']\n  };\n  ui.queryLabel.childNodes[0].textContent = labels[searchType][0] + ' ';\n  ui.term.placeholder = labels[searchType][1];\n}));\n\nui.searchBtn.addEventListener('click', startSearch);\nui.term.addEventListener('keydown', e => { if (e.key === 'Enter') startSearch(); });\nui.stopBtn.addEventListener('click', stopSearch);\n\n$(\"#howBtn\").addEventListener('click', () => $(\"#howDialog\").showModal());\n$(\"#closeHow\").addEventListener('click', () => $(\"#howDialog\").close());\n\nasync function startSearch() {\n  const term = ui.term.value.trim();\n  if (!term) { ui.term.focus(); return; }\n  if (!realRecords.length) {\n    showError(\"Primero importá al menos una página real de resultados desde MEV.\");\n    return;\n  }\n\n  resetResults();\n  ui.searchBtn.disabled = true;\n  ui.progressPanel.classList.remove(\"hidden\");\n  ui.stopBtn.disabled = false;\n  ui.stateLabel.textContent = \"BUSCANDO\";\n  ui.progressTitle.textContent = \"Buscando en los datos reales importados de MEV…\";\n\n  const dep = jurisdictionMode === \"all\" ? null : ui.department.value;\n  const org = organismMode === \"all\" ? null : ui.organism.value;\n\n  const candidates = realRecords.filter(r => {\n    if (dep && normalizeKey(r.department) !== normalizeKey(dep)) return false;\n    if (org && normalizeKey(r.organism) !== normalizeKey(org)) return false;\n    return true;\n  });\n\n  realScan = {\n    term: normalizeKey(term),\n    type: searchType,\n    items: candidates,\n    index: 0,\n    results: [],\n    cancelled: false\n  };\n\n  ui.total.textContent = String(candidates.length);\n  ui.processed.textContent = \"0\";\n  ui.found.textContent = \"0\";\n  ui.percent.textContent = \"0%\";\n  ui.barFill.style.width = \"0%\";\n\n  scanRealChunk();\n}\n\nfunction scanRealChunk() {\n  if (!realScan || realScan.cancelled) return;\n  const chunkSize = 40;\n  const end = Math.min(realScan.index + chunkSize, realScan.items.length);\n\n  for (; realScan.index < end; realScan.index++) {\n    const r = realScan.items[realScan.index];\n    let haystack = \"\";\n    if (realScan.type === \"case\") haystack = r.caseNumber + \" \" + r.raw;\n    else if (realScan.type === \"receptoria\") haystack = r.receptoria + \" \" + r.raw;\n    else haystack = r.caption + \" \" + r.raw;\n\n    if (normalizeKey(haystack).includes(realScan.term)) realScan.results.push(r);\n  }\n\n  const processed = realScan.index;\n  const total = realScan.items.length;\n  const progress = total ? Math.round((processed / total) * 100) : 100;\n\n  ui.processed.textContent = String(processed);\n  ui.total.textContent = String(total);\n  ui.found.textContent = String(realScan.results.length);\n  ui.percent.textContent = progress + \"%\";\n  ui.barFill.style.width = progress + \"%\";\n  ui.progressTitle.textContent = total ? \"Revisando expedientes reales importados…\" : \"No hay datos importados para ese alcance.\";\n  renderResults(realScan.results);\n\n  if (processed < total) {\n    setTimeout(scanRealChunk, 35);\n  } else {\n    ui.stateLabel.textContent = \"FINALIZADA\";\n    ui.progressTitle.textContent = \"Búsqueda finalizada sobre datos reales importados de MEV.\";\n    ui.searchBtn.disabled = false;\n    ui.stopBtn.disabled = true;\n    ui.resultsTitle.textContent = \"Búsqueda finalizada.\";\n    realScan = null;\n  }\n}\n\nasync function poll() {\n  if (!jobId) return;\n  try {\n    const r = await fetch(`/api/jobs/${jobId}`);\n    const data = await r.json();\n    if (!r.ok) throw new Error('No se pudo actualizar el estado.');\n    renderJob(data);\n    if (data.state === 'running') schedulePoll(450);\n    else finish(data);\n  } catch (err) {\n    showError(err.message);\n    ui.searchBtn.disabled = false;\n  }\n}\n\nfunction schedulePoll(ms) {\n  clearTimeout(pollTimer);\n  pollTimer = setTimeout(poll, ms);\n}\n\nasync function stopSearch() {\n  if (realScan) {\n    realScan.cancelled = true;\n    ui.stopBtn.disabled = true;\n    ui.searchBtn.disabled = false;\n    ui.stateLabel.textContent = \"DETENIDA\";\n    ui.progressTitle.textContent = \"Búsqueda detenida. Se conserva lo encontrado.\";\n    ui.resultsTitle.textContent = \"Búsqueda detenida: conservamos lo encontrado.\";\n    realScan = null;\n    return;\n  }\n\n  if (!jobId) return;\n  ui.stopBtn.disabled = true;\n  clearTimeout(pollTimer);\n  const r = await fetch(\"/api/jobs/\" + jobId + \"/cancel\", { method: \"POST\" });\n  const data = await r.json();\n  renderJob(data);\n  finish(data);\n}\n\nfunction renderJob(job) {\n  ui.processed.textContent = job.processed;\n  ui.total.textContent = job.total;\n  ui.found.textContent = job.results.length;\n  ui.percent.textContent = `${job.progress}%`;\n  ui.barFill.style.width = `${job.progress}%`;\n  ui.progressTitle.textContent = job.message;\n  ui.stateLabel.textContent = job.state === 'running' ? 'BUSCANDO' : job.state === 'cancelled' ? 'DETENIDA' : 'FINALIZADA';\n  renderResults(job.results);\n}\n\nfunction renderResults(results) {\n  const signature = results.map(r => r.id).join('|');\n  if (signature === lastResultsSignature) return;\n  lastResultsSignature = signature;\n  ui.resultCount.textContent = `${results.length} ${results.length === 1 ? 'causa' : 'causas'}`;\n  if (!results.length) return;\n  ui.resultsTitle.textContent = 'Causas encontradas durante la búsqueda.';\n  ui.resultsList.innerHTML = results.map(r => `\n    <article class=\"result-card\">\n      <div>\n        <h3>${escapeHtml(r.caption)}</h3>\n        <div class=\"meta\">\n          ${r.caseNumber ? '<span>' + escapeHtml(r.caseNumber) + '</span>' : ''}\n          ${r.receptoria ? '<span>' + escapeHtml(r.receptoria) + '</span>' : ''}\n          <span>${escapeHtml(r.status)}</span>\n          ${r.mevMeta ? '<span>' + escapeHtml(r.mevMeta) + '</span>' : ''}\n        </div>\n      </div>\n      <div class=\"where\">\n        <strong>${escapeHtml(r.department || 'Jurisdicción no detectada')}</strong>\n        ${r.organism ? '<br>' + escapeHtml(r.organism) : ''}\n        <br>${escapeHtml(r.lastAction)}\n      </div>\n      ${r.demo ? '<span class=\"demo-tag\">DEMO</span>' : '<span class=\"demo-tag\">MEV REAL</span>'}\n    </article>`).join('');\n}\n\nfunction finish(job) {\n  clearTimeout(pollTimer);\n  ui.searchBtn.disabled = false;\n  ui.stopBtn.disabled = true;\n  ui.resultsTitle.textContent = job.state === 'cancelled' ? 'Búsqueda detenida: conservamos lo encontrado.' : 'Búsqueda finalizada.';\n}\n\nfunction resetResults() {\n  lastResultsSignature = '';\n  ui.resultsList.innerHTML = `<div class=\"empty\"><span>F 01</span><h3>Buscando…</h3><p>Los resultados irán apareciendo sin esperar al final.</p></div>`;\n  ui.resultCount.textContent = '0 causas';\n  ui.found.textContent = '0';\n  ui.barFill.style.width = '0%';\n}\n\nfunction showError(message) {\n  ui.progressPanel.classList.remove('hidden');\n  ui.stateLabel.textContent = 'ERROR';\n  ui.progressTitle.textContent = message;\n  ui.stopBtn.disabled = true;\n}\n\nasync function loadCapabilities() {\n  updateRealStats();\n}\n\nfunction escapeHtml(value) {\n  return String(value).replace(/[&<>'\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',\"'\":'&#39;','\"':'&quot;'}[c]));\n}\n\nconsumePendingImport();\nsetJurisdictionMode(\"all\");\nsetOrganismMode(\"all\");\nloadCapabilities();\n\n</script>\n</body>\n</html>";

const DEPARTMENTS = [
  "Azul", "Bahía Blanca", "Dolores", "Junín", "La Matanza", "La Plata",
  "Lomas de Zamora", "Mar del Plata", "Mercedes", "Merlo", "Moreno-General Rodríguez",
  "Morón", "Necochea", "Pergamino", "Quilmes", "San Isidro", "San Martín",
  "San Nicolás", "Trenque Lauquen", "Zárate-Campana", "Avellaneda-Lanús",
  "San Miguel", "Tres Arroyos"
];

function sourceCapabilities() {
  return {
    mode: "mev-import",
    available: true,
    authorized: true,
    label: "MEV · importación manual",
    transport: "manual-browser-import",
    credentialsStored: false
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

    if (url.pathname === "/import" && request.method === "POST") {
      const form = await request.formData().catch(() => null);
      const payload = String(form?.get("payload") || "");
      if (!/^[A-Za-z0-9+/=]+$/.test(payload) || payload.length > 1800000) {
        return new Response("Importación inválida o demasiado grande.", {
          status: 400,
          headers: { "content-type": "text/plain; charset=utf-8" }
        });
      }

      const safePayload = JSON.stringify(payload);
      const importPage = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Importando a Folio</title></head><body><p>Importando resultados reales a Folio…</p><script>try{localStorage.setItem("folio_mev_pending_v1",${safePayload});location.replace("/?import=1")}catch(e){document.body.innerHTML="<p>No se pudo guardar la importación.</p>"}</script></body></html>`;
      return new Response(importPage, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "x-content-type-options": "nosniff"
        }
      });
    }

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

    const sourceMode = "mev-import";

    if (url.pathname === "/api/health") {
      return jsonResponse({
        ok: true,
        service: "folio",
        version: VERSION,
        source: sourceCapabilities()
      }, 200, cors);
    }

    if (url.pathname === "/api/capabilities") {
      const source = sourceCapabilities();
      return jsonResponse({
        progressiveSearch: true,
        cancelSearch: true,
        deduplication: true,
        sourceMode,
        source,
        mevAutomation: false,
        expectedWorkersDevUrl: "https://folio.desarrollarg.workers.dev",
        reason: "La versión interna admite importación manual de la página visible de resultados de MEV. No automatiza el inicio de sesión ni almacena credenciales."
      }, 200, cors);
    }

    if (url.pathname === "/api/source-policy") {
      return jsonResponse({
        current: sourceMode,
        allowedModes: ["mev-import"],
        mevCredentialsAccepted: false,
        externalAutomationEnabled: false,
        note: "No enviar credenciales MEV a Folio. La prueba real utiliza importación manual de resultados visibles."
      }, 200, cors);
    }

    if (url.pathname === "/api/jobs" && request.method === "POST") {
      return jsonResponse({
        error: "legacy_endpoint_disabled",
        message: "La versión interna busca exclusivamente sobre datos reales importados manualmente desde MEV."
      }, 410, cors);
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
