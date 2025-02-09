function updateArrow(field, ascending) {
  const th = document.querySelector(`#sort-${field}`);
  const arrow = th.querySelector(".arrow") || document.createElement("span");

  arrow.classList.add("arrow");
  arrow.innerHTML = ascending ? "↑" : "↓";
  th.appendChild(arrow);

  ["id", "title", "year", "imdb"].forEach((f) => {
    if (f !== field) {
      const otherArrow = document.querySelector(`#sort-${f} .arrow`);
      if (otherArrow) {
        otherArrow.remove();
      }
    }
  });
}

export default updateArrow;
