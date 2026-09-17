/* V8.9.0 — One expense store and editor for daily and whole-trip views. */
const BUDGET_CATEGORIES = [
  {id:'transport',es:'Transporte',en:'Transport',icon:'✈️'},
  {id:'accommodation',es:'Alojamiento',en:'Accommodation',icon:'🏨'},
  {id:'food',es:'Comida',en:'Food',icon:'🍜'},
  {id:'activities',es:'Actividades',en:'Activities',icon:'🎟️'},
  {id:'local',es:'Transporte local',en:'Local transport',icon:'🚕'},
  {id:'shopping',es:'Compras',en:'Shopping',icon:'🛍️'},
  {id:'other',es:'Otros',en:'Other',icon:'•'},
];
const BUDGET_START = '2026-09-26', BUDGET_END = '2026-10-24';
function budgetTodayLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function budgetDateLabel(iso) {
  return new Intl.DateTimeFormat(state.lang === 'es' ? 'es-ES' : 'en-US', {day:'numeric',month:'short'}).format(new Date(`${iso}T12:00:00`));
}
function budgetItems() {
  // Normalise legacy entries in memory. Reading/exporting must never rewrite storage.
  const items = JSON.parse(localStorage.getItem('expenses') || '[]');
  if (!Array.isArray(items)) throw new Error('Invalid expenses');
  const ids = new Set();
  return items.map((e, i) => {
    if (!e || typeof e !== 'object' || !Number.isFinite(Number(e.amount)) || Number(e.amount) < 0)
      throw new Error('Invalid expense');
    const day = tripData.days.find(d => d.date === e.date) || tripData.days.find(d => d.id === Number(e.dayId)) || tripData.days[0];
    const date = e.date || day.date;
    const parsed = new Date(`${date}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0,10) !== date)
      throw new Error('Invalid expense date');
    const id = String(e.id || `legacy-${i}`);
    if (ids.has(id)) throw new Error('Duplicate expense ID');
    ids.add(id);
    return {...e, id, detail:String(e.detail || e.description || ''), amount:Number(e.amount), dayId:day.id, date,
      category:BUDGET_CATEGORIES.some(c => c.id === e.category) ? e.category : 'other'};
  });
}
function budgetLabels() { return I18N[state.lang].budget; }
function budgetTripDaysRemaining() {
  const n = budgetTodayLocal();
  if (n < BUDGET_START) return 29;
  if (n > BUDGET_END) return 0;
  return Math.max(1, Math.floor((Date.parse(`${BUDGET_END}T12:00:00`) - Date.parse(`${n}T12:00:00`))/86400000)+1);
}
function budgetSum(items) { return items.reduce((sum, e) => sum + Math.round(e.amount * 100), 0) / 100; }
function budgetSummary(items) {
  const total = getTripBudget(), spent = budgetSum(items), remaining = Math.round((total-spent)*100)/100, days = budgetTripDaysRemaining();
  return {total,spent,remaining,days,daily:days ? Math.max(0,remaining)/days : 0,pct:total ? Math.min(100,Math.round(spent/total*100)) : 0};
}
function budgetCatName(id) {
  const c = BUDGET_CATEGORIES.find(x => x.id === id) || BUDGET_CATEGORIES.at(-1);
  return `${c.icon} ${c[state.lang]}`;
}
function escapeBudget(v) { return String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function budgetGroups(items) {
  return [...new Set(items.map(e => e.date))].sort().map(date => {
    const entries = items.filter(e => e.date === date);
    return {date, entries, total:budgetSum(entries), categories:budgetCategories(entries)};
  });
}
function budgetCategories(items) {
  return BUDGET_CATEGORIES.map(c => ({id:c.id, entries:items.filter(e => e.category === c.id)}))
    .filter(c => c.entries.length).map(c => ({...c,total:budgetSum(c.entries)}));
}
function budgetDayLabel(date) {
  const day = tripData.days.find(d => d.date === date);
  return `${day ? `${t('day.day')} ${day.id} · ` : ''}${date}`;
}
function budgetRows(items) {
  const l = budgetLabels();
  return `<div class="budget-expenses">${items.map(e => `<div class="budget-expense"><div><strong>${escapeBudget(e.detail)}</strong><small>${budgetCatName(e.category)} · ${budgetDateLabel(e.date)}</small></div><strong>${money(e.amount)}</strong><div class="budget-expense-actions"><button type="button" data-budget-edit="${escapeBudget(e.id)}" aria-label="${l.edit}: ${escapeBudget(e.detail)}">✎</button><button type="button" data-budget-delete="${escapeBudget(e.id)}" aria-label="${l.delete}: ${escapeBudget(e.detail)}">×</button></div></div>`).join('')}</div>`;
}
function renderBudgetV85() { renderBudgetView(document.querySelector('.budget-section'), false); }
function renderGlobalBudget() { renderBudgetView(document.getElementById('globalBudget'), true); }
function renderBudgetView(section, global) {
  if (!section) return;
  const l = budgetLabels(), prefix = global ? 'globalBudget' : 'budgetV85';
  let items;
  try { items = budgetItems(); }
  catch { section.innerHTML = `<p role="alert">${l.readError}</p>`; return; }
  const s = budgetSummary(items), day = dayById(state.selectedDay), cats = budgetCategories(items);
  const dayItems = items.filter(e => e.date === day.date);
  const listing = global ? budgetGroups(items).map(group => `<details class="budget-day" data-budget-date="${group.date}"><summary>${budgetDayLabel(group.date)} · ${money(group.total)}</summary>${group.categories.map(c => `<h4>${budgetCatName(c.id)} · ${money(c.total)}</h4>${budgetRows(c.entries)}`).join('')}</details>`).join('') : budgetRows(dayItems);
  section.innerHTML = `${global ? '' : `<div class="section-head"><h2>💰 ${l.title}</h2><span>${money(s.total)}</span></div>`}
    <div class="budget-v85-summary"><div class="budget-v85-main"><div><small>${l.remaining}</small><strong data-budget-remaining>${money(s.remaining)}</strong></div><div class="budget-v85-meter"><span style="width:${s.pct}%"></span></div><p>${money(s.spent)} · ${s.pct}%</p></div><div class="budget-v85-stats"><div><span>${l.total}</span><strong>${money(s.total)}</strong></div><div><span>${l.spent}</span><strong data-budget-spent>${money(s.spent)}</strong></div><div><span>${l.daily}</span><strong>${money(s.daily)}</strong><small>${s.days} ${l.days}</small></div></div></div>
    ${global ? `<button class="action" type="button" data-export-budget>${l.export}</button>` : ''}
    <div class="card budget-v85-card"><div class="budget-v85-form-head"><h3 data-form-title>${l.add}</h3><span>${budgetDayLabel(day.date)}</span></div>
    <form id="${prefix}Form" class="expense-form"><input type="hidden" data-field="id" id="${global ? 'globalBudgetEditId' : 'budgetEditId'}">
      <label>${l.detail}<input data-field="detail" id="${prefix}Detail" required maxlength="80"></label>
      <label>${l.amount}<input data-field="amount" id="${prefix}Amount" required type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="PHP"></label>
      <label>${l.category}<select data-field="category" id="${prefix}Category">${BUDGET_CATEGORIES.map(c => `<option value="${c.id}">${budgetCatName(c.id)}</option>`).join('')}</select></label>
      <label>${l.date}<input data-field="date" id="${prefix}Date" required type="date" min="${BUDGET_START}" max="${BUDGET_END}" value="${day.date}"></label>
      <div class="budget-v85-actions"><button class="action primary" id="${prefix}Save" type="submit">＋ ${l.save}</button><button class="action" id="${prefix}Cancel" type="button" hidden>${l.cancel}</button></div>
    </form></div><p data-budget-status role="status" aria-live="polite"></p>
    <div class="budget-v85-subsection"><div class="section-head"><h3>${l.categories}</h3></div>${cats.length ? cats.map(c => `<div class="budget-cat"><span>${budgetCatName(c.id)}</span><strong>${money(c.total)}</strong></div>`).join('') : `<p class="empty">${l.none}</p>`}</div>
    <div class="budget-v85-subsection"><div class="section-head"><h3>${global ? l.all : l.recent}</h3></div>${(global ? items : dayItems).length ? listing : `<p class="empty">${l.none}</p>`}</div>`;
  bindBudgetView(section, global, prefix);
}
function refreshBudgetViews() {
  const openDates = [...document.querySelectorAll('#globalBudget .budget-day[open]')].map(el => el.dataset.budgetDate);
  renderDay(state.selectedDay);
  if (document.getElementById('budgetDialog').open) {
    renderGlobalBudget();
    document.querySelectorAll('#globalBudget .budget-day').forEach(el => { el.open = openDates.includes(el.dataset.budgetDate); });
  }
}
function bindBudgetView(section, global, prefix) {
  const form = section.querySelector('form'), field = name => form.querySelector(`[data-field="${name}"]`);
  const feedback = text => { section.querySelector('[data-budget-status]').textContent = text; };
  form.onsubmit = event => {
    event.preventDefault();
    const id = field('id').value, detail = field('detail').value.trim(), amount = Number(field('amount').value), date = field('date').value, category = field('category').value;
    const day = tripData.days.find(d => d.date === date);
    if (!form.reportValidity() || !detail || !Number.isFinite(amount) || amount <= 0 || !day || !BUDGET_CATEGORIES.some(c => c.id === category)) { feedback(budgetLabels().invalid); return; }
    try {
      const items = budgetItems(), expense = {detail,amount:Math.round(amount*100)/100,date,category,dayId:day.id};
      if (id) {
        const i = items.findIndex(e => e.id === id);
        if (i < 0) throw new Error('Expense no longer exists');
        items[i] = {...items[i],...expense};
      } else items.push({...expense,id:`exp-${Date.now()}-${Math.random().toString(36).slice(2,9)}`});
      saveExpenses(items);
      refreshBudgetViews();
      feedback(budgetLabels().saved);
      section.querySelector('[data-field="detail"]').focus();
    } catch { feedback(budgetLabels().saveError); }
  };
  section.querySelector(`#${prefix}Cancel`).onclick = () => renderBudgetView(section, global);
  section.querySelectorAll('[data-budget-edit]').forEach(button => button.onclick = () => {
    try {
      const e = budgetItems().find(e => e.id === button.dataset.budgetEdit);
      if (!e) throw new Error('Missing expense');
      for (const key of ['id','detail','amount','date','category']) field(key).value = e[key];
      section.querySelector('[data-form-title]').textContent = budgetLabels().editing;
      section.querySelector(`#${prefix}Save`).textContent = budgetLabels().update;
      section.querySelector(`#${prefix}Cancel`).hidden = false;
      field('detail').focus();
      form.scrollIntoView({block:'nearest'});
    } catch { feedback(budgetLabels().readError); }
  });
  section.querySelectorAll('[data-budget-delete]').forEach(button => button.onclick = () => {
    if (!window.confirm(budgetLabels().confirmDelete)) return;
    try {
      saveExpenses(budgetItems().filter(e => e.id !== button.dataset.budgetDelete));
      refreshBudgetViews();
      feedback(budgetLabels().deleted);
    } catch { feedback(budgetLabels().saveError); }
  });
  section.querySelector('[data-export-budget]')?.addEventListener('click', () => {
    try { downloadMarkdown('filipinas-presupuesto.md', budgetMarkdown()); feedback(t('exports.started')); }
    catch { feedback(t('exports.error')); }
  });
}
function budgetMarkdown() {
  const items = budgetItems(), s = budgetSummary(items), l = budgetLabels();
  const lines = [`# Filipinas · ${l.title}`, '', `${l.total}: ${money(s.total)}`, `${l.spent}: ${money(s.spent)}`, `${l.remaining}: ${money(s.remaining)}`, '', `## ${l.categories}`, ''];
  for (const c of budgetCategories(items)) lines.push(`- ${budgetCatName(c.id)}: ${money(c.total)}`);
  if (!items.length) lines.push(l.none);
  for (const group of budgetGroups(items)) {
    lines.push('', `## ${budgetDayLabel(group.date)} · ${money(group.total)}`, '');
    for (const c of group.categories) {
      lines.push(`### ${budgetCatName(c.id)} · ${money(c.total)}`, '');
      for (const e of c.entries) lines.push(`- ${markdownText(e.detail)}: ${money(e.amount)}`);
      lines.push('');
    }
  }
  return lines.join('\n') + '\n';
}
