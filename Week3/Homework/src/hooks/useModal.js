import { useCallback, useEffect, useRef, useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

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

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { open, data, countdown, show, hide };
}
