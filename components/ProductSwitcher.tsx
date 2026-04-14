"use client";

import { motion } from "framer-motion";

interface ProductSwitcherProps {
  activeProductId: string;
  onSelectProduct: (id: string) => void;
}

export function ProductSwitcher({ activeProductId, onSelectProduct }: ProductSwitcherProps) {
  const products = [
    { id: "nox", name: "NOX" },
    { id: "ocean-mist", name: "Ocean Mist" },
    { id: "rose-elxir", name: "Rose Élxir" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative">
        {products.map((product) => {
          const isActive = activeProductId === product.id;

          return (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              className={`relative px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 ease-out flex items-center gap-2 ${
                isActive ? "text-black" : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{product.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
