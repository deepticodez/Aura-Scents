"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const themeStyles: Record<string, { bg: string; text: string; star: string; borderHover: string; cardBgHover: string; shadowHover: string }> = {
  blue: { bg: "bg-blue-500/20", text: "text-blue-400", star: "text-blue-400", borderHover: "border-blue-500/50", cardBgHover: "bg-blue-500/10", shadowHover: "shadow-[0_8px_32px_rgba(59,130,246,0.25)]" },
  orange: { bg: "bg-orange-500/20", text: "text-orange-400", star: "text-orange-400", borderHover: "border-orange-500/50", cardBgHover: "bg-orange-500/10", shadowHover: "shadow-[0_8px_32px_rgba(249,115,22,0.25)]" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-400", star: "text-purple-400", borderHover: "border-purple-500/50", cardBgHover: "bg-purple-500/10", shadowHover: "shadow-[0_8px_32px_rgba(168,85,247,0.25)]" },
  pink: { bg: "bg-pink-500/20", text: "text-pink-400", star: "text-pink-400", borderHover: "border-pink-500/50", cardBgHover: "bg-pink-500/10", shadowHover: "shadow-[0_8px_32px_rgba(236,72,153,0.25)]" },
  green: { bg: "bg-emerald-500/20", text: "text-emerald-400", star: "text-emerald-400", borderHover: "border-emerald-500/50", cardBgHover: "bg-emerald-500/10", shadowHover: "shadow-[0_8px_32px_rgba(16,185,129,0.25)]" },
};

const testimonialsRow1 = [
  { id: 1, text: "Aura Scents redefines luxury. NOX is my new signature. I can't imagine my daily routine without it.", author: "Elena R.", role: "Creative Director · Vogue", theme: "blue", icon: "circle" },
  { id: 2, text: "The complexity of these fragrances is unmatched. Every spritz brings out a different layer of sophistication.", author: "James T.", role: "Founder · Ascent", theme: "orange", icon: "square" },
  { id: 3, text: "Ocean Mist transports me straight to the Amalfi coast. It perfectly captures that vibrant, airy freshness.", author: "Sarah W.", role: "Head of Design · Studio", theme: "purple", icon: "diamond" },
  { id: 4, text: "Incredible longevity and sillage. Worth every penny. The attention to detail is just stunning.", author: "Michael B.", role: "CPO · Luxe", theme: "pink", icon: "circle" },
  { id: 5, text: "Rose Élxir is sweet but incredibly sophisticated. It's a modern take on classic floral profiles.", author: "Sophia L.", role: "VP Eng · Style", theme: "green", icon: "square" },
];

const testimonialsRow2 = [
  { id: 6, text: "I've never received so many compliments. Friends are constantly asking what I'm wearing.", author: "David K.", role: "Design Director · Figma", theme: "green", icon: "circle" },
  { id: 7, text: "The dark, smoky notes of NOX are intoxicating. A masterpiece for evening events.", author: "Aria M.", role: "Founder · Raycast", theme: "orange", icon: "diamond" },
  { id: 8, text: "Pure elegance in a bottle. The packaging is stunning too. You truly get the luxury experience.", author: "Oliver J.", role: "Head of Growth · Vercel", theme: "purple", icon: "square" },
  { id: 9, text: "Ocean Mist is fresh without being aquatic-cliché. A beautiful, refined scent.", author: "Emma S.", role: "CPO · Superhuman", theme: "pink", icon: "circle" },
  { id: 10, text: "A sensory journey from the first spray. The whole collection is thoughtfully curated.", author: "Lucas H.", role: "Head of Design · Framer", theme: "blue", icon: "diamond" },
];

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function AvatarIcon({ type, className }: { type: string; className?: string }) {
  if (type === "square") {
    return <div className={`w-3 h-3 rounded-[3px] bg-current ${className}`} />;
  }
  if (type === "diamond") {
    return <div className={`w-3 h-3 rotate-45 rounded-[2px] bg-current ${className}`} />;
  }
  return <div className={`w-3.5 h-3.5 rounded-full bg-current ${className}`} />;
}

export function Testimonials() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // GSAP Tweens references to control play/pause
  const tween1 = useRef<gsap.core.Tween | null>(null);
  const tween2 = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    tween1.current = gsap.to(row1Ref.current, {
      x: "-50%",
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    tween2.current = gsap.to(row2Ref.current, {
      x: "50%",
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    gsap.set(row2Ref.current, { x: "-50%" });

    return () => {
      tween1.current?.kill();
      tween2.current?.kill();
    };
  }, []);

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    tween1.current?.pause();
    tween2.current?.pause();
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    tween1.current?.play();
    tween2.current?.play();
  };

  const renderCard = (t: any, idx: number, rowNum: number) => {
    const uniqueId = t.id + (idx >= (rowNum === 1 ? testimonialsRow1 : testimonialsRow2).length ? 100 : 0);
    const isHovered = hoveredId === uniqueId;
    const hasHover = hoveredId !== null;
    const styles = themeStyles[t.theme] || themeStyles.blue;

    return (
      <motion.div
        key={uniqueId}
        onMouseEnter={() => handleMouseEnter(uniqueId)}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isHovered ? 1.05 : 1,
          filter: hasHover && !isHovered ? "blur(4px)" : "blur(0px)",
          opacity: hasHover && !isHovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`w-[360px] shrink-0 p-7 rounded-3xl border flex flex-col gap-5 ${
          isHovered
            ? `${styles.borderHover} ${styles.cardBgHover} ${styles.shadowHover}`
            : "border-white/10 bg-white/5"
        } backdrop-blur-xl cursor-default transition-all duration-500`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${styles.bg} ${styles.text}`}>
            <AvatarIcon type={t.icon} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-white font-semibold text-[15px] tracking-wide">{t.author}</h4>
            <p className="text-white/40 text-[13px]">{t.role}</p>
          </div>
        </div>

        <div className="flex gap-[2px]">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-[14px] h-[14px] ${styles.star}`} />
          ))}
        </div>

        <p className="text-[15px] text-white/80 leading-relaxed font-light">
          {t.text}
        </p>
      </motion.div>
    );
  };

  return (
    <section className="py-32 relative z-30 overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-white">
          Word of Mouth
        </h2>
        <p className="text-white/50 mt-4 tracking-wide">What our discerning clients say.</p>
      </div>

      <div className="w-full flex flex-col gap-6 relative z-10">
        {/* ROW 1: Moves Left */}
        <div className="flex w-max" style={{ minWidth: "200%" }}>
          <div ref={row1Ref} className="flex gap-6 px-3 w-full">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, idx) => renderCard(t, idx, 1))}
          </div>
        </div>

        {/* ROW 2: Moves Right */}
        <div className="flex w-max" style={{ minWidth: "200%" }}>
          <div ref={row2Ref} className="flex gap-6 px-3 w-full justify-end">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, idx) => renderCard(t, idx, 2))}
          </div>
        </div>
      </div>
    </section>
  );
}
