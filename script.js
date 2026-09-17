const state = {
  lang: localStorage.getItem("filipinasLang") === "en" ? "en" : "es",
  selectedDay: todayDay().id,
  itineraryOnly: localStorage.getItem("itineraryOnly") === "true",
  installedPrompt: null,
  pendingWorker: null,
  reloading: false,
};
const $ = (s) => document.querySelector(s);
const imageSrc = (path) => {
  if (!path) return "";
  try {
    return new URL(String(path), document.baseURI).href;
  } catch {
    return String(path);
  }
};
const COMMON_KEYS = [
  "wide",
  "macro",
  "static",
  "slow",
  "timelapse",
  "sound",
  "transition",
];
function statusLabel(status) {
  return t(`status.${status}`);
}
function dayById(id) {
  return tripData.days.find((d) => d.id === id) || tripData.days[0];
}
function locationMeta(key) {
  return tripData.locations.find((x) => x.key === key) || tripData.locations[0];
}
function persist() {
  localStorage.setItem("filipinasLang", state.lang);
  localStorage.setItem("selectedDay", String(state.selectedDay));
  localStorage.setItem("itineraryOnly", String(state.itineraryOnly));
}
function getChecklist(dayId) {
  try {
    return JSON.parse(localStorage.getItem(`check_${dayId}`) || "{}");
  } catch {
    return {};
  }
}
function setChecklist(dayId, key, val) {
  const c = getChecklist(dayId);
  c[key] = val;
  localStorage.setItem(`check_${dayId}`, JSON.stringify(c));
}
function saveExpenses(items) {
  localStorage.setItem("expenses", JSON.stringify(items));
}
function getTripBudget() {
  const saved = Number(localStorage.getItem("tripBudget"));
  return Number.isFinite(saved) && saved > 0
    ? saved
    : Number(tripData.meta.budgetEstimate || 0);
}
function saveTripBudget(value) {
  localStorage.setItem("tripBudget", String(value));
}
function money(v) {
  return `${new Intl.NumberFormat(state.lang === "es" ? "es-ES" : "en-US").format(Number(v) || 0)} PHP`;
}
function formatDate(d) {
  return new Intl.DateTimeFormat(state.lang === "es" ? "es-ES" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(d + "T12:00:00"));
}
function isToday(d) {
  const now = new Date();
  return (
    d ===
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  );
}
function todayDay() {
  const now = new Date(),
    iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  if (iso < tripData.days[0].date) return tripData.days[0];
  if (iso > tripData.days[tripData.days.length - 1].date)
    return tripData.days[tripData.days.length - 1];
  return tripData.days.find((x) => x.date === iso) || tripData.days[0];
}
function setLanguage(lang) {
  state.lang = lang === "en" ? "en" : "es";
  persist();
  renderApp();
}
function toggleLanguage() {
  setLanguage(state.lang === "es" ? "en" : "es");
}
function renderApp() {
  applyShellTranslations();
  renderLocationNav();
  renderDayNav();
  renderDay(state.selectedDay);
  updateConnectionUI();
}
function renderLocationNav() {
  const orderedDays = [...tripData.days].sort((a, b) => a.date.localeCompare(b.date));
  const locationKeys = [...new Set(orderedDays.map((day) => day.locationKey))];
  const locations = locationKeys
    .map((key) => tripData.locations.find((location) => location.key === key))
    .filter(Boolean);
  $("#locationNav").innerHTML = locations
    .map(
      (loc) =>
        `<button class="location-link" data-loc="${loc.key}">${tr(loc.name)}</button>`,
    )
    .join("");
  document.querySelectorAll(".location-link").forEach(
    (b) =>
      (b.onclick = () => {
        const d = orderedDays.find((x) => x.locationKey === b.dataset.loc);
        if (d) selectDay(d.id);
        closeMenu();
      }),
  );
}
function renderDayNav() {
  $("#dayNavigation").innerHTML = tripData.days
    .map(
      (d) =>
        `<button class="day-button ${d.status === "pending" ? "pending" : ""}" data-day="${d.id}">${t("day.day")} ${d.id}</button>`,
    )
    .join("");
  document
    .querySelectorAll(".day-button")
    .forEach((b) => (b.onclick = () => selectDay(Number(b.dataset.day))));
}
function goToday() {
  selectDay(todayDay().id);
  $("#todayContext")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function selectDay(id) {
  state.selectedDay = id;
  persist();
  renderDay(id);
  window.scrollTo({ top: 0, behavior: "smooth" });
  document
    .querySelector(`[data-day="${id}"]`)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
}
function renderHero(day) {
  const lm = locationMeta(day.locationKey),
    rec = day.loc?.recording;
  $("#hero").innerHTML =
    `<img src="${imageSrc(day.loc?.cover || lm.cover)}" alt="${tr(day.location)}" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')"><div class="hero-content"><div class="hero-kicker">${tr(day.location)} · ${statusLabel(day.status)}</div><h1>${tr(day.title)}</h1><p>${rec ? tr(rec.theme) : tr(day.location)}</p></div>`;
}
function renderDay(id) {
  const day = dayById(id);
  renderHero(day);
  document
    .querySelectorAll(".day-button")
    .forEach((b) => b.classList.toggle("active", Number(b.dataset.day) === id));
  document
    .querySelectorAll(".location-link")
    .forEach((b) =>
      b.classList.toggle("active", b.dataset.loc === day.locationKey),
    );
  let spent = null;
  try { spent = budgetSum(budgetItems()); } catch { /* The budget view explains unreadable data. */ }
  const completed = day.activities.filter((a) => getActivityDone(day.id, a)).length,
    total = day.activities.length,
    pct = total ? Math.round((completed / total) * 100) : 0,
    tripBudget = getTripBudget();
  $("#dayContent").innerHTML =
    `<div class="day-head"><div class="day-meta"><span class="eyebrow">${t("day.day")} ${day.id} / ${tripData.meta.totalDays}</span>${isToday(day.date) ? `<span class="pill done">${t("day.todayBanner")}</span>` : ""}<span class="pill ${day.status}">${statusLabel(day.status)}</span></div><h1 class="day-title">${tr(day.title)}</h1><div class="date-line">${formatDate(day.date)} · ${tr(day.location)}</div><div class="progress-wrap"><div class="progress-line"><span style="width:${pct}%"></span></div><div class="progress-copy">${t("day.progress")}: ${completed}/${total} · ${pct}%</div></div><div class="card budget-box"><div class="budget-row"><span>${t("day.totalBudget")}</span><strong>${money(tripBudget)}</strong></div><div class="budget-row"><span>${t("day.spent")}</span><strong>${spent === null ? "—" : money(spent)}</strong></div><div class="budget-row"><span>${t("day.remaining")}</span><strong>${spent === null ? "—" : money(Math.round((tripBudget - spent) * 100) / 100)}</strong></div><div class="budget-quick"><button class="action primary" id="openBudgetEditor" type="button">✎ ${t("day.editBudget")}</button><span class="saved-budget">${t("day.savedDevice")}</span></div></div></div>${accommodationSection(day)}<div class="grid">${day.activities.map((act, i) => activityCard(day, act, i)).join("")}</div>${day.pois?.length ? `<section class="documentary poi-section"><div class="section-head"><h2>${t("day.poi")}</h2><span>${day.pois.length}</span></div><div class="grid two">${day.pois.map(poiCard).join("")}</div></section>` : ""}${day.loc ? recordingSection(day) : ""}${locationGallery(day.locationKey)}<section class="budget-section"></section>`;
  if (typeof renderTodayContext === "function") renderTodayContext();
  const fieldNotes = document.createElement("div");
  fieldNotes.className = "field-notes";
  fieldNotes.id = "fieldNotes";
  fieldNotes.innerHTML = Journal.render(day) + renderDocumentary(day);
  $("#todayContext").insertAdjacentElement("afterend", fieldNotes);
  Journal.bind(day);
  bindDocumentary(day);
  if (typeof renderFlightSection === "function") {
    const html = renderFlightSection(day);
    if (html) $("#dayContent").insertAdjacentHTML("beforeend", html);
  }
  if (typeof renderBudgetV85 === "function") renderBudgetV85();
  bindDayEvents(day);
}
function getActivityDone(dayId, act) {
  return localStorage.getItem(`done_${dayId}_${act.title.es}`) === "true";
}
function setActivityDone(dayId, act, val) {
  localStorage.setItem(`done_${dayId}_${act.title.es}`, String(val));
}
function activityCard(day, act, i) {
  const done = getActivityDone(day.id, act),
    st =
      act.status === "optional" ? t("day.optional") : statusLabel(act.status);
  const actionHtml = act.externalUrl
    ? `<div class="actions"><a class="action primary" target="_blank" rel="noopener" href="${act.externalUrl}">↗ ${tr(act.externalLabel)}</a></div>`
    : act.place
      ? `<div class="actions"><a class="action primary" target="_blank" rel="noopener" href="${act.maps}">⌖ ${t("day.maps")}</a><a class="action" target="_blank" rel="noopener" href="${act.directions}">↗ ${t("day.directions")}</a></div>`
      : "";
  return `<article class="card activity-card ${act.status === "pending" ? "pending" : ""}"><div class="activity-top"><div><div class="time">${tr(act.time)}</div><h2>${tr(act.title)}</h2></div><label class="check" title="${t("day.check")}"><input type="checkbox" data-done="${i}" ${done ? "checked" : ""}> <span>${done ? "✓" : ""}</span></label></div><p class="activity-description">${tr(act.description)}</p><div class="chips"><span class="chip">${st}</span>${act.duration ? `<span class="chip">⏱ ${tr(act.duration)}</span>` : ""}</div>${actionHtml}${act.notes?.es || act.notes?.en ? `<div class="notes"><strong>${t("day.notes")}</strong><p>${tr(act.notes)}</p></div>` : ""}${act.transport?.es || act.transport?.en ? `<div class="transport"><b>↔ ${t("day.transport")}</b><br>${tr(act.transport)}</div>` : ""}${act.recording?.es || act.recording?.en ? `<div class="notes activity-recording"><strong>🎥 ${t("day.recording")}</strong><p>${(tr(act.recording) || []).join(" · ")}</p></div>` : ""}</article>`;
}
function poiCard(p) {
  return `<article class="card poi-card">${p.image ? `<img src="${imageSrc(p.image)}" alt="${tr(p.name)}" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')">` : ""}<div class="poi-body"><div class="chips"><span class="chip">${p.optional ? t("day.optional") : "POI"}</span></div><h3>${tr(p.name)}</h3><p>${tr(p.description)}</p><a class="action primary" target="_blank" rel="noopener" href="${p.maps}">⌖ ${t("day.maps")}</a></div></article>`;
}
function accommodationSection(day) {
  const key = day.accommodationKey || day.locationKey,
    a = tripData.meta.accommodations?.[key];
  if (!a) return "";
  return `<section class="accommodation-section"><div class="section-head"><h2>🏠 ${t("day.accommodation")}</h2><span>${tr(a.subtitle)}</span></div><div class="card accommodation-card"><div><h3>${tr(a.name)}</h3><p class="muted">${tr(a.checkin)}<br>${tr(a.checkout)}</p></div><div class="actions"><a class="action primary" target="_blank" rel="noopener" href="${a.booking}">↗ ${t("day.booking")}</a><a class="action" target="_blank" rel="noopener" href="${a.map}">⌖ ${t("day.maps")}</a><a class="action" target="_blank" rel="noopener" href="${a.directions}">↗ ${t("day.directions")}</a></div></div></section>`;
}
function locationGallery(key) {
  const lm = locationMeta(key);
  return `<section class="gallery-section"><div class="section-head"><h2>${t("day.gallery")}</h2><span>${tr(lm.name)}</span></div><div class="gallery">${lm.gallery.map((x, i) => `<img src="${imageSrc(x)}" alt="${tr(lm.name)} ${i + 1}" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')">`).join("")}</div></section>`;
}
function bindDayEvents(day) {
  $("#openBudgetEditor")?.addEventListener("click", openBudgetEditor);
  document.querySelectorAll("[data-done]").forEach(
    (box) =>
      (box.onchange = (e) => {
        setActivityDone(
          day.id,
          day.activities[Number(box.dataset.done)],
          e.target.checked,
        );
        renderDay(day.id);
      }),
  );
}
function openBudgetEditor() {
  const dialog = $("#budgetDialog");
  if (!dialog) return;
  applyShellTranslations();
  $("#budgetDialogInput").value = getTripBudget();
  $("#budgetTotalStatus").textContent = "";
  renderGlobalBudget();
  if (!dialog.open) dialog.showModal();
}
function setConnectionText(online) {
  const text = online ? t("connection.online") : t("connection.offline");
  const top = $("#connectionStatus span"),
    menu = $("#menuConnection span");
  if (top) top.textContent = text;
  if (menu) menu.textContent = text;
  ["#connectionStatus", "#menuConnection"].forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    el.classList.toggle("online", online);
    el.classList.toggle("offline", !online);
  });
}
function updateConnectionUI() {
  setConnectionText(navigator.onLine);
}
function showUpdateToast() {
  if ($("#updateToast")) return;
  const el = document.createElement("div");
  el.id = "updateToast";
  el.className = "update-toast";
  el.innerHTML = `<span>${t("day.newVersion")}</span><button type="button" id="updateAppButton">${t("day.update")}</button>`;
  document.body.appendChild(el);
  $("#updateAppButton").onclick = () => {
    if (Journal.hasUnsaved()) {
      alert(t("journal.error"));
      return;
    }
    if (state.pendingWorker)
      state.pendingWorker.postMessage({ type: "SKIP_WAITING" });
    else window.location.reload();
  };
}
function watchSW(reg) {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (state.reloading) return;
    if (Journal.hasUnsaved()) {
      showUpdateToast();
      return;
    }
    state.reloading = true;
    window.location.reload();
  });
  if (reg.waiting) {
    state.pendingWorker = reg.waiting;
    showUpdateToast();
  }
  reg.addEventListener("updatefound", () => {
    const worker = reg.installing;
    if (!worker) return;
    worker.addEventListener("statechange", () => {
      if (worker.state === "installed" && navigator.serviceWorker.controller) {
        state.pendingWorker = worker;
        showUpdateToast();
      }
    });
  });
}
function bindGlobal() {
  $("#menuExportJournal").onclick = Journal.exportAll;
  $("#menuBudget").onclick = () => {
    openBudgetEditor();
    closeMenu();
  };
  $("#menuToday").onclick = () => {
    goToday();
    closeMenu();
  };
  $("#todayButton").onclick = goToday;
  $("#languageToggle").onclick = toggleLanguage;
  $("#menuButton").onclick = openMenu;
  $("#closeMenu").onclick = closeMenu;
  $("#overlay").onclick = closeMenu;
  $("#itineraryModeButton").onclick = () => {
    state.itineraryOnly = !state.itineraryOnly;
    document.body.classList.toggle("mode-only", state.itineraryOnly);
    persist();
    applyShellTranslations();
  };
  window.addEventListener("online", updateConnectionUI);
  window.addEventListener("offline", updateConnectionUI);
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    state.installedPrompt = e;
    $("#menuInstall").hidden = false;
    applyShellTranslations();
  });
  $("#menuInstall").onclick = async () => {
    if (!state.installedPrompt) return;
    state.installedPrompt.prompt();
    await state.installedPrompt.userChoice;
    state.installedPrompt = null;
    $("#menuInstall").hidden = true;
    closeMenu();
  };
  window.addEventListener("appinstalled", () => {
    $("#menuInstall").hidden = true;
    state.installedPrompt = null;
  });
  $("#budgetCloseButton").onclick = () => $("#budgetDialog").close();
  $("#budgetDialogCancel").onclick = () => $("#budgetDialog").close();
  $("#budgetDialogForm").addEventListener("submit", (e) => {
    if (e.submitter?.id !== "saveBudgetButton") return;
    e.preventDefault();
    const amount = Number($("#budgetDialogInput").value);
    if (!Number.isFinite(amount) || amount <= 0) return;
    try {
      saveTripBudget(Math.round(amount * 100) / 100);
      refreshBudgetViews();
      $("#budgetTotalStatus").textContent = t("budget.saved");
    } catch {
      $("#budgetTotalStatus").textContent = t("budget.saveError");
    }
  });
}
function openMenu() {
  $("#sidePanel").classList.add("open");
  $("#overlay").classList.add("open");
  $("#sidePanel").setAttribute("aria-hidden", "false");
}
function closeMenu() {
  $("#sidePanel").classList.remove("open");
  $("#overlay").classList.remove("open");
  $("#sidePanel").setAttribute("aria-hidden", "true");
}
async function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register("./service-worker.js");
    watchSW(reg);
    return reg;
  } catch (err) {
    console.error(err);
  }
}
function handleShortcut() {
  const shortcut = new URLSearchParams(location.search).get("shortcut");
  if (shortcut === "today") selectDay(todayDay().id);
  else if (shortcut === "budget") openBudgetEditor();
}
function init() {
  document.body.classList.toggle("mode-only", state.itineraryOnly);
  applyShellTranslations();
  renderLocationNav();
  renderDayNav();
  bindGlobal();
  renderDay(state.selectedDay);
  updateConnectionUI();
  handleShortcut();
  registerSW();
}
init();
