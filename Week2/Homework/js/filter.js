import { getStoredMembers } from "./storage.js";
import { renderMembers } from "./render.js";

// 텍스트 포함 검사
function textIncludes(text, keyword) {
    if (keyword === "") return true;
    if (text == null) return false;
    const dataText = String(text).toLowerCase();
    const searchText = String(keyword).toLowerCase();
    return dataText.includes(searchText);
}

// 입력값 7개를 읽어오기
function getFilterValues() {
    return {
        name: document.getElementById("name").value.trim(),
        englishName: document.getElementById("englishName").value.trim(),
        github: document.getElementById("github").value.trim(),
        gender: document.getElementById("gender").value,
        role: document.getElementById("role").value,
        group: document.getElementById("group").value.trim(),
        age:         document.getElementById("age").value.trim(),
    };
}

// AND
function filterMembers(members, f) {
    return members.filter((m) => {
        const nameMatch = textIncludes(m.name, f.name);
        const englishNameMatch = textIncludes(m.englishName, f.englishName);
        const githubMatch = textIncludes(m.github, f.github);
        const genderMatch = f.gender === "" || String(m.gender) === f.gender;
        const roleMatch  = f.role   === "" || String(m.role)   === f.role;
        const groupMatch = textIncludes(m.codeReviewGroup, f.group);
        const ageMatch = textIncludes(m.age, f.age);
        return (
        nameMatch &&
        englishNameMatch &&
        githubMatch &&
        genderMatch &&
        roleMatch &&
        groupMatch &&
        ageMatch
        );
    });
}

// 적용/초기화 연결
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("filter-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const filters  = getFilterValues();
        const all      = getStoredMembers();
        const result   = filterMembers(all, filters);
        renderMembers(result);
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
        const all = getStoredMembers();
        renderMembers(all);
        }, 0);
    });
});
