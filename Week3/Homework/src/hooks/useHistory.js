import { useCallback, useState } from "react";

/* 뒤집은 카드 쌍 기록 (최근순) */
export default function useHistory() {
  const [history, setHistory] = useState([]);

  const pushPair = useCallback((a, b, success) => {
    setHistory((prev) => [{ a, b, success, ts: Date.now() }, ...prev]);
  }, []);

  const clear = useCallback(() => setHistory([]), []);

  return { history, pushPair, clear };
}
