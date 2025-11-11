// 로컬스토리지 랭킹
export const RANKING_STORAGE_KEY = "ranking-records";

export function loadRecords() {
  const raw = window.localStorage.getItem(RANKING_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addRecord(level, timeSpent) {
  const list = loadRecords();
  const item = {
    level,
    time: Number(timeSpent.toFixed(2)),
    clearedAt: new Date().toISOString(),
  };
  list.push(item);

  list.sort((a, b) => {
    if (b.level !== a.level) return b.level - a.level; // 높은 레벨 우선
    return a.time - b.time; // 같은 레벨이면 빠른 시간 우선
  });
  window.localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(list));
}

export function clearRecords() {
  window.localStorage.removeItem(RANKING_STORAGE_KEY);
}
