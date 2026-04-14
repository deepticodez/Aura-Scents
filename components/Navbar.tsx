import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-transparent border-b border-white/5">
      <Link href="/" className="text-xl font-bold tracking-widest uppercase text-white">
        Aura Scents
      </Link>
      <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors uppercase text-xs tracking-wider text-white">
        Explore Collection
      </button>
    </nav>
  );
}
