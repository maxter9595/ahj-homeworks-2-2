import data from "../data/data.json";
import sortTable from "./sortTable.js";
import updateArrow from "./updateArrow.js";
import generateTable from "./generateTable.js";

let sortOrder = 1;
let sortFieldIndex = 0;
const fields = ["id", "title", "year", "imdb"];

setInterval(() => {
  const currentField = fields[sortFieldIndex];
  const ascending = sortOrder === 1;

  sortTable(data, currentField, ascending);
  updateArrow(currentField, ascending);

  sortOrder = -sortOrder;

  if (sortOrder === 1) {
    sortFieldIndex = (sortFieldIndex + 1) % fields.length;
  }
}, 2000);

generateTable(data);
