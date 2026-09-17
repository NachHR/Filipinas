/* V8.9.0 — Private, date-keyed notes. No network requests or legacy migration. */
const Journal = (() => {
  const KEY = "filipinasJournal";
  const drafts = new Map();

  function read() {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return { version: 1, entries: {} };
    const data = JSON.parse(raw);
    if (
      data?.version !== 1 ||
      !data.entries ||
      typeof data.entries !== "object" ||
      Array.isArray(data.entries)
    ) {
      throw new Error("Unsupported journal format");
    }
    for (const [date, entry] of Object.entries(data.entries)) {
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        typeof entry?.text !== "string" ||
        typeof entry.updatedAt !== "string" ||
        !Number.isFinite(Date.parse(entry.updatedAt))
      ) {
        throw new Error("Invalid journal entry");
      }
    }
    return data;
  }

  function save(date, text) {
    const entry = { text, updatedAt: new Date().toISOString() };
    drafts.set(date, entry);
    try {
      if (!tripData.days.some((day) => day.date === date))
        throw new Error("Unknown trip date");
      const data = read(); // Merge fresh storage; do not overwrite other dates from another tab.
      data.entries[date] = entry;
      localStorage.setItem(KEY, JSON.stringify(data));
      drafts.delete(date);
      return { entry, saved: true };
    } catch {
      return { entry, saved: false }; // Keep a recoverable in-memory draft, never claim success.
    }
  }

  function render(day) {
    return `<section class="journal-card card" aria-labelledby="journalTitle">
      <div class="section-head"><h2 id="journalTitle">${t("journal.title")}</h2><span>${t("day.day")} ${day.id} · ${formatDate(day.date)}</span></div>
      <label for="journalText">${t("journal.label")}</label>
      <textarea id="journalText" rows="3" aria-describedby="journalPrivacy journalStatus" placeholder="${t("journal.placeholder")}"></textarea>
      <p id="journalStatus" class="journal-status" role="status" aria-live="polite"></p>
      <p id="journalPrivacy" class="journal-help">${t("journal.privacy")}</p>
    </section>`;
  }

  function status(entry, saved) {
    const el = document.getElementById("journalStatus");
    if (!el) return;
    el.classList.toggle("save-error", !saved);
    el.textContent = saved
      ? entry
        ? t("journal.saved")
        : t("journal.empty")
      : t("journal.error");
    if (entry && saved) {
      const stamp = new Intl.DateTimeFormat(
        state.lang === "en" ? "en-GB" : "es-ES",
        {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        },
      ).format(new Date(entry.updatedAt));
      el.textContent += ` · ${t("journal.edited")} ${stamp}`;
    }
  }

  function bind(day) {
    const input = document.getElementById("journalText");
    if (!input) return;
    try {
      const entry = drafts.get(day.date) || read().entries[day.date];
      input.value = entry?.text || ""; // User content is never interpolated into HTML.
      status(entry, !drafts.has(day.date));
    } catch {
      status(null, false);
    }
    input.addEventListener("input", () => {
      // Synchronous persistence per input: navigation, language and PWA updates cannot
      // race a debounce timer. Only this small note is edited; the day is not rerendered.
      const result = save(day.date, input.value);
      status(result.entry, result.saved);
    });
  }

  function markdown() {
    const entries = { ...read().entries, ...Object.fromEntries(drafts) };
    const lines = [`# Filipinas · ${t("journal.title")}`, ""];
    let count = 0;
    for (const date of Object.keys(entries).sort()) {
      if (!entries[date].text.trim()) continue;
      const day = tripData.days.find(day => day.date === date);
      lines.push(`## ${day ? `${t("day.day")} ${day.id} · ` : ""}${date}${day ? ` · ${tr(day.location)}` : ""}`, "", entries[date].text, "");
      count++;
    }
    if (!count) lines.push(t("journal.noNotes"), "");
    return lines.join("\n");
  }

  function exportAll() {
    try {
      downloadMarkdown("filipinas-diario.md", markdown());
      document.getElementById("exportStatus").textContent = t("exports.started");
    } catch {
      // Never silently export only a subset when stored data cannot be read.
      document.getElementById("exportStatus").textContent = t("exports.error");
    }
  }

  window.addEventListener("beforeunload", (event) => {
    if (drafts.size) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
  return { render, bind, markdown, exportAll, hasUnsaved: () => drafts.size > 0 };
})();
