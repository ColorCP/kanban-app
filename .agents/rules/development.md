---
description: 前端開發規範與代碼標準 (Development Rules & Coding Standards)，適用於功能開發、程式碼重構與樣式維護
globs: ["**/*.js", "**/*.html", "**/*.css"]
alwaysApply: true
---

# 前端開發規範 (Frontend Development Rules)

本規範依據目前專案現況（原生 HTML5、CSS3、Vanilla JavaScript、無建置依賴、GitHub Pages 自動部署架構）制定，所有參與本專案開發、功能擴充與重構之代碼皆必須嚴格遵守此標準。

---

## 1. 架構原則與技術定位 (Architecture Principles)

1. **Zero-build 原生三劍客**：
   - 嚴格維持純原生技術棧（HTML5 + CSS3 + Vanilla JavaScript ES6+）。
   - 禁止隨意引入重量級前端框架（如 React/Vue）或外部打包工具（如 Webpack/Vite），維持零依賴輕量特性。
   - 所有資源必須能在無編譯環境下直接被瀏覽器解析執行。
2. **單一資料源與單向資料流 (Single Source of Truth & Unidirectional Data Flow)**：
   - 全域狀態以記憶體中的 `tasks` 資料結構為唯一真實來源（Single Source of Truth）。
   - 互動流程必須遵循：`使用者操作 ➔ 狀態變更 (State Mutation) ➔ 持久化寫入 (saveTasks()) ➔ 畫面重繪 (renderBoard())`。
   - 禁止繞過狀態直接手動竄改 DOM 節點來改變任務狀態。
3. **離線優先與持久化 (Offline-First Persistence)**：
   - 應用必須在無網路環境下完全正常運作。
   - 所有實體資料變更必須即時同步至 `LocalStorage`（鍵名規範：`kanban_tasks`）。

---

## 2. HTML 規範 (HTML Standards)

- **語意化標籤**：優先使用 `<header>`, `<main>`, `<section>`, `<form>`, `<button>` 等語意標籤，禁止全站過度使用無語意的 `<div>`。
- **表單與輸入安全**：
  - 所有的任務輸入欄位必須置於 `<form>` 內部，並監聽 `submit` 事件以支援鍵盤 Enter 提交。
  - 輸入欄位必須明確配置 `required`、`autocomplete="off"` 與友善的 `placeholder`。
- **DOM 屬性與資料掛載**：
  - 看板欄位狀態識別必須使用 `data-status`（如 `data-status="todo"`、`data-status="in-progress"`、`data-status="done"`）。
  - 動態生成的卡片必須掛載唯一識別 ID（`card.dataset.id = task.id`）。

---

## 3. CSS 樣式與排版規範 (CSS Standards)

- **現代化 CSS 變數 (Design Tokens)**：
  - 全域主題色、陰影、圓角與間距必須在 `:root` 定義為 CSS 變數（如 `--primary-color`, `--bg-color`, `--card-bg`, `--radius`），便於日後擴充主題。
- **排版系統**：
  - 容器佈局優先採用 **CSS Grid** 與 **Flexbox**。
  - 嚴格禁止濫用 `position: absolute` 或固定硬編碼寬高導致跨裝置跑版。
  - 必須具備良好之響應式設計 (RWD)，於桌面端 (Desktop) 與行動端 (Mobile, `@media (max-width: 768px)`) 均維持完整易用性。
- **互動狀態反饋與微動效**：
  - 所有可點擊元素（按鈕、卡片）必須具備平滑過渡動畫（`transition: all 0.2s ease`）、`:hover` 與 `:active` 狀態。
  - 拖曳狀態必須提供即時視覺回饋（例如 `.task-card.dragging` 提供半透明與陰影高亮）。

---

## 4. JavaScript 規範 (JavaScript Standards)

- **語言標準**：
  - 使用現代 ES6+ 語法（`const` / `let`、箭頭函式、樣板字面值 Template Literals、解構賦值、陣列高階方法 `map` / `filter` / `forEach`）。
  - 嚴格禁止使用 `var`。
- **資安防護 (Security & XSS Defense)**：
  - 凡是將使用者輸入的字串渲染至 DOM 之前，**必須強制透過 `escapeHtml()` 進行轉義過濾**，防止 XSS 跨站腳本攻擊。
  - 對於非純文字內容，優先採用 `textContent` 而非直接賦值 `innerHTML`。
- **雙軌互動保證 (Dual-Mode Interaction)**：
  - **HTML5 Drag and Drop API**：支援卡片跨欄拖曳流轉，必須完整處理 `dragstart`, `dragend`, `dragover`, `drop`。
  - **無障礙快捷操作按鈕**：每個卡片必須同時提供 `.btn-move` 按鈕，確保行動裝置或不便拖曳之使用者可一鍵流轉任務。
- **全域污染最小化**：
  - 行內事件綁定（如 HTML 字串內的 `onclick`）掛載於 `window` 之函式必須保持最少且命名清晰（如 `window.moveTask`, `window.deleteTask`）。
  - 一般輔助函式與狀態變數應封裝於內部作用域中。

---

## 5. 版本控制與部署規範 (Git & Deployment Workflow)

- **分支管理**：
  - `main` 為正式生產分支，直接與 GitHub Pages 綁定。
- **Conventional Commits 提交規範**：
  - 每次 Commit 必須遵循標準前綴格式：
    - `feat:` 新增功能（如截止日期、優先級標籤）
    - `fix:` 修復缺陷或跑版問題
    - `docs:` 文件更新（如 README.md、開發規範）
    - `style:` 程式碼格式調整（不影響邏輯）
    - `refactor:` 代碼重構
    - `test:` 測試相關調整
- **發佈與部署驗證**：
  - 推送至 `origin/main` 後，必須確認 GitHub Pages 部署狀態為正常。
  - 嚴格禁止將臨時測試腳本、本地資料庫（如 `*.db`, `*.sqlite`）或無關之大型目錄提交至 Git，必須維持 `.gitignore` 的嚴格過濾。

---

## 6. 功能開發檢核清單 (Development Checklist)

在每次提交新功能或修改前，請逐項檢驗：
- [ ] 是否可在乾淨瀏覽器直接開啟 `index.html` 正常運作？
- [ ] 新增或修改的功能是否已同步至 `LocalStorage` 且重新整理後狀態不遺失？
- [ ] 使用者輸入字串是否皆經過 XSS 轉義防護？
- [ ] 拖曳與快捷按鈕是否皆能正確流轉狀態？
- [ ] 在行動端視窗寬度下是否排版正常無橫向捲軸破版？
- [ ] 終端機無報錯、瀏覽器 Console 無警告與 Uncaught Error？
