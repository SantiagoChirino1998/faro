import React from 'react';

export default function BottomNavBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'busqueda', label: 'Búsqueda', icon: 'search_check' },
    { id: 'alertas', label: 'Alertas', icon: 'notifications' },
    { id: 'info', label: 'Información', icon: 'info' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-[#2f3133] border-t border-white/10 shadow-xl rounded-t-xl h-16 flex justify-around items-center px-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-100 active:scale-95 ${
              isActive
                ? 'bg-[#fecb00] text-[#241a00] rounded-full px-4 py-1 font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="font-label-sm text-[10px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
