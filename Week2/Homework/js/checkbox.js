document.addEventListener("DOMContentLoaded", () => {
    const selectAll = document.getElementById("selectAll");
    const tableBody = document.getElementById("tableBody");

    if (!selectAll || !tableBody) return;

  // 상단 체크 박스
    selectAll.addEventListener("change", (e) => {
        const checked = e.target.checked;
        document.querySelectorAll(".row-check").forEach((box) => {
        box.checked = checked;
        });
    });

  // 개별 체크 박스
    tableBody.addEventListener("change", (e) => {
        if (!e.target.classList.contains("row-check")) return;

        const all = tableBody.querySelectorAll(".row-check");
        const checkedCount = [...all].filter((b) => b.checked).length;

        selectAll.checked = checkedCount > 0;
    });
});
