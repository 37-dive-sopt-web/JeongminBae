import { renderMembers } from "./render.js";
import { initializeStorage, getStoredMembers } from "./storage.js";

// 첫 진입 초기 데이터 심기
initializeStorage();

// 데이터 읽어오기
const members = getStoredMembers();

// 표 렌더링
renderMembers(members);