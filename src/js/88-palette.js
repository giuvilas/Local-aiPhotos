/* ================= the command palette =================
   Three tabs can hold eighty controls only if anything can be summoned by
   name. Without this, hiding a control behind a section is just hiding it.

   Commands are built fresh each time it opens, because what exists depends on
   the index: the people in it are commands too. */

const CMDK = { items: [], hits: [], sel: 0 };

/* Where a control lives, worked out from the page rather than from a list:
   a pane id says which tab and section to open before pressing it. */
function cmdkPaneRoute(id){
  const n = $("#" + id);
  const pane = n && n.closest('[id^="scanSec-"], [id^="settingsSec-"], section');
  if (!pane) return null;
  const m = /^(scan|settings)Sec-(.+)$/.exec(pane.id);
  if (m) return { view:m[1], section:m[2] };
  const t = /^tab-(.+)$/.exec(pane.id);
  if (!t) return null;
  if (t[1] === "library") return { view:"library" };
  return { view:t[1] };
}
/* Go to where a control is, then press it. Pressing a button in a section that
   is not open means its output renders where nobody is looking -- the failure
   this redesign kept producing. */
function cmdkPress(id){
  const r = cmdkPaneRoute(id);
  if (r) goTo(r.view, { section:r.section });
  const n = $("#" + id);
  if (!n) return;
  setTimeout(() => { if (!n.disabled) n.click(); }, 0);
}

function cmdkCommands(){
  const out = [];
  const add = (label, where, run, keywords) =>
    out.push({ label, where, run, keywords: (keywords || "") + " " + label });

  add("Grid", "Explore", () => goTo("library"), "photos library all");
  add("Timeline", "Explore", () => goTo("timeline"), "dates days by date");
  add("People", "Explore", () => goTo("people"), "faces names groups");
  add("Favourites", "Explore", () => { goTo("library"); setScope("favourites"); }, "hearts starred");
  add("All photos", "Explore", () => { goTo("library"); setScope("all"); }, "everything");
  add("Removed photos", "Explore", () => { goTo("library"); setScope("removed"); }, "hidden trash deleted");
  add("Chat", "Explore", () => { goTo("library"); setChatOpen(true); }, "ask question agent");
  add("Search filters", "Explore", () => {
    goTo("library");
    if ($("#sgMore").hidden) $("#sgMoreBtn").click();
  }, "date place exclude");
  add("Clear the search", "Explore", () => { goTo("library"); clearSearch(); }, "reset");

  add("Scan new & changed", "Scan", () => cmdkPress("btnScan"), "index run");
  add("Refresh plan", "Scan", () => cmdkPress("btnPlan"), "what would change");
  add("Find faces", "Scan", () => cmdkPress("btnFaceScan"), "recognise people");
  add("Improve faces from originals", "Scan", () => cmdkPress("btnRefine"), "accuracy refine");
  add("Rebuild thumbnails", "Scan", () => cmdkPress("btnThumbs"), "repair missing");
  add("Compact log", "Scan", () => cmdkPress("btnCompact"), "shrink records");
  add("Back up now", "Scan", () => cmdkPress("btnBackup"), "copy safety");
  add("Show backups", "Scan", () => cmdkPress("btnBackups"), "restore");
  add("Move the index", "Scan", () => cmdkPress("btnIndexMove"), "relocate nas disk");

  add("Choose photo folder", "Settings", () => cmdkPress("btnPick"), "library pick");
  add("Choose where to save the index", "Settings", () => cmdkPress("btnIndexDir"), "db location");
  add("Model roles", "Settings", () => goTo("settings", { section:"conn" }), "vision embedding chat");
  add("Scan settings", "Settings", () => goTo("settings", { section:"scanning" }), "concurrency tokens dates");
  add("Privacy & data", "Settings", () => goTo("settings", { section:"privacy" }), "faces stored backups");
  add("Delete all face data", "Settings", () => cmdkPress("btnPrivacyWipe"), "wipe erase forget");
  add("Run self-test", "Settings", () => cmdkPress("btnSelfTest"), "diagnostics check");

  /* The people in the index are commands too: their names are the words most
     likely to be typed here. */
  for (const p of (FACES.people || [])){
    if (!p.name) continue;
    add(p.name, "Person", () => {
      GAL.chips = [{ kind:"person", id:p.id, label:p.name }];
      GAL.texts = [];
      if (typeof sgRenderChips === "function") sgRenderChips();
      runSearch();
    }, "person who face");
  }
  return out;
}

