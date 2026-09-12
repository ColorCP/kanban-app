// 任務看板狀態管理
let tasks = JSON.parse(localStorage.getItem('kanban_tasks')) || [
  { id: '1', title: '完成專案 Git 初始化', status: 'done' },
  { id: '2', title: '推送到 GitHub 並開啟 GitHub Pages', status: 'in-progress' },
  { id: '3', title: '新增任務截止日期功能', status: 'todo' }
];

// DOM 元素
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const todoList = document.getElementById('todo-list');
const inProgressList = document.getElementById('in-progress-list');
const doneList = document.getElementById('done-list');
const todoCount = document.getElementById('todo-count');
const inProgressCount = document.getElementById('in-progress-count');
const doneCount = document.getElementById('done-count');

// 儲存至 LocalStorage
function saveTasks() {
  localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
}

// 渲染看板
function renderBoard() {
  todoList.innerHTML = '';
  inProgressList.innerHTML = '';
  doneList.innerHTML = '';

  let counts = { todo: 0, 'in-progress': 0, done: 0 };

  tasks.forEach(task => {
    counts[task.status] = (counts[task.status] || 0) + 1;
    const card = createTaskCard(task);
    
    if (task.status === 'todo') {
      todoList.appendChild(card);
    } else if (task.status === 'in-progress') {
      inProgressList.appendChild(card);
    } else if (task.status === 'done') {
      doneList.appendChild(card);
    }
  });

  todoCount.textContent = counts.todo;
  inProgressCount.textContent = counts['in-progress'];
  doneCount.textContent = counts.done;
}

// 建立卡片元素
function createTaskCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card';
  card.draggable = true;
  card.dataset.id = task.id;

  let moveButtons = '';
  if (task.status === 'todo') {
    moveButtons = `<button class="btn-move" onclick="moveTask('${task.id}', 'in-progress')">進行中 ➔</button>`;
  } else if (task.status === 'in-progress') {
    moveButtons = `
      <button class="btn-move" onclick="moveTask('${task.id}', 'todo')">⬅ 待處理</button>
      <button class="btn-move" onclick="moveTask('${task.id}', 'done')">已完成 ➔</button>
    `;
  } else if (task.status === 'done') {
    moveButtons = `<button class="btn-move" onclick="moveTask('${task.id}', 'in-progress')">⬅ 進行中</button>`;
  }

  card.innerHTML = `
    <div class="task-card-content">${escapeHtml(task.title)}</div>
    <div class="task-card-footer">
      <div class="task-actions">
        ${moveButtons}
      </div>
      <button class="btn-delete" onclick="deleteTask('${task.id}')">刪除</button>
    </div>
  `;

  // 拖曳事件
  card.addEventListener('dragstart', () => card.classList.add('dragging'));
  card.addEventListener('dragend', () => card.classList.remove('dragging'));

  return card;
}

// XSS 防護
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// 新增任務
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskTitleInput.value.trim();
  if (!title) return;

  const newTask = {
    id: Date.now().toString(),
    title: title,
    status: 'todo'
  };

  tasks.push(newTask);
  saveTasks();
  renderBoard();
  taskTitleInput.value = '';
});

// 移動任務
window.moveTask = function(id, nextStatus) {
  tasks = tasks.map(task => task.id === id ? { ...task, status: nextStatus } : task);
  saveTasks();
  renderBoard();
};

// 刪除任務
window.deleteTask = function(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderBoard();
};

// 拖放放置處理
[todoList, inProgressList, doneList].forEach(list => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector('.task-card.dragging');
    if (draggingCard) {
      list.appendChild(draggingCard);
    }
  });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector('.task-card.dragging');
    if (draggingCard) {
      const taskId = draggingCard.dataset.id;
      const targetStatus = list.parentElement.dataset.status;
      tasks = tasks.map(t => t.id === taskId ? { ...t, status: targetStatus } : t);
      saveTasks();
      renderBoard();
    }
  });
});

// 初始化畫面
renderBoard();
