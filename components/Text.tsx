"use client";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";

type TextProps = {
  delay?: number;
  children: string;
  variant?: "hero" | "logo";
};

const Text = ({ delay = 0, children, variant = "hero" }: TextProps) => {
  const elRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  const shadow = "[text-shadow:0_2px_24px_rgba(0,0,0,0.45)]";

  useEffect(() => {
    const el = elRef.current;

    if (!el) return;

    const split = SplitText.create(el, {
      type: "words", // 텍스트를 단어 단위로 분리
      mask: "words", // 단어 단위로 마스크 처리
    });

    gsap.set(el, { opacity: 1 });
    gsap.set(split.words, { yPercent: 110, opacity: 0 });

    gsap.to(split.words, {
      yPercent: 0,
      opacity: 1,
      duration: variant === "logo" ? 0.75 : 0.95,
      ease: "power3.out",
      stagger: variant === "logo" ? 0.05 : 0.075,
      delay,
    });

    return () => {
      gsap.killTweensOf(split.words); // 단어 단위로 텍스트를 초기화
      gsap.killTweensOf(el); // 텍스트를 초기화
      split.revert(); // 텍스트를 초기화
    };
  }, [delay, variant, children]);

  if (variant === "logo") {
    return (
      <div className="pointer-events-none absolute top-5 left-5 z-20 md:top-6 md:left-20">
        <p
          ref={elRef as React.RefObject<HTMLParagraphElement | null>}
          className={`text-right text-lg font-normal leading-none tracking-tight text-white sm:text-xl md:text-2xl${shadow} opacity-0`}
        >
          {children}
        </p>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 sm:bottom-20 sm:left-20 z-20">
      <h1
        ref={elRef as React.RefObject<HTMLHeadingElement | null>}
        className={`text-[clamp(2.25rem,7vw,4.75rem)] font-normal leading-[1.05] tracking-tight text-white max-sm:text-center md:text-left${shadow} opacity-0`}
      >
        {children}
      </h1>
    </div>
  );
};

export default Text;
