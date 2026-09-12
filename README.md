# 📋 任務看板 (Kanban App)

> 一款輕量、無依賴且支援離線持久化的現代化看板任務管理工具。採用原生 HTML5、CSS3 與 JavaScript (ES6+) 打造，提供直覺流暢的卡片拖曳與跨欄位狀態流轉體驗。

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-brightgreen?logo=github)](https://colorcp.github.io/kanban-app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20HTML5%20%7C%20CSS3-orange)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript)

---

## 🌐 線上展示 (Live Demo)

- 🚀 **即時體驗網址 (GitHub Pages)**：[https://colorcp.github.io/kanban-app/](https://colorcp.github.io/kanban-app/)
- 📦 **原始碼倉庫 (GitHub Repository)**：[https://github.com/ColorCP/kanban-app](https://github.com/ColorCP/kanban-app)

> [!TIP]
> 此專案已透過 GitHub Pages 自動發佈，無須安裝任何開發環境即可直接透過現代瀏覽器開啟體驗！

---

## ✨ 核心功能特點 (Key Features)

| 功能模組 | 特點描述 |
| :--- | :--- |
| **三欄位狀態管理** | 提供「待處理 (To Do)」、「進行中 (In Progress)」、「已完成 (Done)」三階段工作流，每欄皆有即時動態計數徽章。 |
| **優先度與自動排序** | 支援「🔥 High」、「⚡ Medium」、「☕ Low」三種優先度設定，列表依權重自動即時排序。 |
| **分類標籤與即時篩選** | 支援「💼 工作」與「🌿 生活」多分類標籤，提供上方快速 Tab 切換篩選檢視。 |
| **負責人標籤掛載** | 支援「👤 負責人」欄位輸入與展示，清晰標記每項任務負責對象。 |
| **雙軌流轉與拖放機制** | 完整支援 **HTML5 原生拖曳 (Drag and Drop)** 跨欄流轉，卡片拖曳帶有半透明微動效與平滑過渡。 |
| **持久化離線儲存** | 自動與瀏覽器 `LocalStorage` 雙向同步，支援多版本向下相容防禦，重新整理資料完整保留。 |
| **資料安全與防護** | 內建 XSS (Cross-Site Scripting) 實體轉義過濾機制，確保使用者輸入內容安全渲染。 |
| **簡約暖色美學排版** | 精心調配的暖色系 UI、Google Fonts 字型（Plus Jakarta Sans）、平滑過渡與 RWD 行動端適配。 |

---

## 📁 專案架構與檔案說明 (Project Structure)

專案結構遵循簡約清晰的無建置 (Zero-build) 前端規範：

```text
kanban-app/
├── .agents/
│   ├── rules/
│   │   ├── development.md     # 前端代碼標準、單向資料流與安全規範
│   │   └── docs-writing.md    # 技術文件撰寫規範與品質標準
│   ├── skills/
│   │   ├── ux-check/
│   │   │   └── SKILL.md       # UX 易用性審查技能 (支援 /ux-check)
│   │   └── vibe-coding-frontend-builder/
│   │       └── SKILL.md       # VibeCoding 敏捷開發流程技能
│   └── workflows/
│       └── ux-check.md.bak    # 舊版工作流備份存檔
├── .gitignore                 # Git 忽略設定
├── README.md                  # 專案說明與完整開發手冊
├── app.js                     # 核心看板邏輯、狀態管理、拖曳、篩選與排序 (KanbanApp)
├── index.html                 # 應用程式入口（簡約暖色系三欄任務看板）
└── style.css                  # 現代暖色系樣式表與 RWD 響應式排版
```

### 檔案核心職責說明

- **`index.html`**：語意化 HTML5 架構，包含頂部日期徽章、任務建立表單（內容、優先度、分類、負責人）、分類篩選 Tab 與三欄式看板容器。
- **`style.css`**：純 CSS3 實作，涵蓋現代暖色配色變數、Google Fonts、Flexbox/Grid 排版、卡片懸停微動效與拖曳陰影反饋。
- **`app.js`**：狀態驅動 (State-driven) 的 `KanbanApp` 類別架構，負責 LocalStorage 讀寫、優先權自動排序、分類篩選、DOM 動態渲染與拖曳事件。
- **`.agents/rules/development.md`**：前端代碼規範、狀態管理單向流、XSS 防禦與雙軌操作標準。
- **`.agents/rules/docs-writing.md`**：規範技術文件標準、Markdown 格式以及品質檢核流程。
- **`.agents/skills/ux-check/SKILL.md`**：定義介面易用性、無障礙與防呆機制的審查技能（支援 `/ux-check` 觸發）。
- **`.agents/skills/vibe-coding-frontend-builder/SKILL.md`**：封裝 VibeCoding 六步驟敏捷迭代流程標準規範。

---

## 🚀 快速上手 / 本地執行 (Quick Start)

### 前置需求 (Prerequisites)

本專案為純靜態網頁，無需安裝 Node.js、npm 或任何打包編譯工具。只需具備：
- 現代網頁瀏覽器（如 Google Chrome, Microsoft Edge, Safari 或 Firefox）。
- （選用）終端機環境與 Git 工具。

### 本地執行步驟

#### 方法一：直接於瀏覽器開啟（最快速）

1. 複製此專案庫至本地端：
   ```bash
   git clone https://github.com/ColorCP/kanban-app.git
   cd kanban-app
   ```
2. 直接使用瀏覽器開啟 `index.html` 檔案即可開始使用。

#### 方法二：透過輕量本地伺服器執行（推薦）

若您安裝有 Python 或 VS Code Live Server，可啟動本地 HTTP 伺服器進行測試：

- **使用 Python 內建伺服器**：
  ```bash
  # 啟動 HTTP 伺服器 (Port 8000)
  python -m http.server 8000
  ```
  啟動後，在瀏覽器網址列輸入 `http://localhost:8000` 即可訪問。

- **使用 VS Code Live Server 擴充套件**：
  在 VS Code 中對 `index.html` 點擊右鍵，選擇 **"Open with Live Server"**。

> [!NOTE]
> 首次進入應用時，系統會自動載入 3 筆引導示例任務；您可隨時點擊「刪除」或「新增」客製化自己的任務清單。

---

## 🛠️ 技術棧 (Tech Stack)

- **標記語言**：HTML5（語意化標籤、Drag & Drop API）
- **樣式設計**：CSS3（CSS Grid、Flexbox、Transitions、Transform、Box-shadow）
- **腳本邏輯**：Vanilla JavaScript (ES6+語法、事件委派、JSON、LocalStorage API)
- **版本控制與部署**：Git / GitHub / GitHub Pages (CI/CD Static Hosting)

---

## 🔄 版本控制與工作流 (Git Workflow)

專案採用簡潔的單一主幹分支（Trunk-based）或功能分支流程進行維護：

### 1. 提交變更 (Commit)
```bash
# 查看變更檔案
git status

# 加入暫存區
git add .

# 依照 Conventional Commits 規範進行提交
git commit -m "feat: 支援卡片截止日期與過期高亮提示"
```

### 2. 推送至遠端 (Push & Deploy)
```bash
# 推送變更至 GitHub
git push origin main
```

> [!IMPORTANT]
> 專案的 GitHub Pages 已設定為追蹤 `main` 分支根目錄 (`/`)。任何推送到 `main` 分支的提交，GitHub Pages 皆會在 1~2 分鐘內自動觸發建置與部署更新。

