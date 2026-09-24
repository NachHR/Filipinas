const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const scripts = [...html.matchAll(/<script src="([^"?]+)/g)].map(
  (match) => match[1],
);

function app(seed = {}, now = "2026-10-05T12:00:00Z") {
  const dom = new JSDOM(html, {
    url: "https://example.test/Filipinas/",
    runScripts: "outside-only",
  });
  const win = dom.window;
  const RealDate = win.Date;
  win.Date = class extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [now]));
    }
    static now() {
      return new RealDate(now).getTime();
    }
  };
  win.scrollTo = () => {};
  win.HTMLElement.prototype.scrollIntoView = () => {};
  for (const [key, value] of Object.entries(seed))
    win.localStorage.setItem(key, value);
  for (const file of scripts)
    vm.runInContext(read(file), dom.getInternalVMContext(), { filename: file });
  return {
    dom,
    win,
    doc: win.document,
    run: (code) => vm.runInContext(code, dom.getInternalVMContext()),
  };
}
const snapshot = (win) =>
  Object.fromEntries(
    Object.keys(win.localStorage).map((key) => [
      key,
      win.localStorage.getItem(key),
    ]),
  );
function input(a, text) {
  const field = a.doc.getElementById("journalText");
  field.value = text;
  field.dispatchEvent(new a.win.Event("input", { bubbles: true }));
}

test("29 dates: journal, preset, safety and exactly one legacy checklist in ES and EN", () => {
  const a = app();
  assert.equal(a.run("tripData.days.length"), 29);
  for (const language of ["es", "en"]) {
    a.run(`setLanguage('${language}')`);
    for (let day = 1; day <= 29; day++) {
      a.run(`selectDay(${day})`);
      assert.equal(a.doc.querySelectorAll("#journalText").length, 1);
      assert.equal(a.doc.querySelectorAll("[data-rec]").length, 7);
      assert.ok(
        a.doc.querySelector(".field-preset").textContent.includes("4K"),
      );
      assert.ok(a.doc.querySelectorAll(".field-safety li").length >= 1);
      assert.ok(
        !a.doc.querySelector(".field-notes").textContent.includes("undefined"),
      );
      assert.ok(
        !a.doc
          .querySelector(".field-notes")
          .textContent.includes("field.status."),
      );
      const ids = [...a.doc.querySelectorAll("[id]")].map((el) => el.id);
      assert.equal(
        new Set(ids).size,
        ids.length,
        `duplicate IDs on day ${day}`,
      );
      if (day >= 18 && day <= 24) {
        assert.equal(
          a.doc.querySelector(".field-guide").dataset.planStatus,
          "editorial-proposal",
        );
        assert.equal(a.run(`dayById(${day}).status`), "pending");
      }
    }
  }
  a.dom.window.close();
});

test("note survives immediate navigation, ES/EN, activity render, reload and deletion", () => {
  const a = app();
  a.run("selectDay(10)");
  const text = 'Mi día 🌴\n<script>alert(1)</script><img onerror="alert(1)">';
  input(a, text);
  assert.match(a.doc.getElementById("journalStatus").textContent, /Guardado/);
  a.doc.getElementById("languageToggle").click();
  assert.equal(a.doc.getElementById("journalText").value, text);
  assert.equal(a.doc.querySelector("#journalText script"), null);
  a.doc.querySelector("[data-done]").click();
  assert.equal(a.doc.getElementById("journalText").value, text);
  a.run("selectDay(11)");
  input(a, "Otra fecha");
  const b = app(snapshot(a.win));
  b.run("selectDay(10)");
  assert.equal(b.doc.getElementById("journalText").value, text);
  input(b, "");
  const entries = JSON.parse(
    b.win.localStorage.getItem("filipinasJournal"),
  ).entries;
  assert.equal(entries["2026-10-05"].text, "");
  assert.equal(entries["2026-10-06"].text, "Otra fecha");
  assert.ok(entries["2026-10-05"].updatedAt);
  a.dom.window.close();
  b.dom.window.close();
});

test("date-keyed notes are independent of numeric day ID", () => {
  const a = app();
  a.run("selectDay(10)");
  input(a, "Stable date");
  a.run("tripData.days.find(day=>day.id===10).id=110;selectDay(110)");
  assert.equal(a.doc.getElementById("journalText").value, "Stable date");
  a.dom.window.close();
});

test("V8.7.1 state is preserved and migration marker is unchanged", () => {
  const seed = {
    filipinasJourneyModel: "8.7",
    selectedDay: "10",
    tripBudget: "99000",
    itineraryOnly: "true",
    check_10: '{"wide":true,"macro":true}',
    expenses:
      '[{"id":"old","detail":"Ferry","amount":123,"dayId":10,"date":"2026-10-05","category":"transport"}]',
  };
  const a = app(seed);
  for (const [key, value] of Object.entries(seed))
    assert.equal(a.win.localStorage.getItem(key), value, key);
  assert.equal(a.doc.querySelector('[data-rec="macro"]').checked, true);
  a.doc.querySelector('[data-rec="sound"]').click();
  assert.deepEqual(JSON.parse(a.win.localStorage.getItem("check_10")), {
    wide: true,
    macro: true,
    sound: true,
  });
  assert.equal(
    a.doc.querySelector(".budget-section").querySelectorAll("form").length,
    1,
  );
  a.dom.window.close();
});

