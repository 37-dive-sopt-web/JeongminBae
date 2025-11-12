import { getStoredMembers, saveMembers } from "./storage.js";
import { renderMembers } from "./render.js";

// 모달 열기
export function openModal() {
  const backdrop = document.getElementById("modalBackdrop");
  if (!backdrop) return;
  backdrop.hidden = false;
}

// 모달 닫기
export function closeModal() {
  const backdrop = document.getElementById("modalBackdrop");
  if (!backdrop) return;
  backdrop.hidden = true;

  const form = document.getElementById("addForm");
  if (form) form.reset();
}

// 연결
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const closeBtn = document.getElementById("modalCloseBtn");
  const backdrop = document.getElementById("modalBackdrop");
  const form = document.getElementById("addForm");

  if (addBtn) addBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // 백드롭 클릭 시 닫기
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  // 추가
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fields = [
        "add_name",
        "add_englishName",
        "add_github",
        "add_gender",
        "add_role",
        "add_group",
        "add_age",
      ];
      const values = Object.fromEntries(
        fields.map((id) => [id, document.getElementById(id)?.value?.trim() ?? ""])
      );

      // 빈칸 체크
      const hasEmpty = Object.values(values).some((v) => !v);
      if (hasEmpty) {
        alert("모든 칸을 입력해주세요!");
        return;
      }

      closeModal();

      const newMember = {
        id: Date.now(),
        name: values.add_name,
        englishName: values.add_englishName,
        github: values.add_github,
        gender: values.add_gender,
        role: values.add_role,
        codeReviewGroup: values.add_group,
        age: values.add_age,
      };

      const members = getStoredMembers();
      members.push(newMember);
      saveMembers(members);
      renderMembers(members);
    });
  }
});
