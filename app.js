/**
 * 簡約暖色系三欄任務看板 (Warm Minimalist Kanban Board)
 * 支援三欄拖曳 (To-do, process, done) 與三種優先程度排序 (High, Medium, Low)
 */

const STORAGE_KEY = 'warm_kanban_todos_v1';
const LEGACY_STORAGE_KEY = 'warm_minimal_todos_v1';

// 優先程度權重定義 (High > Medium > Low)
const PRIORITY_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1
};

// 初始示範資料（含三種優先程度）
const DEFAULT_TODOS = [
  {
    id: 'demo-1',
    text: '整理 Q3 專案進度與團隊簡報',
    category: 'work',
    assignee: 'Penny',
    priority: 'high',
    status: 'todo',
    createdAt: Date.now() - 3600000 * 2
  },
  {
    id: 'demo-2',
    text: '挑選週末手沖咖啡豆與燕麥奶',
    category: 'life',
    assignee: 'Penny',
    priority: 'medium',
    status: 'process',
    createdAt: Date.now() - 3600000
  },
  {
    id: 'demo-3',
    text: '回覆外部合作夥伴架構需求信件',
    category: 'work',
    assignee: 'Alex',
    priority: 'low',
    status: 'done',
    createdAt: Date.now() - 7200000
  }
];

class KanbanApp {
  constructor() {
    this.todos = this.loadTodos();
    this.currentCategoryFilter = 'all'; // 'all' | 'work' | 'life'
    this.draggedTaskId = null;

    // DOM 元素快取
    this.form = document.getElementById('todo-form');
    this.taskInput = document.getElementById('task-input');
    this.prioritySelect = document.getElementById('priority-select');
    this.categorySelect = document.getElementById('category-select');
    this.assigneeInput = document.getElementById('assignee-input');
    this.dateBadge = document.getElementById('current-date');
    this.filterButtons = document.querySelectorAll('.tab-btn');
    this.clearDoneBtn = document.getElementById('clear-done-btn');

    // 三欄對應配置
    this.statusKeys = ['todo', 'process', 'done'];
    this.columns = {
      todo: {
        container: document.getElementById('col-todo'),
        list: document.getElementById('list-todo'),
        counter: document.getElementById('count-todo')
      },
      process: {
        container: document.getElementById('col-process'),
        list: document.getElementById('list-process'),
        counter: document.getElementById('count-process')
      },
      done: {
        container: document.getElementById('col-done'),
        list: document.getElementById('list-done'),
        counter: document.getElementById('count-done')
      }
    };

    this.init();
  }

  /**
   * 初始化應用程式
   */
  init() {
    this.displayDate();
    this.bindFormEvents();
    this.bindFilterEvents();
    this.setupDropZones();
    this.render();
  }

  /**
   * 顯示當前日期
   */
  displayDate() {
    const today = new Date();
    const options = { month: 'long', day: 'numeric', weekday: 'short' };
    this.dateBadge.textContent = today.toLocaleDateString('zh-TW', options);
  }