test("write failures retain draft across renders and recover on retry", () => {
  const a = app();
  a.run("selectDay(10)");
  const setItem = a.win.Storage.prototype.setItem;
  a.win.Storage.prototype.setItem = function (key, value) {
    if (key === "filipinasJournal") throw new Error("quota exceeded");
    return setItem.call(this, key, value);
  };
  input(a, "Never claim saved");
  assert.equal(a.win.localStorage.getItem("filipinasJournal"), null);
  assert.ok(
    a.doc.getElementById("journalStatus").classList.contains("save-error"),
  );
  a.run('setLanguage("en");selectDay(11);selectDay(10)');
  assert.equal(a.doc.getElementById("journalText").value, "Never claim saved");
  assert.equal(a.run("Journal.hasUnsaved()"), true);
  const close = new a.win.Event("beforeunload", { cancelable: true });
  a.win.dispatchEvent(close);
  assert.equal(close.defaultPrevented, true);
  a.win.Storage.prototype.setItem = setItem;
  input(a, "Recovered");
  assert.equal(a.run("Journal.hasUnsaved()"), false);
  a.dom.window.close();
});

test("corrupt or future journal schemas are never overwritten", () => {
  for (const raw of [
    "broken",
    '{"version":2,"entries":{}}',
    '{"version":1,"entries":{"2026-10-05":{"text":7}}}',
  ]) {
    const a = app({ filipinasJournal: raw });
    input(a, "Draft");
    assert.equal(a.win.localStorage.getItem("filipinasJournal"), raw);
    assert.equal(a.run("Journal.hasUnsaved()"), true);
    a.run("renderApp()");
    assert.equal(a.doc.getElementById("journalText").value, "Draft");
    a.dom.window.close();
  }
});

test("fresh merge preserves notes from another tab on other dates", () => {
  const a = app();
  a.run("selectDay(10)");
  input(a, "First");
  const data = JSON.parse(a.win.localStorage.getItem("filipinasJournal"));
  data.entries["2026-10-06"] = {
    text: "Other tab",
    updatedAt: new Date().toISOString(),
  };
  a.win.localStorage.setItem("filipinasJournal", JSON.stringify(data));
  input(a, "Second");
  assert.equal(
    JSON.parse(a.win.localStorage.getItem("filipinasJournal")).entries[
      "2026-10-06"
    ].text,
    "Other tab",
  );
  a.dom.window.close();
});

test("filming toggle changes labels and preference but keeps the journal", () => {
  const a = app();
  a.doc.getElementById("itineraryModeButton").click();
  assert.equal(a.win.localStorage.getItem("itineraryOnly"), "true");
  assert.equal(a.doc.getElementById("modeLabel").textContent, "Vista completa");
  assert.ok(a.doc.querySelector("#journalText"));
  a.run('setLanguage("en")');
  assert.equal(a.doc.getElementById("modeLabel").textContent, "Full view");
  a.doc.getElementById("itineraryModeButton").click();
  assert.equal(a.doc.getElementById("modeLabel").textContent, "Itinerary only");
  assert.ok(!read("style.css").includes(".mode-only .budget-section"));
  a.dom.window.close();
});

test("Today phases, independent check-ins, and quick access use the actual trip day", () => {
  for (const [now, phase] of [
    ["2026-09-16T12:00:00Z", "before"],
    ["2026-10-05T12:00:00Z", "during"],
    ["2026-10-25T12:00:00Z", "after"],
  ]) {
    const a = app({}, now);
    assert.equal(a.run("todayPhase()"), phase);
    assert.equal(
      a.run(
        "JSON.stringify(todayCheckin(TODAY_FIRST_OUTBOUND_DATE,TODAY_FIRST_OUTBOUND_TIME))",
      ),
      '{"date":"2026-09-24","time":"21:50"}',
    );
    assert.equal(
      a.run(
        "JSON.stringify(todayCheckin(TODAY_FIRST_RETURN_DATE,TODAY_FIRST_RETURN_TIME))",
      ),
      '{"date":"2026-10-21","time":"21:55"}',
    );
    a.doc.getElementById("todayButton").click();
    if (phase === "during") {
      assert.equal(a.run("state.selectedDay"), 10);
      assert.equal(
        a.doc.getElementById("fieldGuideTitle").textContent,
        "Rodaje de hoy",
      );
    }
    assert.equal(
      a.doc.querySelector("#todayContext").nextElementSibling.id,
      "fieldNotes",
    );
    a.dom.window.close();
  }
});

test("versioned scripts/styles, offline shell and local images all exist", () => {
  const sw = read("service-worker.js");
  assert.match(html, /V8\.12\.1/);
  assert.match(sw, /filipinas-v8-12-1/);
  for (const match of html.matchAll(
    /(?:src|href)="([^"?]+\.(?:js|css))\?v=([^"&]+)/g,
  )) {
    assert.equal(match[2], "8.12.1");
    assert.ok(sw.includes(`'./${match[1]}'`) || sw.includes(`"./${match[1]}"`), match[1]);
  }
  for (const match of sw.matchAll(/["']\.\/([^"']+)["']/g))
    assert.ok(fs.existsSync(path.join(root, match[1])), match[1]);
  for (const file of scripts) new vm.Script(read(file), { filename: file });
});

