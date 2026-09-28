(function () {
  const KEY = 'departure-board-tasks';
  const SEQ_KEY = 'departure-board-seq';
  let tasks = load();
  let seq = Number(localStorage.getItem(SEQ_KEY)) || tasks.length;
  let editingId = null;
  let freshId = null;

  const $ = (id) => document.getElementById(id);
  const input = $('taskInput');

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
      localStorage.setItem(SEQ_KEY, String(seq));
    } catch (e) { /* storage unavailable */ }
  }
  function fmt(ts) {
    return new Date(ts).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function addTask() {
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    seq += 1;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const gate = 'G' + String(seq).padStart(2, '0');
    tasks.unshift({ id, gate, text, done: false, added: Date.now(), completed: null });
    freshId = id;
    input.value = '';
    save(); render(); input.focus();
  }

  function toggle(id) {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    t.done = !t.done;
    t.completed = t.done ? Date.now() : null;
    freshId = id;
    save(); render();
  }

  function remove(id) {
    tasks = tasks.filter((x) => x.id !== id);
    if (editingId === id) editingId = null;
    save(); render();
  }

  function commitEdit(id, value) {
    const v = value.trim();
    const t = tasks.find((x) => x.id === id);
    if (t && v) t.text = v;
    editingId = null;
    save(); render();
  }

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function btn(cls, label, action, id) {
    const b = el('button', cls, label);
    b.type = 'button';
    b.dataset.action = action;
    b.dataset.id = id;
    return b;
  }

  function buildTask(t) {
    const li = el('li', 'task' + (t.id === freshId ? ' fresh' : ''));
    li.dataset.id = t.id;
    li.appendChild(el('span', 'gate', t.gate || 'G00'));

    if (editingId === t.id) {
      const inp = el('input', 'edit-input');
      inp.value = t.text;
      inp.maxLength = 120;
      inp.setAttribute('aria-label', 'Edit task');
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') commitEdit(t.id, inp.value);
        if (e.key === 'Escape') { editingId = null; render(); }
      });
      li.appendChild(inp);
      setTimeout(() => { inp.focus(); inp.select(); }, 0);
    } else {
      li.appendChild(el('span', 'text', t.text));
    }

    li.appendChild(t.done ? el('span', 'status arrived', 'ARRIVED') : el('span', 'status boarding', 'BOARDING'));

    let meta = 'Departed ' + fmt(t.added);
    if (t.done && t.completed) meta += ' · Arrived ' + fmt(t.completed);
    li.appendChild(el('span', 'meta', meta));

    const actions = el('div', 'actions');
    actions.appendChild(t.done
      ? btn('b-undo', 'Mark Pending', 'toggle', t.id)
      : btn('b-complete', 'Mark Complete', 'toggle', t.id));
    actions.appendChild(editingId === t.id
      ? btn('b-save', 'Save', 'save', t.id)
      : btn('b-edit', 'Edit', 'edit', t.id));
    actions.appendChild(btn('b-del', 'Delete', 'delete', t.id));
    li.appendChild(actions);
    return li;
  }

  function fill(list, items, title, msg) {
    list.replaceChildren();
    if (!items.length) {
      const li = el('li', 'empty');
      li.appendChild(el('strong', '', title));
      li.appendChild(document.createTextNode(msg));
      list.appendChild(li);
      return;
    }
    items.forEach((t) => list.appendChild(buildTask(t)));
  }

  function render() {
    const pending = tasks.filter((t) => !t.done);
    const done = tasks.filter((t) => t.done);
    $('pendingCount').textContent = pending.length + ' pending';
    $('doneCount').textContent = done.length + ' completed';
    fill($('pendingList'), pending, 'All gates clear', 'No tasks waiting. Add one above to schedule a departure.');
    fill($('doneList'), done, 'No arrivals yet', 'Mark a task complete and it lands here.');
    freshId = null;
  }

  $('addBtn').addEventListener('click', addTask);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });
  document.querySelector('.boards').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-action]');
    if (!b) return;
    const id = b.dataset.id;
    if (b.dataset.action === 'toggle') toggle(id);
    else if (b.dataset.action === 'delete') remove(id);
    else if (b.dataset.action === 'edit') { editingId = id; render(); }
    else if (b.dataset.action === 'save') {
      const inp = b.closest('li').querySelector('.edit-input');
      commitEdit(id, inp ? inp.value : '');
    }
  });

  render();
})();