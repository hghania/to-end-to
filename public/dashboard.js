const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const details = document.getElementById('details');

function fetchTasks() {
  fetch('/api/tasks')
    .then(res => res.json())
    .then(tasks => {
      list.innerHTML = '';
      tasks.forEach(renderTask);
    });
}

function renderTask(task) {
  const div = document.createElement('div');
  div.className = `task ${task.completed ? 'completed' : ''}`;
  div.innerHTML = `
    <span>#${task.id} — ${task.title}</span>
    <div class="task-actions">
      <button onclick="toggleTask(${task.id})">✔ Terminé</button>
      <button onclick="showDetails(${task.id})">🔍 Détails</button>
      <button onclick="deleteTask(${task.id})">🗑 Supprimer</button>
    </div>
  `;
  list.appendChild(div);
}

function addTask() {
  const title = input.value.trim();
  if (!title) return;

  fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ title })
  })
  .then(() => {
    input.value = '';
    fetchTasks();
  });
}

function toggleTask(id) {
  fetch(`/api/tasks/${id}/toggle`, { method: 'PATCH' })
    .then(() => fetchTasks());
}

function deleteTask(id) {
  fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    .then(() => {
      fetchTasks();
      hideDetails();
    });
}

function showDetails(id) {
  fetch(`/api/tasks/${id}`)
    .then(res => res.json())
    .then(task => {
      details.style.display = 'block';
      details.innerHTML = `
        <h3>Détails de la tâche #${task.id}</h3>
        <p><strong>Nom :</strong> ${task.title}</p>
        <p><strong>Status :</strong> ${task.completed ? '✔ Terminé' : '⏳ En cours'}</p>
        <button onclick="hideDetails()">Fermer</button>
      `;
    });
}

function hideDetails() {
  details.style.display = 'none';
}

fetchTasks();
