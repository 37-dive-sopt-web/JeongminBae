import { members } from "./membersdata.js";

export function initializeStorage() {
    if(!localStorage.getItem("membersData")) {
        localStorage.setItem("membersData", JSON.stringify(members));
    }
}

export function getStoredMembers() {
    const raw = localStorage.getItem("membersData");
    try {
        return raw? JSON.parse(raw) : [];
    } catch (e) {
        console.error("membersData 파싱 실패:", e);
        return [];
    }
}

export function saveMembers(nextArray) {
    localStorage.setItem("membersData", JSON.stringify(nextArray));
}