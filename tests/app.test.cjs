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
  assert.equal(a.doc.getElementById("modeLabel").textContent, "Mostrar rodaje");
  assert.ok(a.doc.querySelector("#journalText"));
  a.run('setLanguage("en")');
  assert.equal(a.doc.getElementById("modeLabel").textContent, "Show filming");
  a.doc.getElementById("itineraryModeButton").click();
  assert.equal(a.doc.getElementById("modeLabel").textContent, "Hide filming");
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
  assert.match(html, /V8\.8\.1/);
  assert.match(sw, /filipinas-v8-8-1/);
  for (const match of html.matchAll(
    /(?:src|href)="([^"?]+\.(?:js|css))\?v=([^"&]+)/g,
  )) {
    assert.equal(match[2], "8.8.1");
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
  assert.deepEqual(deleted, ["filipinas-v8-7-1", "filipinas-v8-8-0"]);
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
