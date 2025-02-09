/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/data/data.json
const data_namespaceObject = /*#__PURE__*/JSON.parse('[{"id":26,"title":"Побег из Шоушенка","imdb":9.3,"year":1994},{"id":25,"title":"Крёстный отец","imdb":9.2,"year":1972},{"id":27,"title":"Крёстный отец 2","imdb":9,"year":1974},{"id":1047,"title":"Тёмный рыцарь","imdb":9,"year":2008},{"id":223,"title":"Криминальное чтиво","imdb":8.9,"year":1994}]');
;// CONCATENATED MODULE: ./src/js/sortTable.js
function sortTable(data, field, ascending = true) {
  if (!["id", "title", "year", "imdb"].includes(field)) {
    throw new Error(`Invalid field: ${field}`);
  }
  const rows = Array.from(document.querySelectorAll("tr[data-id]"));
  const isNumeric = field === "id" || field === "year" || field === "imdb";
  const sortedData = [...data].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];
    if (isNumeric) {
      return ascending ? valA - valB : valB - valA;
    } else {
      return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });
  const tableBody = document.querySelector("#movies-table tbody");
  sortedData.forEach((movie, index) => {
    const row = rows.find(r => r.getAttribute("data-id") == movie.id);
    const currentRowPosition = Array.from(tableBody.children).indexOf(row);
    if (currentRowPosition !== index) {
      const referenceRow = tableBody.children[index];
      tableBody.insertBefore(row, referenceRow);
    }
  });
}
/* harmony default export */ const js_sortTable = (sortTable);
;// CONCATENATED MODULE: ./src/js/updateArrow.js
function updateArrow(field, ascending) {
  const th = document.querySelector(`#sort-${field}`);
  const arrow = th.querySelector(".arrow") || document.createElement("span");
  arrow.classList.add("arrow");
  arrow.innerHTML = ascending ? "↑" : "↓";
  th.appendChild(arrow);
  ["id", "title", "year", "imdb"].forEach(f => {
    if (f !== field) {
      const otherArrow = document.querySelector(`#sort-${f} .arrow`);
      if (otherArrow) {
        otherArrow.remove();
      }
    }
  });
}
/* harmony default export */ const js_updateArrow = (updateArrow);
;// CONCATENATED MODULE: ./src/js/generateTable.js
function generateTable(data) {
  const tableBody = document.querySelector("#movies-table tbody");
  tableBody.innerHTML = "";
  data.forEach(movie => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", movie.id);
    row.setAttribute("data-title", movie.title);
    row.setAttribute("data-year", movie.year);
    row.setAttribute("data-imdb", movie.imdb.toFixed(2));
    row.innerHTML = `
      <td>${movie.id}</td>
      <td>${movie.title}</td>
      <td>(${movie.year})</td>
      <td>imdb: ${movie.imdb.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
}
/* harmony default export */ const js_generateTable = (generateTable);
;// CONCATENATED MODULE: ./src/js/app.js




let sortOrder = 1;
let sortFieldIndex = 0;
const fields = ["id", "title", "year", "imdb"];
setInterval(() => {
  const currentField = fields[sortFieldIndex];
  const ascending = sortOrder === 1;
  js_sortTable(data_namespaceObject, currentField, ascending);
  js_updateArrow(currentField, ascending);
  sortOrder = -sortOrder;
  if (sortOrder === 1) {
    sortFieldIndex = (sortFieldIndex + 1) % fields.length;
  }
}, 2000);
js_generateTable(data_namespaceObject);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;