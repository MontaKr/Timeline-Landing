"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/1.jpg" },
  { src: "/2.jpg" },
  { src: "/3.jpg" },
  { src: "/4.jpg" },
  { src: "/6.jpg" },
  { src: "/5.jpg" },
];

export const INTRO_END_DELAY_SEC = 0.35 + (IMAGES.length - 1) * 0.25 + 1 + 1;

const Intro = () => {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const radialRef = useRef<HTMLDivElement>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    const images = refs.current.filter(Boolean);

    if (!images.length) return;

    const timeline = gsap.timeline();

    timeline.to(images, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      delay: 0.35,
      stagger: { each: 0.25, ease: "power1.out" },
    });

    timeline.to(containerRef.current, {
      width: "100%",
      height: "100dvh",
      maxWidth: "none",
      aspectRatio: "unset",
      margin: 0,
      duration: 1,
      ease: "power3.inOut",
    });

    timeline.to(
      radialRef.current,
      {
        opacity: 1,
        duration: 0.85,
        ease: "power2.out",
      },
      ">",
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="flex items-center justify-center absolute inset-0">
      <div
        ref={containerRef}
        className="relative aspect-video w-[min(88vw, 28rem)] overflow-hidden md:w-[42vw]"
      >
        {IMAGES.map((src, i) => (
          <Image
            key={src.src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={`${basePath}${src.src}`}
            alt={`Intro image ${i + 1}`}
            fill
            className="object-cover absolute inset-0"
            unoptimized
            sizes="100vw"
            style={{ zIndex: i, clipPath: "inset(0% 0% 100% 0%)" }}
          />
        ))}
      </div>
      <div
        ref={radialRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 88% at 50% 42%, transparent 22%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0.82) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
};

export default Intro;
