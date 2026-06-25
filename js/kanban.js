// js/kanban.js — Task Kanban Board for MakerMind v2.0
// Created: 2026-06-24
// Branch: v2-alpha

// ── RENDER KANBAN BOARD ──
function renderKanban(tasks) {
  const container = document.getElementById('kanban-container');
  if (!container) return;

  // If no tasks, show empty state
  if (!tasks || !tasks.length) {
    container.innerHTML = `
      <div style="color:var(--text3);font-size:12px;text-align:center;padding:40px 0;">
        <div style="font-size:24px;margin-bottom:8px;">📋</div>
        No tasks yet. Add one below or generate a blueprint.
      </div>
    `;
    updateProgress(tasks || []);
    return;
  }

  // Define columns
  const columns = [
    { id: 'todo', label: '📋 To Do', color: '#6b7280' },
    { id: 'doing', label: '🔄 Doing', color: '#3b82f6' },
    { id: 'done', label: '✅ Done', color: '#10b981' }
  ];

  // Group tasks by status
  const grouped = { todo: [], doing: [], done: [] };
  tasks.forEach(t => {
    const status = t.status || 'todo';
    if (grouped[status]) grouped[status].push(t);
    else grouped.todo.push(t);
  });

  // Build HTML
  let html = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">`;

  columns.forEach(col => {
    const items = grouped[col.id] || [];
    html += `
      <div style="background:var(--surface2);border-radius:12px;border:1px solid var(--border);padding:10px;min-height:200px;">
        <div style="font-size:11px;font-weight:600;color:${col.color};margin-bottom:8px;display:flex;justify-content:space-between;">
          <span>${col.label}</span>
          <span style="font-weight:400;color:var(--text3);font-size:10px;background:var(--border);padding:1px 8px;border-radius:10px;">${items.length}</span>
        </div>
        <div data-column="${col.id}" style="display:flex;flex-direction:column;gap:5px;min-height:60px;">
          ${items.map(t => `
            <div draggable="true" data-task-id="${t.id}" 
                 style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 10px;cursor:grab;display:flex;justify-content:space-between;align-items:center;font-size:12px;transition:opacity 0.15s;"
                 ondragstart="onDragStart(event)" ondragend="onDragEnd(event)">
              <span style="flex:1;word-break:break-word;">${esc(t.text)}</span>
              <div style="display:flex;gap:4px;align-items:center;flex-shrink:0;margin-left:8px;">
                <span style="font-size:9px;color:var(--text3);background:var(--border);padding:2px 6px;border-radius:4px;">${t.effort || '?'}</span>
                <button onclick="removeKanbanTask('${t.id}')" 
                        style="background:transparent;border:none;color:var(--text3);cursor:pointer;font-size:12px;padding:2px 4px;"
                        onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--text3)'">
                  ✕
                </button>
              </div>
            </div>
          `).join('')}
          ${items.length === 0 ? `<div style="color:var(--text3);font-size:11px;text-align:center;padding:16px 0;border:1px dashed var(--border);border-radius:6px;">Drop tasks here</div>` : ''}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;

  // Add drop listeners
  document.querySelectorAll('[data-column]').forEach(col => {
    col.addEventListener('dragover', onDragOver);
    col.addEventListener('drop', onDrop);
  });

  // Update progress bar
  updateProgress(tasks);
}

// ── UPDATE PROGRESS BAR ──
function updateProgress(tasks) {
  const total = tasks.length || 0;
  const done = tasks.filter(t => t.status === 'done').length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const bar = document.getElementById('task-progress-bar');
  if (bar) {
    bar.style.width = percent + '%';
    bar.textContent = percent + '%';
  }

  const label = document.getElementById('task-progress-label');
  if (label) label.textContent = `${done}/${total} tasks done`;

  const pct = document.getElementById('task-progress-percent');
  if (pct) pct.textContent = percent + '%';
}

// ── DRAG & DROP ──
let draggedTaskId = null;

function onDragStart(e) {
  draggedTaskId = e.target.dataset.taskId;
  e.target.style.opacity = '0.5';
  e.dataTransfer.effectAllowed = 'move';
}

function onDragEnd(e) {
  e.target.style.opacity = '1';
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function onDrop(e) {
  e.preventDefault();
  const column = e.target.closest('[data-column]');
  if (!column || !draggedTaskId) return;

  const newStatus = column.dataset.column;
  
  // Find the project
  const project = getCurrentProject();
  if (!project) return;

  const task = project.tasks.find(t => t.id === draggedTaskId);
  if (task) {
    task.status = newStatus;
    saveProjectData(project);
    renderKanban(project.tasks);
  }
  draggedTaskId = null;
}

// ── TASK CRUD ──
function addKanbanTask() {
  const input = document.getElementById('f-task-input');
  const effort = document.getElementById('f-task-effort').value;
  const text = input.value.trim();
  
  if (!text) { showToast('Enter a task description'); return; }
  
  const project = getCurrentProject();
  if (!project) { showToast('Save the project first'); return; }

  project.tasks.push({
    id: Date.now().toString(),
    text: text,
    effort: effort,
    status: 'todo',
    priority: 'medium',
    created: new Date().toISOString()
  });

  persist();
  renderKanban(project.tasks);
  input.value = '';
  showToast('Task added ✓');
}

function removeKanbanTask(taskId) {
  if (!confirm('Remove this task?')) return;
  
  const project = getCurrentProject();
  if (!project) return;

  project.tasks = project.tasks.filter(t => t.id !== taskId);
  persist();
  renderKanban(project.tasks);
  showToast('Task removed');
}

// ── HELPERS ──
function getCurrentProject() {
  if (typeof editingId === 'undefined' || !editingId) return null;
  return projects.find(p => p.id === editingId);
}

function saveProjectData(project) {
  const index = projects.findIndex(p => p.id === project.id);
  if (index !== -1) projects[index] = project;
  persist();
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
