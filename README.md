# Sales Records Dashboard

A responsive and high-performance dashboard for viewing and managing large CSV datasets (100,000+ rows) using **React, Vite, Tailwind CSS, and PapaParse**.

---

## 🔗 Live Demo

👉 **Deployed App:** https://nirmaan-company.vercel.app/

---

## 🚀 Features

- Upload & parse CSV files (PapaParse)
- Global search + column filters
- Sorting on all columns
- Pagination for large datasets
- Select single/multiple rows
- Bulk delete & bulk export
- Show / hide table columns
- Clean and responsive UI (Tailwind CSS)

---

## 📦 Installation

Ensure **Node.js 18+** is installed.

```bash
npm install
```

---

## ▶️ Run the Project

```bash
npm run dev
```

Open the development URL shown in your terminal  
(usually `http://localhost:5173`)

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
 ├── components/
 │    └── Table/
 │         ├── DataTable.jsx
 │         ├── TableHeader.jsx
 │         ├── TableBody.jsx
 │
 ├── hooks/
 │    └── useTableData.js
 │
 ├── store/
 │    ├── tableActions.js
 │    ├── tableReducer.js
 │    └── index.js
 │
 └── data/
      └── 100000_Sales_Records.csv
```

---

## 🔧 Tech Stack

- **React + Vite** — fast development environment  
- **Tailwind CSS** — utility-based styling  
- **PapaParse** — CSV parsing  
- **useReducer** — state management  

---

## 📊 Dataset

Includes a real dataset:

```
100,000_Sales_Records.csv
```

Used for performance and stress testing of filters, sorting, and pagination.

---

## ⚠️ Known Limitations

- CSV parsing is done in the browser (may freeze with extremely large files)
- Delete operation has no confirmation dialog yet
- "Select all pages" feature is not implemented

---

## 💡 Future Enhancements

- Confirmation popup for delete  
- Toast notifications  
- Virtualized table for extremely large datasets  
- Dark mode support  

---

## 🕒 Development Time

Approx. **26 hours** to build core logic:  
parsing, table rendering, filters, sorting, pagination, selection, export, and delete.

---

## 📄 License

This project is open for personal and educational use.
