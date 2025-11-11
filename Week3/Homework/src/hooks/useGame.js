import { useEffect, useMemo, useRef, useState } from "react";
import { buildDeck } from "../utils/deck";
import { addRecord } from "../utils/ranking";
import useTimer from "./useTimer";
import useHistory from "./useHistory";

// 카드 매칭 게임 로직 관리

const LEVEL_TIME = { 1: 45, 2: 60, 3: 100 };

export default function useGame(level = 1, opts = {}) {
  const { onFinish } = opts;

  const [deck, setDeck] = useState(() => buildDeck(level));
  const [openIds, setOpenIds] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [message, setMessage] = useState("카드를 눌러 게임을 시작");
  const [inputLocked, setInputLocked] = useState(false);

  const timeoutRef = useRef(null);

  // 타이머 & 히스토리
  const {
    seconds, label: timeLabel, running, expired,
    start, pause, reset: resetTimer
  } = useTimer(LEVEL_TIME[level] ?? 45);

  const { history, pushPair, clear: clearHistory } = useHistory();

  const totalPairs = useMemo(() => deck.length / 2, [deck]);
  const matchedPairs = useMemo(() => matched.size / 2, [matched]);
  const remainingPairs = totalPairs - matchedPairs;

  const clearPendingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 게임 상태 초기화
  const doReset = (newLevel = level) => {
    clearPendingTimeout();
    setDeck(buildDeck(newLevel));
    setOpenIds([]);
    setMatched(new Set());
    clearHistory();
    setMessage("카드를 눌러 게임을 시작");
    setInputLocked(false);
    resetTimer(LEVEL_TIME[newLevel] ?? 45);
  };

  const reset = () => doReset(level);

  // 레벨이 바뀌면 상태를 해당 레벨로 초기화
  useEffect(() => {
    doReset(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  // 카드 뒤집기
  const flip = (id) => {
    if (inputLocked) return;
    if (matched.has(id)) { setMessage("이미 맞춘 카드예요"); return; }
    if (openIds.includes(id)) { setMessage("이미 뒤집힌 카드예요"); return; }
    if (openIds.length === 2) return;

    // 첫 클릭에 타이머 시작
    if (!running && seconds > 0 && !expired) start();

    const next = [...openIds, id];
    setOpenIds(next);

    if (next.length === 2) {
      const [aId, bId] = next;
      const a = deck.find((c) => c.id === aId);
      const b = deck.find((c) => c.id === bId);
      const isMatch = a.value === b.value;

      pushPair(a.value, b.value, isMatch);

      if (isMatch) {
        timeoutRef.current = setTimeout(() => {
          setMatched((prev) => {
            const s = new Set(prev);
            s.add(aId); s.add(bId);
            return s;
          });
          setOpenIds([]);
          setMessage("짝 성공!");
        }, 250);
      } else {
        timeoutRef.current = setTimeout(() => {
          setOpenIds([]);
          setMessage("다시 시도!");
        }, 700);
      }
    }
  };

  // 승리
  useEffect(() => {
    if (deck.length > 0 && matched.size === deck.length) {
      setMessage("🎉 모든 쌍을 맞췄어요!");
      setInputLocked(true);
      pause();
      const timeSpent = (LEVEL_TIME[level] ?? 45) - seconds;
      onFinish?.({ type: "win", level, timeSpent });
      addRecord(level, timeSpent);
    }
    return clearPendingTimeout;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched, deck]);

  // 시간 만료
  useEffect(() => {
    if (expired) {
      setMessage("시간 만료!");
      setInputLocked(true);
      onFinish?.({ type: "lose", level });
    }
    return clearPendingTimeout;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expired]);

  return {
    // 게임 상태
    deck,
    openIds,
    matched,
    message,
    history,
    totalPairs,
    matchedPairs,
    remainingPairs,
    timeLabel,
    // 제어
    flip,
    reset,
    inputLocked,
  };
}
