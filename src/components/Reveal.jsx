import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Reveal — スクロールで画面に入ったとき1回だけ表示アニメーションする
   --------------------------------------------------------------------
   ・IntersectionObserver で判定し、一度表示したら監視を解除します
     （スクロールのたびに再生されると安っぽくなるため）
   ・prefers-reduced-motion が有効な端末では即座に表示します
   ・delay で 50〜100ms ずつずらして stagger を作ります
------------------------------------------------------------------- */

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function useReveal({ threshold = 0.16, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduceMotion()) { setShown(true); return; }
    const el = ref.current;
    if (!el) return;

    // すでに画面内にある要素（ファーストビュー直下など）は即座に出す
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) { setShown(true); return; }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, shown];
}

/**
 * 使い方：<Reveal delay={80}><Card /></Reveal>
 * as で出力タグを変えられます（グリッドの子にする場合など）。
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " in" : ""}${className ? " " + className : ""}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** 子要素を順番に出すグリッド／リスト用のラッパー */
export function RevealGroup({ children, step = 70, className = "", as: Tag = "div", ...rest }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <Tag className={className} {...rest}>
      {items.map((child, i) => (
        <Reveal key={child?.key ?? i} delay={i * step} className="reveal-item">
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
