---
description: 文件撰寫規範與格式標準 (Documentation Writing Rules)，適用於建立或維護專案文件（如 README.md、開發手冊等）
globs: ["**/*.md", "docs/**"]
alwaysApply: true
---

# 文件撰寫規範 (Documentation Writing Rules)

本規範定義了在此專案中編寫與維護所有技術文件、說明文件（包含 `README.md`、架構說明與開發指南）時必須遵循的標準。

---

## 1. 核心撰寫原則

1. **清晰精準 (Clear & Concise)**：避免冗長無意義的廢話，條理分明，直指重點。
2. **與代碼嚴格同步 (Code Synchronization)**：文件內容（包含檔案結構、指令、功能描述）必須與現有代碼庫實際狀態 100% 一致。
3. **讀者導向 (Audience-Centric)**：假設讀者為初次接觸此專案的開發者或使用者，提供友善且可重現的操作指引。

---

## 2. 格式與排版標準

- **語言規範**：繁體中文 (zh-TW)，專有名詞與技術術語（如 Commit, Repo, GitHub Pages, LocalStorage 等）保留英文原名或加上括號標註。
- **Markdown 規範**：採用 GitHub Flavored Markdown (GFM)。
- **標題層級**：嚴格遵守 H1 (`#`) -> H2 (`##`) -> H3 (`###`) 順序，不跳級標題。
- **代碼區塊**：所有代碼或指令必須指定語言類型（如 ````bash`、````javascript`、````html`、````css`）。
- **視覺強化**：
  - 適當使用 Emoji 與表格整理多項數據或指令。
  - 重要注意事項使用 GitHub Alerts 格式（`> [!NOTE]`、`> [!TIP]`、`> [!IMPORTANT]`、`> [!WARNING]`）。

---

## 3. README.md 標準結構範本

當為專案撰寫或重構 `README.md` 時，應涵蓋以下核心章節：

1. **專案標題與徽章/簡述**：簡述專案目標與用途。
2. **線上展示 / Demo 連結**：若有 GitHub Pages 或部署網址，置於頂部顯眼處。
3. **核心功能特點 (Key Features)**：以清單列出主要功能與亮點。
4. **專案架構與檔案說明 (Project Structure)**：列出目錄結構與主要檔案功能。
5. **快速上手 / 本地執行 (Quick Start)**：
   - 前置需求 (Prerequisites)
   - 執行或啟動步驟 (含具體指令)
6. **技術棧 (Tech Stack)**：列出前端、後端、工具與依賴套件。
7. **版本控制與工作流 (Git Workflow)**：說明如何提交與部署。

---

## 4. 文件品質檢核清單 (Checklist)

每次輸出或更新文件前，必須確認：
- [ ] 所有的超連結（內部相對路徑、外部線上網址）皆有效且格式正確。
- [ ] 提供的終端機指令皆可在乾淨環境下成功執行。
- [ ] 檔案目錄樹狀圖與專案當前檔案實際名稱、路徑吻合。
- [ ] 無拼字錯誤、語法錯誤或排版跑版情形。