  /**
   * 載入待辦資料（向後相容舊格式與補充預設優先程度）
   */
  loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => ({
            ...item,
            priority: item.priority || 'medium'
          }));
        }
      } catch (e) {
        console.error('解析看板資料失敗:', e);
      }
    }

    // 檢查舊版資料相容
    const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacySaved) {
      try {
        const legacyList = JSON.parse(legacySaved);
        if (Array.isArray(legacyList) && legacyList.length > 0) {
          return legacyList.map((item) => ({
            id: item.id || 'task_' + Date.now() + Math.random().toString(36).substring(2, 6),
            text: item.text,
            category: item.category || 'work',
            assignee: item.assignee || '',
            priority: item.priority || 'medium',
            status: item.completed ? 'done' : 'todo',
            createdAt: item.createdAt || Date.now()
          }));
        }
      } catch (e) {
        console.error('舊版資料相容失敗:', e);
      }
    }

    // 首次開啟載入示範資料
    this.saveTodos(DEFAULT_TODOS);
    return DEFAULT_TODOS;
  }

  /**
   * 儲存至 localStorage
   */
  saveTodos(todos = this.todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  /**
   * 表單送出新增事件
   */
  bindFormEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.taskInput.value.trim();
      const priority = this.prioritySelect ? this.prioritySelect.value : 'medium';
      const category = this.categorySelect.value;
      const assignee = this.assigneeInput.value.trim();

      if (!text) return;

      const newTask = {
        id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        text,
        priority, // High, Medium, Low
        category,
        assignee: assignee || '',
        status: 'todo', // 新任務預設放入 To-do
        createdAt: Date.now()
      };

      this.todos.unshift(newTask);
      this.saveTodos();
      this.render();

      this.taskInput.value = '';
      this.taskInput.focus();
    });

    // 清除 done 欄位按鈕
    this.clearDoneBtn.addEventListener('click', () => {
      this.todos = this.todos.filter((t) => t.status !== 'done');
      this.saveTodos();
      this.render();
    });
  }

  /**
   * 分類篩選 Tab 切換
   */
  bindFilterEvents() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.currentCategoryFilter = filter;

        this.filterButtons.forEach((b) => {
          const isActive = b.dataset.filter === filter;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        this.render();
      });
    });
  }

  /**
   * 設定全欄位拖曳放置區 (Drop Zones)
   */
  setupDropZones() {
    this.statusKeys.forEach((statusKey) => {
      const colObj = this.columns[statusKey];
      const columnEl = colObj.container;

      // 拖曳進入或經過欄位
      columnEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        columnEl.classList.add('drag-over');
      });

      // 離開欄位
      columnEl.addEventListener('dragleave', (e) => {
        if (!columnEl.contains(e.relatedTarget)) {
          columnEl.classList.remove('drag-over');
        }
      });

      // 放開卡片 (Drop)
      columnEl.addEventListener('drop', (e) => {
        e.preventDefault();
        columnEl.classList.remove('drag-over');

        const taskId = e.dataTransfer.getData('text/plain') || this.draggedTaskId;
        if (!taskId) return;

        this.moveTaskToStatus(taskId, statusKey);
      });

      // 刪除按鈕委派
      columnEl.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.btn-delete');
        if (deleteBtn) {
          const id = deleteBtn.dataset.id;
          this.deleteTask(id);
        }
      });
    });
  }

  /**
   * 移動任務到指定欄位狀態
   */
  moveTaskToStatus(taskId, newStatus) {
    const targetTask = this.todos.find((t) => t.id === taskId);
    if (!targetTask) return;

    if (targetTask.status !== newStatus) {
      targetTask.status = newStatus;
      this.saveTodos();
      this.render();
    }
  }

  /**
   * 刪除任務
   */
  deleteTask(taskId) {
    const cardEl = document.querySelector(`[data-task-id="${taskId}"]`);
    if (cardEl) {
      cardEl.style.transform = 'scale(0.8)';
      cardEl.style.opacity = '0';
      setTimeout(() => {
        this.todos = this.todos.filter((t) => t.id !== taskId);
        this.saveTodos();
        this.render();
      }, 150);
    } else {
      this.todos = this.todos.filter((t) => t.id !== taskId);
      this.saveTodos();
      this.render();
    }
  }

  /**
   * 根據優先程度進行排序 (High > Medium > Low)，同優先級則按建立時間最新排前
   */
  sortTasksByPriority(tasks) {
    return [...tasks].sort((a, b) => {
      const weightA = PRIORITY_WEIGHTS[a.priority] || 2;
      const weightB = PRIORITY_WEIGHTS[b.priority] || 2;
      if (weightB !== weightA) {
        return weightB - weightA; // High(3) > Medium(2) > Low(1)
      }
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }

  /**
   * 建立單一任務卡片元素
   */
  createTaskCardElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.status === 'done' ? 'is-done' : ''}`;
    li.setAttribute('draggable', 'true');
    li.setAttribute('data-task-id', task.id);

    // 分類標籤
    const isWork = task.category === 'work';
    const categoryBadgeText = isWork ? '💼 工作' : '🌿 生活';
    const categoryBadgeClass = isWork ? 'badge-work' : 'badge-life';

    // 負責人標籤
    const assigneeBadge = task.assignee
      ? `<span class="badge badge-assignee">👤 ${this.escapeHTML(task.assignee)}</span>`
      : '';

    // 優先程度標籤
    const priorityConfig = {
      high: { text: '🔥 High', class: 'badge-priority-high' },
      medium: { text: '⚡ Medium', class: 'badge-priority-medium' },
      low: { text: '☕ Low', class: 'badge-priority-low' }
    };
    const pInfo = priorityConfig[task.priority] || priorityConfig.medium;
    const priorityBadge = `<span class="badge ${pInfo.class}">${pInfo.text}</span>`;

    li.innerHTML = `
      <div class="task-card-header">
        <div class="task-title-group">
          <span class="drag-grip" title="按住卡片拖曳橫跨欄位">⠿</span>
          <span class="task-title">${this.escapeHTML(task.text)}</span>
        </div>
        <button 
          type="button" 
          class="btn-delete" 
          data-id="${task.id}" 
          title="刪除任務"
          aria-label="刪除任務：${this.escapeHTML(task.text)}"
        >
          <svg class="icon-delete" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="task-card-footer">
        <div class="task-badges">
          ${priorityBadge}
          <span class="badge ${categoryBadgeClass}">${categoryBadgeText}</span>
          ${assigneeBadge}
        </div>
      </div>
    `;

    // 拖曳開始事件
    li.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', task.id);
      e.dataTransfer.effectAllowed = 'move';
      this.draggedTaskId = task.id;

      setTimeout(() => {
        li.classList.add('dragging');
      }, 0);
    });

    // 拖曳結束事件
    li.addEventListener('dragend', () => {
      li.classList.remove('dragging');
      this.draggedTaskId = null;
      this.statusKeys.forEach((key) => {
        this.columns[key].container.classList.remove('drag-over');
      });
    });

    return li;
  }

  /**
   * XSS 安全跳脫
   */
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * 渲染三個欄位與計數（按優先程度排序）
   */
  render() {
    // 依分類過濾
    const filteredTodos = this.currentCategoryFilter === 'all'
      ? this.todos
      : this.todos.filter((t) => t.category === this.currentCategoryFilter);

    this.statusKeys.forEach((status) => {
      const col = this.columns[status];

      // 依優先程度排序：High > Medium > Low
      const columnTasks = this.sortTasksByPriority(
        filteredTodos.filter((t) => t.status === status)
      );

      // 更新計數
      col.counter.textContent = columnTasks.length;

      // 清空舊清單
      col.list.innerHTML = '';

      if (columnTasks.length === 0) {
        // 空狀態提示
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'column-empty-state';
        emptyDiv.innerHTML = `
          <div class="empty-icon">${status === 'done' ? '✨' : '🍃'}</div>
          <span>此欄尚無任務<br>可將卡片拖曳至此</span>
        `;
        col.list.appendChild(emptyDiv);
      } else {
        // 依排序結果依序渲染卡片
        columnTasks.forEach((task) => {
          const cardEl = this.createTaskCardElement(task);
          col.list.appendChild(cardEl);
        });
      }
    });

    // 判斷 done 欄位清除按鈕顯示與否
    const hasDoneTasks = this.todos.some((t) => t.status === 'done');
    this.clearDoneBtn.style.display = hasDoneTasks ? 'inline-block' : 'none';
  }
}

// 頁面加載完成後啟動
document.addEventListener('DOMContentLoaded', () => {
  new KanbanApp();
});