test("service worker waits for consent and deletes only old app caches", async () => {
  const events = {},
    deleted = [],
    added = [],
    messages = [];
  const cache = { addAll: async (requests) => added.push(...requests) };
  const context = {
    URL,
    Response,
    Request: class {
      constructor(url, options) {
        this.url = url;
        this.cache = options.cache;
      }
    },
    self: {
      addEventListener: (name, fn) => {
        events[name] = fn;
      },
      skipWaiting: () => messages.push("skip"),
      clients: { claim: () => messages.push("claim") },
    },
    caches: {
      open: async () => cache,
      keys: async () => [
        "other-project",
        "filipinas-v8-7-1",
        "filipinas-v8-8-0",
        "filipinas-v8-8-1",
        "filipinas-v8-9-0",
        "filipinas-v8-12-1",
      ],
      delete: async (key) => deleted.push(key),
    },
  };
  vm.runInNewContext(read("service-worker.js"), context);
  let pending;
  events.install({
    waitUntil: (promise) => {
      pending = promise;
    },
  });
  await pending;
  assert.ok(added.some((request) => request.url === "./journal.js"));
  assert.ok(added.every((request) => request.cache === "reload"));
  assert.ok(!messages.includes("skip"));
  events.activate({
    waitUntil: (promise) => {
      pending = promise;
    },
  });
  await pending;
  assert.deepEqual(deleted, ["filipinas-v8-7-1", "filipinas-v8-8-0", "filipinas-v8-8-1", "filipinas-v8-9-0"]);
  events.message({ data: { type: "SKIP_WAITING" } });
  assert.ok(messages.includes("skip"));
});


test("startup uses today's local date instead of stored selection, with trip boundaries", () => {
  for (const [now, expected] of [
    ["2026-09-01T12:00:00", 1],
    ["2026-09-26T00:00:00", 1],
    ["2026-10-05T00:01:00", 10],
    ["2026-10-24T23:59:00", 29],
    ["2026-11-01T12:00:00", 29],
  ]) {
    const a = app({ filipinasJourneyModel: "8.7", selectedDay: "17" }, now);
    assert.equal(a.run("state.selectedDay"), expected);
    a.run("selectDay(6);setLanguage('en')");
    input(a, "Manual day stays editable");
    assert.equal(a.run("state.selectedDay"), 6);
    const b = app(snapshot(a.win), now);
    assert.equal(b.run("state.selectedDay"), expected);
    b.run("selectDay(6)");
    assert.equal(b.doc.getElementById("journalText").value, "Manual day stays editable");
    a.win.close();
    b.win.close();
  }
});

test("place navigation follows first visit dates, preserving return stages and targets", () => {
  const a = app();
  const expected = JSON.parse(a.run("JSON.stringify([...new Set([...tripData.days].sort((a,b)=>a.date.localeCompare(b.date)).map(d=>d.locationKey))])"));
  // Sorting must not depend on the storage order of either collection.
  a.run("tripData.locations.reverse();tripData.days.reverse();renderLocationNav()");
  for (const lang of ["es", "en"]) {
    a.run(`setLanguage('${lang}')`);
    const buttons = [...a.doc.querySelectorAll(".location-link")];
    assert.deepEqual(buttons.map(b => b.dataset.loc), expected);
    assert.equal(expected[0], "madrid-departure");
    assert.equal(expected[1], "abu-dhabi");
    assert.equal(expected.at(-1), "madrid-return");
    for (const button of buttons) {
      button.click();
      const firstId = a.run(`([...tripData.days].sort((a,b)=>a.date.localeCompare(b.date))).find(d=>d.locationKey===${JSON.stringify(button.dataset.loc)}).id`);
      assert.equal(a.run("state.selectedDay"), firstId);
    }
  }
  a.win.close();
});

test("all 29 filming guides display 16:9 and contextual filter advice in both languages", () => {
  const a = app();
  for (const lang of ["es", "en"]) {
    a.run(`setLanguage('${lang}')`);
    assert.equal(a.run(`Object.values(DOCUMENTARY.presets).every(p=>p.settings.${lang}.includes('16:9') && p.filter.${lang}.includes('ND8'))`), true);
    for (let day=1; day<=29; day++) {
      a.run(`selectDay(${day})`);
      assert.match(a.doc.querySelector(".field-preset").textContent, /16:9/);
      assert.match(a.doc.querySelector(".field-filter").textContent, /ND8/);
      assert.doesNotMatch(a.doc.querySelector("#dayContent")?.textContent || a.doc.body.textContent, /\b4:3\b/);
    }
  }
  a.win.close();
});


