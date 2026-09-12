---
name: vibe-coding-frontend-builder
description: 適用於從零開始或基於現有原型，使用原生前端技術（HTML/CSS/JS）進行快速迭代、Git版本控制、自動化部署至 GitHub Pages，以及極小侵入性增量開發的標準流程。當使用者需要快速建置、發佈或擴充輕量級 Web 應用時觸發。
---

# VibeCoding 前端應用開發 Skill

本 Skill 封裝了一套標準化的「AI 原生輕量敏捷開發循環 (VibeCoding Lifecycle)」，涵蓋環境檢查、本機版控、雲端自動化部署、階段收斂、極小侵入性增量迭代與驗收閉環。透過高度泛化、結構化的 Prompt 模板，讓任何輕量前端應用的開發流程皆可被標準化重現。

---

## 適用情境

- **輕量個人工具與生產力應用**：待辦清單、番茄鐘、讀書記錄、個人記帳、習慣追蹤工具。
- **單頁行銷與個人展示網站**：個人作品集、活動宣傳頁、產品 Landing Page、個人多連結導購頁 (Linktree-style)。
- **即時運算與轉換微型工具**：匯率/房貸試算機、單位換算器、Markdown 即時預覽器、健康指標計算器。
- **互動原型與概念驗證 (POC)**：抽籤輪盤、單字卡測驗、評分互動小遊戲。
- **Zero-build 輕量架構專案**：任何追求「無打包編譯依賴、純原生三劍客、離線 LocalStorage 持久化、GitHub Pages 秒級發佈」的 Web 應用。

---

## 核心方法論（四心法）

1. **環境先行 (Toolchain First)**：動工前嚴格驗證工具鏈與身分認證，根除中途因底層依賴缺失而中斷開發。
2. **基線定錨 (Baseline Anchor)**：每個關鍵里程碑必須建立乾淨可溯的 Git 存檔點，堅決杜絕無版控裸奔。
3. **極小侵入 (Minimal Invasion)**：增量迭代時明確鎖定變更邊界，新舊功能邏輯隔離，嚴密防範代碼退化。
4. **即時驗證 (Verify & Close)**：每次變更必須經過乾淨環境驗收才固化提交，形成發佈與驗收的完整閉環。

---

## 步驟序列

### 步驟 1：環境前置檢查 (Environment Inspection)
- **目的**：確認本機 Git 與 GitHub CLI 工具鏈已正確安裝且認證授權就緒，排除後續遠端操作的中斷風險。
- **Prompt 模板**：
  ```text
  幫我確認 [環境工具清單，如：Git 和 GitHub CLI] 有沒有正確安裝，並檢查當前遠端帳號登入狀態
  ```
- **成功判斷標準**：終端機成功回傳工具版本號（如 `git --version`、`gh --version`），且 `gh auth status` 顯示已登入有效之 GitHub 帳號。

---

### 步驟 2：本機版本控制基線建立 (Local Git Baseline Setup)
- **目的**：為應用建立乾淨的初始 MVP 原型檔案（或納入現有檔案），並建立標準版本控制結構（含 `.gitignore` 防護），鎖定首個可回滾歷史基線。
- **Prompt 模板（情境 A：從零開始建立全新專案 MVP）**：
  ```text
  我想建立一個純前端的「[應用名稱]」（使用原生 index.html、style.css、app.js）。核心功能包含：[核心輸入表單與欄位]、[核心列表展示與互動操作]，資料使用 LocalStorage 本地儲存。檔案產生完成後，幫我配置合適的 .gitignore，初始化 Git 版本控制，並建立第一次 commit，訊息為 "[初始提交說明，如：feat: 初始建立 [應用名稱] 原型]"
  ```
- **Prompt 模板（情境 B：專案已有現成檔案）**：
  ```text
  目前我的專案裡有 [檔案清單，如：index.html、style.css、app.js] 等檔案。幫我配置合適的 .gitignore，初始化 Git 版本控制，並建立第一次 commit，訊息為 "[初始提交說明，如：feat: 初始專案核心結構]"
  ```
- **成功判斷標準**：目錄內生成包含 MVP 功能之代碼檔案與 `.git`、`.gitignore`，`git status` 顯示 Working tree clean，`git log` 存在第 1 筆 Commit 紀錄。

---

### 步驟 3：建立遠端倉庫並開啟自動化發佈 (Remote Repository & Auto-Deployment)
- **目的**：在 GitHub 建立遠端代碼庫、推播本地主幹，並啟用靜態託管（GitHub Pages），實現雲端即時可訪問。
- **Prompt 模板**：
  ```text
  幫我建立一個 GitHub Repo 叫做 [專案倉庫名稱]，設成 [公開/私有]，把現有的 commit 推上去，然後開啟 [託管平台，如：GitHub Pages]，讓我有一條可公開訪問的線上連結
  ```
