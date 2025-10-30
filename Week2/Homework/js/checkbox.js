document.addEventListener("DOMContentLoaded", () => {
  const selectAll = document.getElementById("selectAll");

  if (!selectAll) return;

  selectAll.addEventListener("change", (e) => {
    const checked = e.target.checked;
    document.querySelectorAll(".row-check").forEach((box) => {
      box.checked = checked;
    });
  });
});
