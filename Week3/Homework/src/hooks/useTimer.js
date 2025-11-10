import { useCallback, useEffect, useRef, useState } from "react";


export default function useTimer(initialSeconds = 45) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const [expired, setExpired] = useState(false);

  const raf = useRef(null);
  const last = useRef(null);

  const tick = useCallback((t) => {
    if (!running) return;
    if (!last.current) last.current = t;
    const delta = (t - last.current) / 1000;
    last.current = t;

    setSeconds((s) => {
      const next = Math.max(0, s - delta);
      if (next === 0) {
        setRunning(false);
        setExpired(true);
      }
      return next;
    });

    raf.current = requestAnimationFrame(tick);
  }, [running]);

  useEffect(() => {
    if (running) raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      last.current = null;
    };
  }, [running, tick]);

  const start = useCallback(() => {
    if (expired) setExpired(false);
    last.current = null;
    setRunning(true);
  }, [expired]);

  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback((nextInitial = initialSeconds) => {
    setRunning(false);
    setExpired(false);
    setSeconds(nextInitial);
  }, [initialSeconds]);

  return {
    seconds,
    label: seconds.toFixed(2),
    running,
    expired,
    start,
    pause,
    reset,
    setSeconds,
  };
}
