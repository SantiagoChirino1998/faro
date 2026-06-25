import React from 'react';
import TopAppBar from './TopAppBar';
import BottomNavBar from './BottomNavBar';

export default function PublicLayout({
  children,
  search,
  setSearch,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="bg-[#004a99] text-white min-h-screen flex flex-col font-montserrat">
      {/* Top Header */}
      <TopAppBar search={search} setSearch={setSearch} />

      {/* Main Content Area */}
      <main className="pt-16 pb-20 flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="w-full bg-black/30 text-white/70 text-xs flex flex-col items-center py-8 px-4 text-center gap-4 border-t border-white/10 mb-16 shrink-0">
        <h2 className="text-lg text-[#fecb00] font-bold uppercase tracking-wide">
          Faro de Venezuela
        </h2>
        <p>© 2026 Faro de Venezuela. Plataforma de búsqueda.</p>
      </footer>

      {/* Bottom Nav Bar */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