/* Subsequence matching, scored so that an exact name beats a word beginning,
   which beats letters merely appearing in order. */
function cmdkScore(item, q){
  if (!q) return 1;
  const hay = item.keywords.toLowerCase(), label = item.label.toLowerCase();
  if (label === q) return 1000;
  if (label.startsWith(q)) return 800 - label.length;
  const words = hay.split(/\s+/);
  if (words.some(w => w.startsWith(q))) return 600 - label.length;
  if (hay.includes(q)) return 400 - label.length;
  let i = 0;
  for (const ch of hay){ if (ch === q[i]) i++; if (i === q.length) return 200 - label.length; }
  return 0;
}

function cmdkRender(){
  const q = $("#cmdkInput").value.trim().toLowerCase();
  CMDK.hits = CMDK.items
    .map(it => ({ it, s: cmdkScore(it, q) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 40)
    .map(x => x.it);
  /* Typed words that match no command are still a photo search: the field used
     to own Cmd+K, so arriving here with a search in mind must not dead-end. */
  if (q && !CMDK.hits.some(h => h.where === "Person"))
    CMDK.hits.push({ label: "Search photos for “" + $("#cmdkInput").value.trim() + "”",
      where: "Search", run: () => {
        GAL.chips = []; GAL.texts = [$("#cmdkInput").value.trim()];
        if (typeof sgRenderChips === "function") sgRenderChips();
        runSearch();
      } });
  if (CMDK.sel >= CMDK.hits.length) CMDK.sel = 0;
  const ul = $("#cmdkList");
  ul.textContent = "";
  if (!CMDK.hits.length){
    ul.append(Object.assign(el("li", "cmdkEmpty"), { textContent:"Nothing matches that." }));
    return;
  }
  CMDK.hits.forEach((h, i) => {
    const li = el("li");
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", String(i === CMDK.sel));
    li.append(document.createTextNode(h.label));
    li.append(Object.assign(el("span", "cmdkWhere"), { textContent:h.where }));
    li.onmouseenter = () => { CMDK.sel = i; cmdkRender(); };
    li.onclick = () => cmdkRun(i);
    ul.append(li);
  });
}
function cmdkRun(i){
  const h = CMDK.hits[i];
  cmdkClose();
  if (h) try { h.run(); } catch (e){ toast(humanError(e)); }
}
function cmdkOpen(){
  CMDK.items = cmdkCommands();
  CMDK.sel = 0;
  $("#cmdkInput").value = "";
  $("#cmdk").hidden = false;
  cmdkRender();
  $("#cmdkInput").focus();
}
function cmdkClose(){ $("#cmdk").hidden = true; }
function cmdkIsOpen(){ return $("#cmdk") && !$("#cmdk").hidden; }

$("#cmdkInput").oninput = () => { CMDK.sel = 0; cmdkRender(); };
$("#cmdk").onclick = e => { if (e.target.id === "cmdk") cmdkClose(); };
$("#cmdkBtn").onclick = cmdkOpen;
document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")){
    e.preventDefault();
    cmdkIsOpen() ? cmdkClose() : cmdkOpen();
    return;
  }
  if (!cmdkIsOpen()) return;
  if (e.key === "Escape"){ e.preventDefault(); cmdkClose(); }
  else if (e.key === "ArrowDown"){ e.preventDefault(); CMDK.sel = Math.min(CMDK.sel + 1, CMDK.hits.length - 1); cmdkRender(); }
  else if (e.key === "ArrowUp"){ e.preventDefault(); CMDK.sel = Math.max(CMDK.sel - 1, 0); cmdkRender(); }
  else if (e.key === "Enter"){ e.preventDefault(); cmdkRun(CMDK.sel); }
});