function openLedger(a) {
  a.doc.getElementById('budgetDialog').showModal = function () { this.setAttribute('open', ''); };
  a.doc.getElementById('menuBudget').click();
  return a.doc.getElementById('globalBudget');
}
function submitExpense(a, section, values) {
  const form = section.querySelector('form');
  for (const [key, value] of Object.entries(values)) form.querySelector(`[data-field="${key}"]`).value = value;
  form.dispatchEvent(new a.win.Event('submit', {bubbles:true,cancelable:true}));
}
function captureDownloads(a) {
  const files = [];
  a.win.URL.createObjectURL = blob => { files.push({blob}); return 'blob:test'; };
  a.win.URL.revokeObjectURL = () => {};
  a.win.HTMLAnchorElement.prototype.click = function () { files.at(-1).filename = this.download; };
  return files;
}
async function blobText(a, blob) {
  return new Promise((resolve, reject) => {
    const reader = new a.win.FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}

test('journal export downloads one UTF-8 Markdown with chronological notes and unsaved drafts', async () => {
  const a = app(), files = captureDownloads(a);
  a.run('selectDay(11)'); input(a, 'Mañana 🌴\nSegunda línea');
  a.run('selectDay(10)'); input(a, 'Texto antiguo');
  const setItem = a.win.Storage.prototype.setItem;
  a.win.Storage.prototype.setItem = function (key, value) {
    if (key === 'filipinasJournal') throw new Error('quota');
    return setItem.call(this, key, value);
  };
  input(a, 'Borrador áéí\n<script>texto literal</script>');
  const before = snapshot(a.win);
  a.doc.getElementById('menuExportJournal').click();
  assert.equal(files.length, 1);
  assert.equal(files[0].filename, 'filipinas-diario.md');
  assert.equal(files[0].blob.type, 'text/markdown;charset=utf-8');
  const text = await blobText(a, files[0].blob);
  assert.ok(text.indexOf('## Día 10 · 2026-10-05') < text.indexOf('## Día 11 · 2026-10-06'));
  assert.ok(text.includes('Borrador áéí\n<script>texto literal</script>'));
  assert.ok(text.includes('Mañana 🌴\nSegunda línea'));
  assert.ok(!text.includes('Texto antiguo'));
  assert.equal((text.match(/^## /gm) || []).length, 2);
  assert.deepEqual(snapshot(a.win), before);
  assert.equal(a.run('Journal.hasUnsaved()'), true);
  a.win.close();
});

test('empty exports and ES/EN menu labels; invalid journal refuses partial export', async () => {
  const a = app(), files = captureDownloads(a);
  a.run('setLanguage("en")');
  assert.equal(a.doc.getElementById('menuExportJournalText').textContent, 'Export all notes');
  a.doc.getElementById('menuExportJournal').click();
  assert.match(await blobText(a, files[0].blob), /No notes to export/);
  openLedger(a).querySelector('[data-export-budget]').click();
  assert.match(await blobText(a, files[1].blob), /No expenses recorded/);
  a.win.localStorage.setItem('filipinasJournal', '{broken');
  a.doc.getElementById('menuExportJournal').click();
  assert.equal(files.length, 2);
  assert.match(a.doc.getElementById('exportStatus').textContent, /Export failed/);
  assert.equal(a.win.localStorage.getItem('filipinasJournal'), '{broken');
  a.win.close();
});

test('global and daily editors share CRUD, category totals, date moves and decimal amounts', () => {
  const a = app({filipinasJourneyModel:'8.7', tripBudget:'1'});
  a.run('selectDay(10)'); input(a, 'Keep my note');
  let ledger = openLedger(a);
  submitExpense(a, ledger, {detail:'Comida <img src=x>',amount:'0.10',category:'food',date:'2026-10-05'});
  submitExpense(a, ledger, {detail:'Taxi',amount:'0.20',category:'local',date:'2026-10-06'});
  assert.equal(a.run('budgetSummary(budgetItems()).spent'), 0.3);
  assert.equal(a.run('budgetSummary(budgetItems()).remaining'), 0.7);
  assert.equal(ledger.querySelectorAll('.budget-day').length, 2);
  assert.equal(a.doc.querySelectorAll('.budget-section .budget-expense').length, 1);
  assert.equal(ledger.querySelector('.budget-expense img'), null);
  ledger.querySelector('[data-budget-edit]').click();
  submitExpense(a, ledger, {detail:'Hotel',amount:'2.50',category:'accommodation',date:'2026-10-06'});
  assert.equal(ledger.querySelectorAll('.budget-day').length, 1);
  assert.equal(a.doc.querySelectorAll('.budget-section .budget-expense').length, 0);
  assert.equal(a.run('budgetSummary(budgetItems()).spent'), 2.7);
  assert.equal(a.run('budgetSummary(budgetItems()).remaining'), -1.7);
  assert.match(ledger.querySelector('[data-budget-remaining]').textContent, /-1,7/);
  a.win.confirm = () => false;
  ledger.querySelector('[data-budget-delete]').click();
  assert.equal(a.run('budgetItems().length'), 2);
  a.win.confirm = () => true;
  ledger.querySelector('[data-budget-delete]').click();
  assert.equal(a.run('budgetItems().length'), 1);
  submitExpense(a, a.doc.querySelector('.budget-section'), {detail:'Café',amount:'3.25',category:'food',date:'2026-10-05'});
  assert.equal(ledger.querySelectorAll('.budget-day').length, 2);
  const ids = [...a.doc.querySelectorAll('[id]')].map(el => el.id);
  assert.equal(ids.length, new Set(ids).size);
  assert.equal(a.doc.getElementById('journalText').value, 'Keep my note');
  const b = app(snapshot(a.win));
  assert.equal(b.run('budgetSummary(budgetItems()).spent'), a.run('budgetSummary(budgetItems()).spent'));
  assert.equal(b.win.localStorage.getItem('filipinasJourneyModel'), '8.7');
  b.win.close(); a.win.close();
});

test('budget export includes every day/category, totals and legacy items without rewriting storage', async () => {
  const seed = {filipinasJourneyModel:'8.7',tripBudget:'100',expenses:JSON.stringify([
    {dayId:11,description:'Taxi | <tag>',amount:30,category:'local'},
    {id:'food',date:'2026-10-05',dayId:10,detail:'Piña',amount:10.5,category:'food'},
    {id:'food2',date:'2026-10-05',dayId:10,detail:'Café',amount:0.5,category:'food'},
  ])};
  const a = app(seed), files = captureDownloads(a);
  const before = a.win.localStorage.getItem('expenses');
  openLedger(a).querySelector('[data-export-budget]').click();
  assert.equal(files.length, 1);
  assert.equal(files[0].filename, 'filipinas-presupuesto.md');
  const md = await blobText(a, files[0].blob);
  assert.match(md, /Gastado: 41 PHP/);
  assert.match(md, /Disponible: 59 PHP/);
  assert.match(md, /Comida: 11 PHP/);
  assert.match(md, /## Día 10 · 2026-10-05 · 11 PHP/);
  assert.match(md, /## Día 11 · 2026-10-06 · 30 PHP/);
  assert.ok(md.indexOf('## Día 10') < md.indexOf('## Día 11'));
  assert.match(md, /Piña/); assert.match(md, /Taxi/);
  assert.ok(!md.includes('<tag>'));
  assert.equal(a.win.localStorage.getItem('expenses'), before);
  a.win.close();
});

test('budget save failures retain form and data; total edits stay open and update summaries', () => {
  const a = app({filipinasJourneyModel:'8.7'}), ledger = openLedger(a);
  const setItem = a.win.Storage.prototype.setItem;
  a.win.Storage.prototype.setItem = function (key, value) {
    if (key === 'expenses') throw new Error('quota');
    return setItem.call(this,key,value);
  };
  submitExpense(a,ledger,{detail:'Keep draft',amount:'7',category:'food',date:'2026-10-05'});
  assert.equal(ledger.querySelector('[data-field="detail"]').value, 'Keep draft');
  assert.match(ledger.querySelector('[data-budget-status]').textContent, /No se ha podido guardar/);
  assert.equal(a.win.localStorage.getItem('expenses'), null);
  a.win.Storage.prototype.setItem = setItem;
  submitExpense(a,ledger,{});
  assert.equal(a.run('budgetItems().length'),1);
  a.doc.getElementById('budgetDialogInput').value = '500.50';
  a.doc.getElementById('saveBudgetButton').click();
  assert.equal(a.win.localStorage.getItem('tripBudget'),'500.5');
  assert.equal(a.doc.getElementById('budgetDialog').open, true);
  assert.match(ledger.querySelector('[data-budget-remaining]').textContent,/493,5/);
  a.win.localStorage.setItem('expenses','{invalid');
  const saved = a.win.localStorage.getItem('expenses');
  assert.throws(() => a.run('budgetMarkdown()'));
  a.run('renderGlobalBudget()');
  assert.match(ledger.textContent,/No se pueden leer/);
  assert.equal(a.win.localStorage.getItem('expenses'),saved);
  a.win.close();
});

test('itinerary-only CSS hides POI and filming while keeping notes and expenses', () => {
  const a = app();
  const css = a.doc.createElement('style'); css.textContent = read('style.css'); a.doc.head.appendChild(css);
  a.run('selectDay(10)');
  assert.ok(a.doc.querySelector('.poi-section'));
  a.doc.getElementById('itineraryModeButton').click();
  assert.equal(a.win.getComputedStyle(a.doc.querySelector('.poi-section')).display,'none');
  assert.equal(a.win.getComputedStyle(a.doc.querySelector('.field-guide')).display,'none');
  assert.notEqual(a.win.getComputedStyle(a.doc.querySelector('.journal-card')).display,'none');
  assert.notEqual(a.win.getComputedStyle(a.doc.querySelector('.budget-section')).display,'none');
  a.doc.getElementById('itineraryModeButton').click();
  assert.notEqual(a.win.getComputedStyle(a.doc.querySelector('.poi-section')).display,'none');
  a.win.close();
});


test('three date-keyed P1 and two clips for every day in both languages; progress survives reload', () => {
  const a = app();
  for (const lang of ['es','en']) {
    a.run(`setLanguage('${lang}')`);
    for (let day=1;day<=29;day++) {
      a.run(`selectDay(${day})`);
      const boxes = [...a.doc.querySelectorAll('[data-p1]')];
      assert.equal(boxes.length,3);
      assert.equal(new Set(boxes.map(b=>b.dataset.p1)).size,3);
      assert.equal(a.doc.querySelectorAll('.p1-section li').length,2);
      assert.doesNotMatch(a.doc.querySelector('.p1-section').textContent, /undefined|field\.p1/);
    }
  }
  a.run('selectDay(10)'); input(a,'Keep this note');
  const shotId = a.doc.querySelector('[data-p1]').dataset.p1;
  a.doc.querySelector('[data-p1]').click();
  assert.match(a.doc.getElementById('p1Progress').textContent,/1\/3/);
  assert.equal(a.doc.getElementById('journalText').value,'Keep this note');
  a.run('selectDay(11)');
  assert.equal(a.doc.querySelector('[data-p1]').checked,false);
  const b = app(snapshot(a.win));
  b.run('selectDay(10);setLanguage("es")');
  assert.equal(b.doc.querySelector(`[data-p1="${shotId}"]`).checked,true);
  b.run('tripData.days.find(d=>d.id===10).id=110;selectDay(110)');
  assert.equal(b.doc.querySelector(`[data-p1="${shotId}"]`).checked,true);
  a.win.close(); b.win.close();
});

test('P1 storage failures revert checkbox; corrupt data is never overwritten', () => {
  for (const corrupt of [false,true]) {
    const a = app();
    a.run('selectDay(10)');
    const key = 'filipinasP1_2026-10-05';
    if (corrupt) a.win.localStorage.setItem(key,'{"unknown":"wrong type"}');
    else {
      const setItem = a.win.Storage.prototype.setItem;
      a.win.Storage.prototype.setItem = function(k,v) { if(k===key) throw new Error('quota'); return setItem.call(this,k,v); };
    }
    a.doc.querySelector('[data-p1]').click();
    assert.equal(a.doc.querySelector('[data-p1]').checked,false);
    assert.match(a.doc.getElementById('p1Status').textContent,/No se ha podido guardar/);
    assert.equal(a.win.localStorage.getItem(key),corrupt ? '{"unknown":"wrong type"}' : null);
    a.win.close();
  }
});

test('flexible stays and search tasks replace assumptions without losing activity progress', () => {
  const a=app({filipinasJourneyModel:'8.7','done_11_Llegar a casa familiar':'true','check_11':'{"wide":true}'});
  const searchDays=[];
  for (let day=1;day<=29;day++) {
    a.run(`selectDay(${day})`);
    const flexible = [6,11,15,16,18,19,20,21,22,23,24].includes(day);
    assert.equal(Boolean(a.doc.querySelector('.accommodation-section')?.textContent.includes('Alojamiento flexible')),flexible);
    if (flexible) assert.equal(a.doc.querySelectorAll('.accommodation-section a').length,0);
    if (a.run(`dayById(${day}).activities.some(a=>a.id==='find-accommodation')`)) searchDays.push(day);
    assert.doesNotMatch(a.doc.getElementById('dayContent').textContent,/casa familiar|Claire|family home/i);
  }
  assert.deepEqual(searchDays,[6,11,15,18]);
  a.run('selectDay(11)');
  const arrivalIndex=a.run('dayById(11).activities.findIndex(a=>a.id==="arrival-manolo")');
  const box=a.doc.querySelector(`[data-done="${arrivalIndex}"]`);
  assert.equal(box.checked,true); box.click();
  assert.equal(a.doc.querySelector(`[data-done="${arrivalIndex}"]`).checked,false);
  assert.equal(a.win.localStorage.getItem('check_11'),'{"wide":true}');
  const b=app(snapshot(a.win)); b.run('selectDay(11)');
  assert.equal(b.doc.querySelector(`[data-done="${arrivalIndex}"]`).checked,false);
  assert.equal(b.run('getActivityDone(11,dayById(11).activities.find(a=>a.id==="find-accommodation"))'),false);
  a.run('setLanguage("en")');
  assert.match(a.doc.querySelector('.accommodation-section').textContent,/Flexible accommodation/);
  a.win.close(); b.win.close();
});

test('both downloaded Markdown files start with a UTF-8 signature and preserve accented text and emoji bytes', async () => {
  const a=app(), files=captureDownloads(a);
  input(a,'Día · mañana → Filipinas 🍜');
  a.doc.getElementById('menuExportJournal').click();
  const ledger=openLedger(a);
  submitExpense(a,ledger,{detail:'Piña y café',amount:'10',category:'food',date:'2026-10-05'});
  ledger.querySelector('[data-export-budget]').click();
  assert.equal(files.length,2);
  for (let i=0;i<files.length;i++) {
    const bytes=await new Promise((resolve,reject)=>{const reader=new a.win.FileReader();reader.onload=()=>resolve(new Uint8Array(reader.result));reader.onerror=reject;reader.readAsArrayBuffer(files[i].blob);});
    assert.deepEqual(Array.from(bytes.slice(0,3)),[0xef,0xbb,0xbf]);
    const decoded=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
    assert.ok(decoded.startsWith('# Filipinas ·'));
    assert.doesNotMatch(decoded,/DÃ|Â·|ðŸ/);
    if(i===0) assert.ok(decoded.includes('Día · mañana → Filipinas 🍜'));
    else {assert.ok(decoded.includes('Piña y café'));assert.ok(decoded.includes('🍜'));}
  }
  a.win.close();
});

test('preparation has no first-day shortcut; installed icons differ from the unchanged header flag', () => {
  const a=app({},'2026-09-17T12:00:00');
  assert.equal(a.doc.querySelector('[data-today-action="first"]'),null);
  assert.ok(a.doc.querySelector('#todayContext a[href]'));
  assert.equal(a.doc.getElementById('brandFlag').getAttribute('src'),'flag-ph.svg');
  const crypto=require('node:crypto');
  assert.equal(crypto.createHash('sha256').update(read('flag-ph.svg')).digest('hex'), 'fa3df691007302b9576a268d3673ab622c726e6c9b28f0080a59b31d274ff495');
  const manifest=JSON.parse(read('manifest.json'));
  assert.ok(manifest.icons.some(icon=>icon.purpose==='maskable'));
  for(const icon of manifest.icons) {
    const bytes=fs.readFileSync(path.join(root,icon.src));
    assert.deepEqual(Array.from(bytes.subarray(0,8)),[137,80,78,71,13,10,26,10]);
    assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`,icon.sizes);
    assert.ok(read('service-worker.js').includes(icon.src));
    assert.ok(!/^icon-(192|512)/.test(icon.src));
  }
  a.win.close();
});

test("photo associations, dimensions and loading cover every rendered travel day", () => {
  const a = app();
  const dimensions = a.win.PHOTO_DIMENSIONS;
  const files = fs.readdirSync(path.join(root, "images")).filter(x => x.endsWith(".webp"));
  assert.deepEqual(Object.keys(dimensions).sort(), files.sort());
  assert.ok(files.reduce((sum, file) => sum + fs.statSync(path.join(root, "images", file)).size, 0) < 4_000_000);
  for (const lang of ["es", "en"]) {
    a.run(`setLanguage("${lang}")`);
    for (let id = 1; id <= 29; id++) {
      a.run(`selectDay(${id})`);
      const hero = a.doc.querySelector("#hero img");
      assert.equal(hero.getAttribute("loading"), "eager");
      assert.equal(hero.getAttribute("fetchpriority"), "high");
      for (const img of a.doc.querySelectorAll("#hero img, .poi-card img, .gallery img")) {
        const file = new URL(img.src).pathname.split("/").pop();
        assert.ok(fs.existsSync(path.join(root, "images", file)), file);
        assert.equal(Number(img.getAttribute("width")), dimensions[file][0]);
        assert.equal(Number(img.getAttribute("height")), dimensions[file][1]);
        if (img !== hero) assert.equal(img.getAttribute("loading"), "lazy");
        assert.equal(img.getAttribute("decoding"), "async");
      }
    }
  }
  const pois = a.run("tripData.days.flatMap(d => d.pois || [])");
  for (const poi of pois) {
    const name = poi.name.en || poi.name.es;
    if (name.includes("Santo Niño")) assert.equal(poi.image, "./images/santo-nino.webp");
    if (name.includes("Madrid-Barajas")) assert.equal(poi.image, "./images/madrid-barajas.webp");
    if (name.includes("Magellan's Cross")) assert.equal(poi.image, "./images/magellans-cross.webp");
    if (name.includes("Pearl Lounge")) assert.equal(poi.image, "./images/pearl-lounge.webp");
    if (name.includes("Kitanglad")) assert.equal(poi.image, "./images/kitanglad.webp");
  }
  assert.equal(a.doc.querySelector("#photoCreditsLink").textContent, "Photo credits");
  a.dom.window.close();
});

test("itinerary-only hides gallery on toggle, navigation and persisted reload", () => {
  const a = app();
  const style = a.doc.createElement("style"); style.textContent = read("style.css"); a.doc.head.append(style);
  assert.notEqual(a.win.getComputedStyle(a.doc.querySelector(".gallery-section")).display, "none");
  a.doc.getElementById("itineraryModeButton").click();
  for (const id of [2, 7, 18, 29]) {
    a.run(`selectDay(${id})`);
    assert.equal(a.win.getComputedStyle(a.doc.querySelector(".gallery-section")).display, "none");
    assert.ok(a.doc.querySelector("#journalText"));
  }
  const b = app(snapshot(a.win));
  const css = b.doc.createElement("style"); css.textContent = read("style.css"); b.doc.head.append(css);
  assert.equal(b.win.getComputedStyle(b.doc.querySelector(".gallery-section")).display, "none");
  b.doc.getElementById("itineraryModeButton").click();
  assert.notEqual(b.win.getComputedStyle(b.doc.querySelector(".gallery-section")).display, "none");
  a.dom.window.close(); b.dom.window.close();
});

test('updated flights expose all six segments, terminals, baggage and connections in ES/EN', () => {
  const a=app({},'2026-09-23T12:00:00Z');
  const flights=JSON.parse(a.run('JSON.stringify([...TRIP_FLIGHTS.outbound,...TRIP_FLIGHTS.return])'));
  assert.deepEqual(flights.map(f=>f.number),['EY104','EY440','PR2525','PR2528','EY447','EY103']);
  assert.deepEqual(flights.map(f=>[f.departureTerminal,f.arrivalTerminal]),[['4','A'],['A','3'],['2',null],[null,'2'],['3','A'],['A','4']]);
  assert.deepEqual(flights.map(f=>f.checkedBags),[0,0,0,1,1,1]);
  assert.ok(flights.slice(3).every(f=>f.checkedBagKg===25));
  for(const lang of ['es','en']){
    a.run(`setLanguage('${lang}')`);
    const preparation=a.doc.querySelector('#todayContext');
    assert.equal(preparation.querySelectorAll('.flight-detail').length,6);
    for(const duration of ['15 h 00 min','5 h 10 min','6 h 20 min','3 h 15 min'])assert.ok(preparation.textContent.includes(duration));
    assert.ok(preparation.textContent.includes(lang==='es'?'La tarifa no incluye maletas facturadas.':'The fare does not include checked baggage.'));
    for(const id of [1,2,3,28,29]){
      a.run(`selectDay(${id})`);
      assert.equal(a.doc.querySelectorAll('.flight-section .flight-detail').length,3);
      assert.doesNotMatch(a.doc.querySelector('.flight-section').textContent,/undefined|flights\./);
    }
    a.run('selectDay(3)');
    const transfer=[...a.doc.querySelectorAll('.activity-card')].find(el=>el.textContent.includes(lang==='es'?'Conexión en Manila':'Connection in Manila'));
    assert.match(transfer.textContent,/Terminal 3/);assert.match(transfer.textContent,/Terminal 2/);
    a.run('selectDay(29)');
    assert.match(a.doc.querySelector('.activity-card').textContent,/6 h 20 min/);
  }
  a.win.close();
});

test('Campvill bungalow, corrected POI photos and signature are consistent and offline', () => {
  const a=app({filipinasJourneyModel:'8.7','done_13_Campville Riverside Carpark':'true','done_28_Vuelos de vuelta a Madrid':'true'});
  const used=new Set();
  for(const language of ['es','en']){
    a.run(`setLanguage('${language}')`);
    for(const id of [12,13,14]){
      a.run(`selectDay(${id})`);
      const accommodation=a.doc.querySelector('.accommodation-section');
      assert.match(accommodation.textContent,/Campvill Riverside Car Camping/);
      assert.match(accommodation.textContent,/Bungalow/);
      assert.equal(accommodation.querySelector('a[href="undefined"]'),null);
      assert.equal(a.doc.querySelector('#hero img').src.split('/').pop(),'campville-riverside.webp');
    }
  }
  a.run('selectDay(13)');assert.equal(a.doc.querySelector('[data-done]').checked,true);
  a.doc.querySelector('[data-done]').click();assert.equal(a.run('getActivityDone(13,dayById(13).activities[0])'),false);
  a.run('selectDay(28)');
  const idx=a.run('dayById(28).activities.findIndex(a=>a.flightNumber==="PR2528")');
  const box=a.doc.querySelector(`[data-done="${idx}"]`);assert.equal(box.checked,true);box.click();
  assert.equal(a.run('getActivityDone(28,dayById(28).activities.find(a=>a.flightNumber==="PR2528"))'),false);
  assert.equal(a.run('dayById(28).activities.filter(a=>a.flightNumber).length'),1);
  const mappings={'White Island':'white-island.webp','Sunken Cemetery':'sunken-cemetery.webp','Guiob Church Ruins':'guiob.webp','Manolo Fortich':'manolo-fortich.webp','Port of Cagayan de Oro':'cdo-port.webp','Cebu Heritage Monument':'cebu-heritage-monument.webp','Sumilon Sandbar':'sumilon-sandbar.webp','Tumalog Falls':'tumalog.webp','Simala Church':'simala.webp','Carcar Public Market':'carcar-market.webp','Amaya View':'amaya-view.webp','Seven Seas Waterpark':'seven-seas.webp'};
  for(const [name,file] of Object.entries(mappings)){
    const pois=a.run('tripData.days.flatMap(d=>d.pois||[])').filter(p=>p.name.en===name);
    assert.ok(pois.length,name);assert.ok(pois.every(p=>p.image===`./images/${file}`),name);
  }
  for(let id=1;id<=29;id++){
    a.run(`selectDay(${id})`);
    for(const img of a.doc.querySelectorAll('img[src*="images/"]'))used.add(new URL(img.src).pathname.split('/').pop());
    assert.equal(a.doc.querySelectorAll('#signatureLogo').length,1);
    assert.equal(a.doc.querySelector('.gallery img[src*="firma_logo"]'),null);
  }
  for(const file of fs.readdirSync(path.join(root,'images'))){
    assert.ok(used.has(file),`Unused image: ${file}`);
    assert.ok(read('PHOTO-CREDITS.md').includes('`'+file+'`'),`Missing credit: ${file}`);
    assert.ok(read('service-worker.js').includes('./images/'+file),`Not precached: ${file}`);
  }
  a.run('selectDay(7)');assert.equal(a.doc.querySelector('#hero img').src.split('/').pop(),'camiguin.webp');
  a.win.close();
});

test('activity presses preserve focus, notes, expanded details and roll back on storage failure', () => {
  const a=app();a.run('selectDay(13)');
  input(a,'Diario conservado');
  const note=a.doc.getElementById('journalText'),box=a.doc.querySelector('[data-done]'),details=a.doc.querySelector('details');
  if(details)details.open=true;
  box.focus();box.click();
  assert.equal(a.doc.activeElement,box);assert.equal(a.doc.getElementById('journalText'),note);
  assert.equal(note.value,'Diario conservado');if(details)assert.equal(details.open,true);
  assert.match(a.doc.querySelector('.progress-copy').textContent,/1\/1/);
  const stored=snapshot(a.win),original=a.win.Storage.prototype.setItem;
  let alerts=0;a.win.alert=()=>alerts++;
  a.win.Storage.prototype.setItem=function(key,value){if(key.startsWith('done_'))throw new Error('quota');return original.call(this,key,value);};
  box.click();assert.equal(box.checked,true);assert.equal(alerts,1);assert.deepEqual(snapshot(a.win),stored);
  a.win.close();
});

test('next/previous advance from selected day; Today scrolls once and respects reduced motion', () => {
  const a=app({},'2026-10-05T12:00:00Z');
  a.run('selectDay(10)');
  a.doc.querySelector('[data-today-action="next"]').click();
  a.doc.querySelector('[data-today-action="next"]').click();
  assert.equal(a.run('state.selectedDay'),12);
  a.doc.querySelector('[data-today-action="prev"]').click();assert.equal(a.run('state.selectedDay'),11);
  assert.equal(a.doc.querySelector('[data-day="11"]').getAttribute('aria-current'),'date');
  const scrolls=[];a.win.scrollTo=opts=>scrolls.push(['page',opts]);
  a.win.HTMLElement.prototype.scrollIntoView=function(opts){scrolls.push([this.id,opts]);};
  a.win.matchMedia=()=>({matches:true});a.doc.getElementById('todayButton').click();
  assert.equal(a.run('state.selectedDay'),10);
  assert.equal(scrolls.length,1);assert.equal(scrolls[0][0],'todayContext');assert.equal(scrolls[0][1].behavior,'instant');
  a.win.close();
});

test('menu supports focus return, Escape, keyboard loop and itinerary pressed state', () => {
  const a=app(),menu=a.doc.getElementById('menuButton'),panel=a.doc.getElementById('sidePanel');
  assert.ok(panel.hasAttribute('inert'));menu.click();
  assert.equal(menu.getAttribute('aria-expanded'),'true');assert.ok(!panel.hasAttribute('inert'));
  const first=a.doc.getElementById('closeMenu');assert.equal(a.doc.activeElement,first);
  a.doc.dispatchEvent(new a.win.KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true}));
  assert.equal(a.doc.activeElement.id,'itineraryModeButton');
  a.doc.dispatchEvent(new a.win.KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));assert.equal(a.doc.activeElement,first);
  a.doc.getElementById('itineraryModeButton').click();assert.equal(a.doc.getElementById('itineraryModeButton').getAttribute('aria-pressed'),'true');
  a.doc.dispatchEvent(new a.win.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));
  assert.equal(a.doc.activeElement,menu);assert.equal(menu.getAttribute('aria-expanded'),'false');assert.ok(panel.hasAttribute('inert'));
  a.win.close();
});
