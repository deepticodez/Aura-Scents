export function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-white py-16 px-8 border-t border-white/10 mt-auto relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold tracking-widest uppercase mb-4">Aura Scents</h3>
          <p className="text-white/50 text-sm">Luxury redefined through the essence of nature and emotion.</p>
        </div>
        <div>
          <h4 className="font-semibold uppercase tracking-wider mb-4 text-sm">Shop</h4>
          <ul className="space-y-2 text-white/50 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">NOX</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Ocean Mist</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Rose Élxir</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold uppercase tracking-wider mb-4 text-sm">Explore</h4>
          <ul className="space-y-2 text-white/50 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Craftsmanship</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold uppercase tracking-wider mb-4 text-sm">Newsletter</h4>
          <p className="text-white/50 text-sm mb-4">Subscribe for exclusive access to new releases.</p>
          <div className="flex">
            <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/30 w-full rounded-l-lg" />
            <button className="bg-white text-black px-4 py-2 text-sm font-semibold rounded-r-lg hover:bg-white/90 transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40 text-xs">
        <p>© 2026 Aura Scents. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
