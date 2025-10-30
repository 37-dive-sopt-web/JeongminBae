// 성별을  한글로 변환
const genderToKorean = (g) => (g === "male" ? "남성" : g === "female" ? "여성" : "")

//members 배열을 받아 테이블 본문에 렌더링


export function renderMembers(members) {
    const tbody = document.getElementById("tableBody");
    if(!tbody) {
        console.error("#tableBody 를 찾을 수 없습니다. HTML에서 id 확인!");
        return;
    }

    // rows
    const rows = members.map((m) => {
        const githubCell = m.github
          ? `<a href="https://github.com/${m.github}" target="_blank" rel="noreferrer noopener">${m.github}</a>`
          : "";

        return `
          <tr>
            <td><input type="checkbox" class="row-check" data-id="${m.id}" /></td>
            <td>${m.name ?? ""}</td>
            <td>${m.englishName ?? ""}</td>
            <td>${githubCell}</td>
            <td>${genderToKorean(m.gender)}</td>
            <td>${m.role ?? ""}</td>
            <td>${m.group ?? ""}</td>
            <td>${m.age ?? ""}</td>
          </tr>
        `;
    }).join("");

    tbody.innerHTML = rows;
}