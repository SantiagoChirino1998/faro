import React from 'react';

export default function PersonCard({ person, onClick }) {
  return (
    <div
      onClick={onClick}
      className="glass-card p-4 rounded-xl flex items-center gap-4 active:bg-white/20 transition-all cursor-pointer hover:border-white/40"
    >
      <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/10 shadow-inner">
        {person.fotoUrl ? (
          <img
            src={person.fotoUrl}
            alt={person.nombreCompleto}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="material-symbols-outlined text-3xl opacity-50 text-white">person</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-white font-montserrat truncate text-base">
          {person.nombreCompleto}
        </h4>
        <div className="flex items-center gap-1 text-white/70 text-sm mt-1">
          <span className="material-symbols-outlined text-xs shrink-0">location_on</span>
          <span className="truncate">{person.ultimaUbicacion}</span>
        </div>
      </div>

      <span className="material-symbols-outlined text-white/40 shrink-0">chevron_right</span>
    </div>
  );
}
