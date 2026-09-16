import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Marquee — ゆっくり自動で横に流れるカルーセル
   --------------------------------------------------------------------
   ・同じ内容を2セット並べ、1セット分流れたら位置を戻すことで
     継ぎ目のない無限ループにしています
   ・hover / タッチ中 / スワイプ中は停止します
   ・指やトラックパッドでの横スワイプも可能です
   ・prefers-reduced-motion では自動再生せず、手動スクロールのみ
------------------------------------------------------------------- */

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Marquee({ children, speed = 34, className = "", ariaLabel }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (prefersReduced()) return;
    const track = trackRef.current;
    if (!track) return;

    const step = (now) => {
      if (!lastRef.current) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;

      if (!pausedRef.current) {
        // 1セット分の幅を超えたら先頭へ戻す（継ぎ目なくループ）
        const half = track.scrollWidth / 2;
        offsetRef.current += speed * dt;
        if (half > 0 && offsetRef.current >= half) offsetRef.current -= half;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  /* ---- 手動スワイプ ---- */
  const startX = useRef(0);
  const startOffset = useRef(0);
  const moved = useRef(false);

  const onDown = (e) => {
    pausedRef.current = true;
    setDragging(true);
    moved.current = false;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    startOffset.current = offsetRef.current;
  };

  const onMove = (e) => {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = x - startX.current;
    if (Math.abs(dx) > 4) moved.current = true;
    const half = trackRef.current ? trackRef.current.scrollWidth / 2 : 0;
    let next = startOffset.current - dx;
    if (half > 0) {
      if (next < 0) next += half;
      if (next >= half) next -= half;
    }
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-next}px,0,0)`;
    }
  };

  const onUp = () => {
    setDragging(false);
    pausedRef.current = false;
  };

  // スワイプ後にリンクが誤発火しないようにする
  const onClickCapture = (e) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  return (
    <div
      className={`mq${className ? " " + className : ""}${dragging ? " mq-drag" : ""}`}
      ref={viewportRef}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => { if (!dragging) pausedRef.current = true; }}
      onMouseLeave={() => { if (!dragging) pausedRef.current = false; }}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      onClickCapture={onClickCapture}
    >
      <div className="mq-track" ref={trackRef}>
        <div className="mq-set">{children}</div>
        <div className="mq-set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
