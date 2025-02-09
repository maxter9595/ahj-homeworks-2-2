import generateTable from "../generateTable";

const mockData = [
  { id: 26, title: "Побег из Шоушенка", imdb: 9.3, year: 1994 },
  { id: 25, title: "Крёстный отец", imdb: 9.2, year: 1972 },
  { id: 27, title: "Крёстный отец 2", imdb: 9.0, year: 1974 },
];

jest.mock("../../data/data.json", () => mockData);

describe("generateTable", () => {
  let tableBody;
  beforeEach(() => {
    document.body.innerHTML = `
      <table id="movies-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Год</th>
            <th>Рейтинг IMDb</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    tableBody = document.querySelector("#movies-table tbody");
  });

  test("Should add movie rows to the table", () => {
    generateTable(mockData);
    const rows = tableBody.querySelectorAll("tr");
    expect(rows.length).toBe(3);
  });

  test("Should correctly display movie data", () => {
    generateTable(mockData);
    const rows = tableBody.querySelectorAll("tr");
    const firstRow = rows[0];
    const secondRow = rows[1];
    expect(firstRow.innerHTML).toContain("Побег из Шоушенка");
    expect(firstRow.innerHTML).toContain("1994");
    expect(firstRow.innerHTML).toContain("imdb: 9.30");
    expect(secondRow.innerHTML).toContain("Крёстный отец");
    expect(secondRow.innerHTML).toContain("1972");
    expect(secondRow.innerHTML).toContain("imdb: 9.20");
  });
});
