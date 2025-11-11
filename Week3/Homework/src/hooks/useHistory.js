import { useCallback, useState } from "react";
// 최근 시도(두 카드) 기록을 관리

/* 뒤집은 카드 쌍 기록 (최근순) */
export default function useHistory() {
  const [history, setHistory] = useState([]);

  // 시도 추가 (앞면 값 a/b, 성공 여부)
  const pushPair = useCallback((a, b, success) => {
    setHistory((prev) => [{ a, b, success, ts: Date.now() }, ...prev]);
  }, []);

  // 기록 초기화
  const clear = useCallback(() => setHistory([]), []);

  return { history, pushPair, clear };
}
