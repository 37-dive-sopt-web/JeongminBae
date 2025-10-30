import { renderMembers } from "./render.js";
import { initializeStorage, getStoredMembers } from "./storage.js";
import "./filter.js";

// 초기 렌더링
document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  const all = getStoredMembers();
  renderMembers(all);
});