"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

interface ProductBottleScrollProps {
  product: Product;
}

export function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  
  const framesLoaded = useRef(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const scrollText: Record<string, { leftTitle: string, leftDesc: string, rightTitle: string, rightDesc: string }> = {
    "nox": {
      leftTitle: "Embrace the Darkness",
      leftDesc: "A bold opening that commands the room.",
      rightTitle: "Crafted in Smoke",
      rightDesc: "Deep, resinous notes of aged oud and leather."
    },
    "ocean-mist": {
      leftTitle: "Born of the Sea",
      leftDesc: "Crisp ocean air captured in a single breath.",
      rightTitle: "Sunlit Waves",
      rightDesc: "Sparkling bergamot over deep saltwater currents."
    },
    "rose-elxir": {
      leftTitle: "Velvet Petals",
      leftDesc: "The purest essence of midnight romance.",
      rightTitle: "Sweet Nectar",
      rightDesc: "Warm vanilla folded into crushed blooms."
    }
  };

  const textData = scrollText[product.id] || scrollText["nox"];
  
  // Animation state for lerping
  const frameState = useRef({
    current: 0,
    target: 0,
  });
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    const totalFrames = 120;
    
    // Create image objects and preload them
    imagesRef.current = [];
    let loadedCount = 0;
    
    const variantFolder = product.id === "ocean-mist" ? "ocean" : product.id === "rose-elxir" ? "rose" : product.id;
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Load exactly as instructed: 1.webp -> 120.webp
      img.src = `/images/${variantFolder}/${i}.webp`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          framesLoaded.current = true;
          renderFrame(0);
        }
      };
      imagesRef.current.push(img);
    }

    const renderFrame = (index: number) => {
      // Ensure we don't go out of bounds
      const safeIndex = Math.max(0, Math.min(totalFrames - 1, index));
      if (!imagesRef.current[safeIndex] || !context) return;
      
      const cw = canvas.parentElement?.clientWidth || window.innerWidth;
      const ch = canvas.parentElement?.clientHeight || window.innerHeight;
      
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const img = imagesRef.current[safeIndex];
      
      // Ensure it covers and eliminates black margins by behaving like object-fit: cover
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const scale = ratio;
      const centerShift_x = (canvas.width - img.width * scale) / 2;
      const centerShift_y = (canvas.height - img.height * scale) / 2;
      
      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * scale, img.height * scale
      );
    };

    // Continuous Render Loop for smooth lerping
    const renderLoop = () => {
      if (framesLoaded.current) {
        // Lerp factor (adjust for smoothness vs responsiveness)
        const lerpFactor = 0.08; 
        
        frameState.current.current += (frameState.current.target - frameState.current.current) * lerpFactor;
        
        // Only render if there's a meaningful change
        const roundedFrame = Math.round(frameState.current.current);
        renderFrame(roundedFrame);
      }
      reqIdRef.current = requestAnimationFrame(renderLoop);
    };
    
    reqIdRef.current = requestAnimationFrame(renderLoop);

    let ctx = gsap.context(() => {
      
      // The timeline specifically for text overlays
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            // Map scroll progress (0 -> 1) directly to frame index (0 -> 119)
            frameState.current.target = self.progress * (totalFrames - 1);
          }
        }
      });

      // Set initial state - stationary, blurred, scaled down slightly
      gsap.set(text1Ref.current, { opacity: 0, x: 0, filter: "blur(12px)", scale: 0.98 });
      gsap.set(text2Ref.current, { opacity: 0, x: 0, filter: "blur(12px)", scale: 0.98 });

      // Overlay text animations (no horizontal movement)
      tl.to(text1Ref.current, { opacity: 1, filter: "blur(0px)", scale: 1, ease: "power2.out", duration: 0.2 }, 0.1)
        .to(text1Ref.current, { opacity: 0, filter: "blur(12px)", scale: 1.02, ease: "power2.in", duration: 0.2 }, 0.4)
        .to(text2Ref.current, { opacity: 1, filter: "blur(0px)", scale: 1, ease: "power2.out", duration: 0.2 }, 0.6)
        .to(text2Ref.current, { opacity: 0, filter: "blur(12px)", scale: 1.02, ease: "power2.in", duration: 0.2 }, 0.9);

    }, containerRef);

    return () => {
      ctx.revert();
      if (reqIdRef.current !== null) {
        cancelAnimationFrame(reqIdRef.current);
      }
    };
  }, [product.id]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-transparent">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.4)_0%,rgba(10,10,10,1)_70%)] opacity-80 mix-blend-screen transition-all duration-1000 z-0"></div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-10 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] opacity-90 transition-opacity duration-1000"
        />

        <div className="absolute inset-0 z-20 w-full pointer-events-none">
          <div 
            ref={text1Ref}
            className="absolute top-1/2 -translate-y-1/2 w-full md:w-[45%] lg:w-[40%] px-12 md:px-24 flex flex-col justify-center text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-left left-0" 
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-snug">
              {textData.leftTitle}
            </h2>
            <p className="text-base md:text-lg font-light tracking-wide leading-relaxed opacity-70">
              {textData.leftDesc}
            </p>
          </div>

          <div 
            ref={text2Ref}
            className="absolute top-1/2 -translate-y-1/2 w-full md:w-[45%] lg:w-[40%] px-12 md:px-24 flex flex-col justify-center text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-right right-0" 
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-snug">
              {textData.rightTitle}
            </h2>
            <p className="text-base md:text-lg font-light tracking-wide leading-relaxed opacity-70">
              {textData.rightDesc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
