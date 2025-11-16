# Sales Records Dashboard

A responsive, high-performance dashboard for exploring large CSV sales data (100k+ rows). Built with React + Vite and Tailwind CSS. Includes client-side CSV parsing (PapaParse), fast table rendering, filters, sorting, pagination and CSV export.

---

## Features

- Parses CSV data with PapaParse
- Global search + per-column filters
- Client-side sorting and pagination
- CSV export
- Clean, modern UI (Tailwind + custom styles)
- Local provider using `useReducer` + Redux-style actions/reducer

---

## Project README

This README documents how to run the project and summarizes key implementation details added as part of the assignment (bulk actions & selection).

**Location:** the app source is under `src/` and the main data file is `src/data/100000_Sales_Records.csv`.

## Setup (Windows / PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Run the dev server

```powershell
npm run dev
```

3. Build for production (optional)

```powershell
npm run build
npm run preview
```

## Features (implemented)

- CSV parsing using `papaparse` (`useTableData` hook) and initial store population
- Client-side filtering: global search and per-column filters
- Client-side sorting
- Pagination with page-size controls
- CSV Export (full filtered dataset) and CSV export of selected rows (`Export Selected`)
- Multi-row selection with checkboxes (per-row) and a header checkbox that is pagination-aware (selects only rows on the current page)
- Selection Mode: checkboxes are hidden by default; clicking the bulk action buttons opens selection mode. While in selection mode you can:
	- Select rows individually or use the header checkbox to select all rows on the current page
	- Click `Export Selected` to download only selected rows as CSV
	- Click `Delete Selected` to remove selected rows from the table (store)
	- Click `Cancel` to exit selection mode and clear selections
- Batch delete updates the in-memory store and clamps pagination if the current page becomes invalid
- Export utility preserved in `src/utils/csvExport.js` and re-used for selected exports

Files of interest:
- `src/components/Table/DataTable.jsx` — main table + bulk actions UI
- `src/components/Table/TableHeader.jsx` — header checkbox + sorting UI
- `src/components/Table/TableBody.jsx` — per-row checkbox handling
- `src/hooks/useTableData.js` — CSV parsing & data normalization
- `src/store/reducer.js`, `src/store/actions.js`, `src/store/types.js` — in-app store and selection actions

## Dataset choice

I used `100000_Sales_Records.csv` (placed at `src/data/100000_Sales_Records.csv`) for this assignment because it is large enough to exercise performance concerns (parsing time, DOM size, pagination and selection behavior) while still being a realistic sales dataset for filtering, sorting and export operations.

## Technology decisions & trade-offs

- React + Vite: fast developer experience and small build output.
- Tailwind CSS: rapid, consistent styling without writing lots of custom CSS.
- PapaParse (client-side CSV parsing): simplifies local development and avoids needing a backend. Trade-off: large files are parsed in-browser and can be memory intensive for very large datasets. To mitigate that, the app uses pagination and has a separate `TableView.jsx` with `react-window` virtualization for scenarios where virtualization is used.
- In-memory store (React `useReducer` pattern): keeps the app simple and avoids introducing a global dependency. Trade-off: not persistent across reloads and not suitable for multi-user sync without a backend.
- Selection model stores `selectedIds` keyed by row `id` for O(1) toggles and simple export/delete operations.

## Known limitations & future improvements

- Large dataset memory: parsing 100k+ rows in the browser can be heavy. Future improvement: stream parsing or server-side pre-processing.
- Selection across all pages: currently the header checkbox selects only the visible page (pagination-aware). Add an explicit "Select all across pages" option if needed.
- Undo / confirmation: batch delete currently removes rows immediately. Add a confirmation modal and/or undo snackbar.
- Persistent storage: currently deletes affect only in-memory state. Persisting changes to a backend or local storage would make edits durable.
- Visual feedback: add toasts for successful export/delete and a progress indicator for large exports.
- Tests: add unit and integration tests around selection, export and delete flows.

## Time spent

Estimated time spent on the assignment: ~4 hours. This includes parsing/normalizing the CSV, implementing store + selection actions, wiring the UI (header/row checkboxes), adding export & delete functionality, and addressing hooks/order and behavior bugs.

---

If you'd like, I can:
- Add a confirmation modal for deletes
- Implement "select all across pages"
- Add toast notifications after export/delete
- Run the dev server and produce a short demo recording

Tell me which you'd like next and I’ll implement it.

---

---

## Quick start

Requirements:
- Node.js 18+ (or your local project's required version)
- npm (or yarn)

Install deps:

Run dev server:

```bash
npm run dev
```

## Styling & Theming

- The UI uses Tailwind CSS and custom utility classes in `App.css` and `index.css`.
- To change primary colors, edit the Tailwind config or update gradient classes used across components.

---
