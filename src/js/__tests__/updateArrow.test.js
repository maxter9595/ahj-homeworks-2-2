import updateArrow from "../updateArrow";

describe("updateArrow", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table id="movies-table">
        <thead>
          <tr>
            <th id="sort-id">ID</th>
            <th id="sort-title">Название</th>
            <th id="sort-year">Год</th>
            <th id="sort-imdb">Рейтинг IMDb</th>
          </tr>
        </thead>
      </table>
    `;
  });

  test("Should add an arrow to the 'id' column with correct direction for ascending", () => {
    updateArrow("id", true);
    const arrow = document.querySelector("#sort-id .arrow");
    expect(arrow).toBeTruthy();
    expect(arrow.innerHTML).toBe("↑");
  });

  test("Should add an arrow to the 'id' column with correct direction for descending", () => {
    updateArrow("id", false);
    const arrow = document.querySelector("#sort-id .arrow");
    expect(arrow).toBeTruthy();
    expect(arrow.innerHTML).toBe("↓");
  });

  test("Should remove any other arrows when updating the 'id' column", () => {
    updateArrow("title", false);
    updateArrow("year", true);
    updateArrow("imdb", false);
    updateArrow("id", true);
    const idArrow = document.querySelector("#sort-id .arrow");
    const titleArrow = document.querySelector("#sort-title .arrow");
    const yearArrow = document.querySelector("#sort-year .arrow");
    const imdbArrow = document.querySelector("#sort-imdb .arrow");
    expect(idArrow).toBeTruthy();
    expect(titleArrow).toBeNull();
    expect(yearArrow).toBeNull();
    expect(imdbArrow).toBeNull();
  });

  test("Should update the arrow direction when changing sort order for the same column", () => {
    updateArrow("id", true);
    let arrow = document.querySelector("#sort-id .arrow");
    expect(arrow.innerHTML).toBe("↑");
    updateArrow("id", false);
    arrow = document.querySelector("#sort-id .arrow");
    expect(arrow.innerHTML).toBe("↓");
  });

  test("Should create an arrow if it doesn't exist for the column", () => {
    updateArrow("id", true);
    const arrow = document.querySelector("#sort-id .arrow");
    expect(arrow).toBeTruthy();
    expect(arrow.innerHTML).toBe("↑");
  });

  test("Should not affect other columns when updating one", () => {
    updateArrow("id", true);
    const idArrow = document.querySelector("#sort-id .arrow");
    updateArrow("title", false);
    const titleArrow = document.querySelector("#sort-title .arrow");
    expect(idArrow.innerHTML).toBe("↑");
    expect(titleArrow.innerHTML).toBe("↓");
  });
});
