import { useCallback, useEffect, useRef, useState } from "react";
// 모달 상태/카운트다운/자동 닫힘 관리

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

  // 모달 열기 (자동 닫힘 옵션 지원)
  const show = useCallback((payload, opts = {}) => {
    const { autoCloseMs, onAutoClose } = opts;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setData(payload);
    setOpen(true);

    if (autoCloseMs) {
      const initial = Math.max(1, Math.ceil(autoCloseMs / 1000));
      setCountdown(initial);

      intervalRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c == null) return c;
          const next = Math.max(0, c - 1);
          return next;
        });
      }, 1000);

      timerRef.current = setTimeout(() => {
        setOpen(false);
        setCountdown(null);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        timerRef.current = null;
        onAutoClose?.();
      }, autoCloseMs);
    } else {
      setCountdown(null);
    }
  }, []);

  // 모달 닫기 (타이머/인터벌 정리)
  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCountdown(null);
    setOpen(false);
  }, []);

  // 언마운트 정리
  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { open, data, countdown, show, hide };
}
