import { renderMembers } from "./render.js";
import { initializeStorage, getStoredMembers } from "./storage.js";
import "./filter.js";
import "./checkbox.js";
import "./delete.js"
import "./modal.js"

// 초기 렌더링
document.addEventListener("DOMContentLoaded", () => {
    initializeStorage();
    const all = getStoredMembers();
    renderMembers(all);
});

