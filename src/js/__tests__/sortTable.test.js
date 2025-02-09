import sortTable from "../sortTable";

const mockData = [
  { id: 26, title: "Побег из Шоушенка", imdb: 9.3, year: 1994 },
  { id: 25, title: "Крёстный отец", imdb: 9.2, year: 1972 },
  { id: 27, title: "Крёстный отец 2", imdb: 9.0, year: 1974 },
];

jest.mock("../../data/data.json", () => mockData);

describe("sortTable", () => {
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
        <tbody>
          <tr data-id="26" data-title="Побег из Шоушенка" data-year="1994" data-imdb="9.30">
            <td>26</td>
            <td>Побег из Шоушенка</td>
            <td>(1994)</td>
            <td>imdb: 9.30</td>
          </tr>
          <tr data-id="25" data-title="Крёстный отец" data-year="1972" data-imdb="9.20">
            <td>25</td>
            <td>Крёстный отец</td>
            <td>(1972)</td>
            <td>imdb: 9.20</td>
          </tr>
          <tr data-id="27" data-title="Крёстный отец 2" data-year="1974" data-imdb="9.00">
            <td>27</td>
            <td>Крёстный отец 2</td>
            <td>(1974)</td>
            <td>imdb: 9.00</td>
          </tr>
        </tbody>
      </table>
    `;
    tableBody = document.querySelector("#movies-table tbody");
  });

  test("Should sort the table by 'id' in ascending order", () => {
    sortTable(mockData, "id", true);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(rows[0].getAttribute("data-id")).toBe("25");
    expect(rows[1].getAttribute("data-id")).toBe("26");
    expect(rows[2].getAttribute("data-id")).toBe("27");
  });

  test("Should sort the table by 'id' in descending order", () => {
    sortTable(mockData, "id", false);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(rows[0].getAttribute("data-id")).toBe("27");
    expect(rows[1].getAttribute("data-id")).toBe("26");
    expect(rows[2].getAttribute("data-id")).toBe("25");
  });

  test("Should sort the table by 'year' in ascending order", () => {
    sortTable(mockData, "year", true);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(parseInt(rows[0].getAttribute("data-year"))).toBe(1972);
    expect(parseInt(rows[1].getAttribute("data-year"))).toBe(1974);
    expect(parseInt(rows[2].getAttribute("data-year"))).toBe(1994);
  });

  test("Should sort the table by 'year' in descending order", () => {
    sortTable(mockData, "year", false);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(parseInt(rows[0].getAttribute("data-year"))).toBe(1994);
    expect(parseInt(rows[1].getAttribute("data-year"))).toBe(1974);
    expect(parseInt(rows[2].getAttribute("data-year"))).toBe(1972);
  });

  test("Should sort the table by 'imdb' in ascending order", () => {
    sortTable(mockData, "imdb", true);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(rows[0].getAttribute("data-imdb")).toBe("9.00");
    expect(rows[1].getAttribute("data-imdb")).toBe("9.20");
    expect(rows[2].getAttribute("data-imdb")).toBe("9.30");
  });

  test("Should sort the table by 'imdb' in descending order", () => {
    sortTable(mockData, "imdb", false);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(rows[0].getAttribute("data-imdb")).toBe("9.30");
    expect(rows[1].getAttribute("data-imdb")).toBe("9.20");
    expect(rows[2].getAttribute("data-imdb")).toBe("9.00");
  });

  test("Should sort the table by 'title' in ascending order", () => {
    sortTable(mockData, "title", true);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(rows[0].getAttribute("data-title")).toBe("Крёстный отец");
    expect(rows[1].getAttribute("data-title")).toBe("Крёстный отец 2");
    expect(rows[2].getAttribute("data-title")).toBe("Побег из Шоушенка");
  });

  test("Should sort the table by 'title' in descending order", () => {
    sortTable(mockData, "title", false);
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    expect(rows[0].getAttribute("data-title")).toBe("Побег из Шоушенка");
    expect(rows[1].getAttribute("data-title")).toBe("Крёстный отец 2");
    expect(rows[2].getAttribute("data-title")).toBe("Крёстный отец");
  });

  test("Should break when sorting by an invalid field", () => {
    expect(() => sortTable("nonExistentField")).toThrow();
  });
});
