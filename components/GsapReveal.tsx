'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type GsapRevealProps = { children: ReactNode; className?: string; delay?: number };

export default function GsapReveal({ children, className = '', delay = 0 }: GsapRevealProps) {
  const element = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!element.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(element.current, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.85, delay, ease: 'power3.out', scrollTrigger: { trigger: element.current, start: 'top 88%', once: true } });
    }, element);
    return () => context.revert();
  }, [delay]);
  return <div ref={element} className={className}>{children}</div>;
}
