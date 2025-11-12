// js/delete.js
import { getStoredMembers, saveMembers } from "./storage.js";
import { renderMembers } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.getElementById("deleteSelectedBtn");
    if (!deleteBtn) return;

deleteBtn.addEventListener("click", () => {
    // 체크된 박스 모두 선택
    const checkedBoxes = document.querySelectorAll(".row-check:checked");
    if (checkedBoxes.length === 0) {
        alert("삭제할 멤버를 선택하세요.");
        return;
    }

    const idsToDelete = [...checkedBoxes].map((box) => Number(box.dataset.id));

    const members = getStoredMembers();
    const newMembers = members.filter((m) => !idsToDelete.includes(m.id));

    // localStorage 저장 + 렌더링
    saveMembers(newMembers);
    renderMembers(newMembers);

    // 전체 체크박스도 해제
    const selectAll = document.getElementById("selectAll");
    if (selectAll) selectAll.checked = false;
    });
});
