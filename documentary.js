// Separate, date-keyed progress; no changes to legacy checklist storage.
function readP1(date) {
  const data = JSON.parse(localStorage.getItem(`filipinasP1_${date}`) || "{}");
  if (!data || typeof data !== "object" || Array.isArray(data) || Object.values(data).some(value => typeof value !== "boolean"))
    throw new Error("Invalid P1 progress");
  return data;
}
function renderShootingPlan(day) {
  const plan = SHOOTING_PLANS[day.date];
  if (!plan) return "";
  let checks = {}, valid = true;
  try { checks = readP1(day.date); } catch { valid = false; }
  const count = plan.p1.filter(shot => checks[shot.id]).length;
  return `<div class="p1-section"><h3>${t("field.p1")}</h3>
    <p class="journal-help">${t("field.p1Help")}</p>
    <div class="p1-checklist">${plan.p1.map(shot => `<label class="check"><input type="checkbox" data-p1="${shot.id}" ${checks[shot.id] ? "checked" : ""}><span>${tr(shot.text)}<small>${shot.duration}</small></span></label>`).join("")}</div>
    <p id="p1Progress" role="status" aria-live="polite">${count}/${plan.p1.length} · ${t("field.captured")}</p>
    <p id="p1Status" class="journal-help" role="status">${t(valid ? "day.savedDevice" : "field.saveError")}</p>
    <details class="field-details"><summary>${t("field.clips")}</summary><ul>${plan.clips.map(clip => `<li>${tr(clip)}</li>`).join("")}</ul></details>
  </div>`;
}

/* V8.10.0 — Read-only filming UI; reuse legacy checklist keys without migration. */
function renderDocumentary(day) {
  const guide = DOCUMENTARY.days[day.date];
  if (!guide) return "";
  const preset = DOCUMENTARY.presets[guide.preset];
  const checks = getChecklist(day.id);
  const proposal = guide.planStatus === "editorial-proposal";
  return `<section class="field-guide recording-section" aria-labelledby="fieldGuideTitle" data-plan-status="${guide.planStatus}">
    <div class="section-head"><h2 id="fieldGuideTitle">${t(isToday(day.date) ? "field.today" : "field.title")}</h2></div>
    <h3>${tr(guide.storyBeat)}</h3>
    <p class="field-plan ${proposal ? "field-proposal" : ""}">${t(`field.status.${guide.planStatus}`)}</p>
    <div class="field-preset"><strong>${t("field.preset")} ${guide.preset} · ${tr(preset.name)}</strong><p>${tr(preset.settings)}</p></div>
    <p class="field-filter"><strong>${t("field.filter")}</strong> ${tr(preset.filter)}</p>
    <p class="field-exception"><strong>${t("field.exception")}</strong> ${tr(guide.exception)}</p>
    <div class="field-safety"><h3>${t("field.safety")}</h3><ul>${guide.safety.map((item) => `<li>${tr(item)}</li>`).join("")}</ul></div>
    ${renderShootingPlan(day)}
    <details class="field-details"><summary>${t("field.details")}</summary>
      <p>${tr(preset.support)}</p><p>${t("field.continuity")}</p>
      <p>${t("field.sound")}</p><p>${t("field.limits")}</p>
      ${day.loc ? `<a class="action" href="#recordingDetails">${t("field.existing")}</a>` : ""}
    </details>
    <details class="field-details"><summary>${t("day.check")}</summary>
      <div class="checklist">${COMMON_KEYS.map((key) => `<label class="check"><input type="checkbox" data-rec="${key}" ${checks[key] ? "checked" : ""}><span>${t(`recording.${key}`)}</span></label>`).join("")}</div>
      <p id="checklistStatus" class="journal-help" role="status">${t("day.savedDevice")}</p>
    </details>
  </section>`;
}

function recordingSection(day) {
  const recording = day.loc?.recording || {};
  const points = Array.isArray(tr(recording.points))
    ? tr(recording.points)
    : [];
  const guides = tripData.meta.recordingGuidelines?.[state.lang] || [];
  return `<details id="recordingDetails" class="recording-section recording field-details card">
    <summary>${t("field.existing")}</summary><div class="recording-grid">
      <div class="recording-block full"><div class="recording-label">${t("day.theme")}</div><h3>${tr(day.loc.theme)}</h3><div class="recording-label">${t("day.plans")}</div><ul>${points.map((point) => `<li>${point}</li>`).join("")}</ul></div>
      <div class="recording-block"><div class="recording-label">${t("day.narration")}</div><p class="quote">${tr(recording.narration)}</p></div>
      <div class="recording-block"><div class="recording-label">${t("day.tech")}</div><p>${tr(recording.technical)}</p></div>
      <div class="recording-block full"><div class="recording-label">${t("day.generalGuidelines")}</div><ul>${guides.map((item) => `<li>${item}</li>`).join("")}</ul></div>
    </div></details>`;
}

function bindDocumentary(day) {
  document.querySelectorAll("[data-p1]").forEach(box => box.addEventListener("change", () => {
    try {
      const checks = readP1(day.date);
      checks[box.dataset.p1] = box.checked;
      localStorage.setItem(`filipinasP1_${day.date}`, JSON.stringify(checks));
      const shots = SHOOTING_PLANS[day.date].p1;
      document.getElementById("p1Progress").textContent = `${shots.filter(shot => checks[shot.id]).length}/${shots.length} · ${t("field.captured")}`;
      document.getElementById("p1Status").textContent = t("day.savedDevice");
    } catch {
      box.checked = !box.checked;
      document.getElementById("p1Status").textContent = t("field.saveError");
    }
  }));
  document.querySelectorAll("[data-rec]").forEach((box) =>
    box.addEventListener("change", () => {
      try {
        setChecklist(day.id, box.dataset.rec, box.checked);
        document.getElementById("checklistStatus").textContent =
          t("day.savedDevice");
      } catch {
        box.checked = !box.checked;
        document.getElementById("checklistStatus").textContent =
          t("field.saveError");
      }
      // No rerender: preserve focus, open details and the personal note.
    }),
  );
  document
    .querySelector('a[href="#recordingDetails"]')
    ?.addEventListener("click", () => {
      const details = document.getElementById("recordingDetails");
      if (details) details.open = true;
    });
}
