"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductBottleScroll } from "@/components/ProductBottleScroll";
import { ProductSwitcher } from "@/components/ProductSwitcher";
import { Testimonials } from "@/components/Testimonials";
import { products } from "@/data/products";
import { ChevronRight } from "lucide-react";

export default function Home() {
  const [activeProductId, setActiveProductId] = useState(products[0].id);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Disable automatic scroll restoration
      window.history.scrollRestoration = "manual";
      // 2. Force scroll to top on load
      window.scrollTo(0, 0);
    }
  }, []);

  const handleProductSelect = (id: string) => {
    // 3. VARIANT SWITCH RESET (VERY IMPORTANT)
    // Smooth reset scroll to top before changing product
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveProductId(id);
  };
  
  const activeProduct = products.find(p => p.id === activeProductId) || products[0];
  const nextProductIndex = (products.findIndex(p => p.id === activeProductId) + 1) % products.length;
  const nextProduct = products[nextProductIndex];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-1000">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full flex flex-col"
        >
          {/* Main Hero Showcase (scroll animated) */}
          <ProductBottleScroll product={activeProduct} />

          {/* Details Section */}
          <section className="min-h-screen flex flex-col justify-center px-8 max-w-7xl mx-auto py-32 z-20 relative">
            
            {/* Title & Description */}
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter w-full uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pb-2">
              {activeProduct.name}
            </h2>
            <p className="text-xl md:text-3xl text-white/50 tracking-wide font-light mb-12">
              {activeProduct.subtitle}
            </p>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-16">
              {activeProduct.description}
            </p>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12 mb-16"></div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
              {/* Olfactory Notes */}
              <div>
                <h3 className="text-xl md:text-2xl uppercase tracking-widest font-bold mb-8 text-white/90">Olfactory Notes</h3>
                <ul className="space-y-4">
                  {activeProduct.notes.map((note, idx) => (
                    <li key={idx} className="flex items-center space-x-4 border-b border-white/5 pb-4">
                      <span className="text-white/30 text-sm">0{idx + 1}</span>
                      <span className="text-xl font-light tracking-wide">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-xl md:text-2xl uppercase tracking-widest font-bold mb-8 text-white/90">Performance</h3>
                <div className="space-y-8">
                  {Object.entries(activeProduct.performance).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/50 uppercase tracking-widest text-xs md:text-sm">{key}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-white/50 to-white" 
                          initial={{ width: 0 }}
                          whileInView={{ width: key === 'longevity' ? '90%' : key === 'sillage' ? '85%' : '80%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="mt-40 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-br from-white/[0.04] to-transparent rounded-[2.5rem] p-8 md:p-14 border border-white/[0.05] backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2),inset_0_1px_rgba(255,255,255,0.05)] transition-all duration-500 ease-in-out group relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 rounded-[2.5rem]"></div>
              
              <div className="relative z-10 text-center sm:text-left">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-white/95">{activeProduct.name}</h3>
                <p className="text-lg text-white/50 tracking-wide mb-8 sm:mb-0 font-light">Secure your signature scent today.</p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <span className="text-3xl font-light text-white/80">${activeProduct.price}</span>
                <button className="px-10 py-4 bg-gradient-to-r from-white to-white/90 text-black font-semibold uppercase tracking-widest text-sm rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.3)] transition-all duration-300 ease-out hover:scale-[1.04] active:scale-95">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Next Product Button */}
            <div className="mt-48 flex justify-center text-center relative z-20">
              <button 
                onClick={() => handleProductSelect(nextProduct.id)}
                className="group flex flex-col items-center gap-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer border-none bg-transparent"
              >
                <span className="text-white/40 uppercase tracking-widest text-xs md:text-sm group-hover:text-white/80 transition-colors duration-300">
                  Next Experience
                </span>
                <span className="text-4xl md:text-6xl font-bold italic tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {nextProduct.name}
                </span>
                <ChevronRight className="w-10 h-10 text-white/40 group-hover:text-white transition-colors duration-500 mt-4 group-hover:translate-x-2" />
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </section>

          {/* Testimonials */}
          <Testimonials />

          {/* Footer */}
          <Footer />

        </motion.div>
      </AnimatePresence>

      <ProductSwitcher 
        activeProductId={activeProductId} 
        onSelectProduct={handleProductSelect} 
      />
    </main>
  );
}