- **成功判斷標準**：GitHub 上成功建立 Repo，遠端分支 `origin/main` 同步成功，回傳有效的線上發佈 URL（如 `https://<username>.github.io/<repo>/`）。

---

### 步驟 4：發佈驗證與階段目標定錨 (Deployment Verification & Milestone Convergence)
- **目的**：確認線上網頁部署成功並能正常存取，終止發佈監聽與檢查迴圈，明確宣告當前階段任務完成。
- **Prompt 模板**：
  ```text
  網頁 [線上體驗網址] 已經成功上線且功能正常，請停止檢查並完成本次發佈任務
  ```
- **成功判斷標準**：線上網址回傳 HTTP 200，畫面元件正常渲染，AI 終止背景輪詢並產出階段性交付摘要。

---

### 步驟 5：單一功能極小侵入性增量迭代 (Isolated Feature Iteration)
- **目的**：在既有穩定基線上擴充特定業務欄位或互動邏輯，嚴格限定變更範圍，保證舊資料與舊功能不受破壞。
- **Prompt 模板**：
  ```text
  幫我在 [目標元件/介面位置] 上加入 [新功能/欄位名稱]，[欄位詳細規則，如：是否選填、預設值]。若使用者 [觸發特定條件]，[介面相應的視覺/資料變化]；請注意保持舊資料與 LocalStorage 向下相容性，其他既有功能不要改動
  ```
- **成功判斷標準**：新欄位或互動在瀏覽器中正確呈現，新邏輯正常運作，且所有既有功能（如既有列表、舊資料讀取、原有操作按鈕）皆未產生代碼退化 (No Regression)。

---

### 步驟 6：增量驗收與閉環提交同步 (Verification & Commit Loop)
- **目的**：在驗收通過後，將健康的增量代碼依規範生成 Commit，並推送到遠端觸發自動更新，完成一次迭代閉環。
- **Prompt 模板**：
  ```text
  [功能名稱] 測試通過了，幫我依照 Conventional Commits 規範建立 commit，訊息為 "[提交類型: 簡短描述]"，然後 push 到 [目標分支，如：origin main]
  ```
- **成功判斷標準**：本地 working tree clean，遠端分支成功接收新 commit，線上 GitHub Pages 自動觸發更新並反映最新功能。

---

## 常見問題處理

### 問題 1：遠端推送失敗（Git / GitHub 憑證授權中斷）
- **現象**：執行 `git push` 出現 `Permission denied (publickey)` 或 `Authentication failed`。
- **成因**：本機 Git 憑證過期或未授權 GitHub CLI。
- **解法**：先於終端機執行 `gh auth login` 選擇 HTTPS 模式透過瀏覽器完成 Web OAuth 授權，再執行推送；或以 Personal Access Token (PAT) 更新遠端 URL。

### 問題 2：增量更新後舊資料破版或報錯（資料向下相容性斷裂）
- **現象**：在資料結構中加入新屬性後，舊有儲存於 LocalStorage 的資料因缺少該屬性而拋出 `TypeError: Cannot read properties of undefined`，導致整頁空白。
- **成因**：渲染時直接存取新屬性，未處理空值與預設值防禦。
- **解法**：在讀取資料與組裝 HTML 時加入安全預設值或可選鏈（Optional Chaining），例如 `item.newField || '預設值'`，必要時於應用程式初始化時執行輕量資料遷移 (Data Migration)。

### 問題 3：GitHub Pages 頁面 404 或未即時更新（非同步部署延遲與快取）
- **現象**：Push 完成後立刻開啟網址顯示 404，或重整後依然顯示舊版內容。
- **成因**：GitHub Pages 雲端構建與 CDN 節點分發具有 30 秒至 2 分鐘的非同步延遲，且瀏覽器常會暫存靜態資產。
- **解法**：前往 GitHub 倉庫的 `Settings -> Pages` 確認最新 Run 狀態為綠色勾選；在瀏覽器中使用強制重整 (`Ctrl + F5` 或 `Cmd + Shift + R`)，或在網址列加上版本後綴（如 `?v=timestamp`）穿透快取。

### 問題 4：使用者輸入未過濾造成 XSS 跨站腳本風險
- **現象**：當使用者在輸入欄位輸入包含 `<script>` 或 `<img onerror=...>` 的字串時，介面彈出未預期警告或破壞版面。
- **成因**：使用 `innerHTML` 拼接未經消毒的使用者輸入字串。
- **解法**：在所有字串插入 DOM 前強制使用 `escapeHtml()` 工具函式進行 HTML 實體轉義，或優先採用 `element.textContent` / `document.createTextNode` 進行安全文字賦值。
