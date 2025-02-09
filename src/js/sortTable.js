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
    const row = rows.find((r) => r.getAttribute("data-id") == movie.id);
    const currentRowPosition = Array.from(tableBody.children).indexOf(row);

    if (currentRowPosition !== index) {
      const referenceRow = tableBody.children[index];
      tableBody.insertBefore(row, referenceRow);
    }
  });
}

export default sortTable;
