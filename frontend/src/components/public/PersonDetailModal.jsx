import React from 'react';

export default function PersonDetailModal({ person, onClose }) {
  if (!person) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#00346f]/95 border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-10 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header/Image Area */}
        <div className="relative h-60 bg-gradient-to-b from-transparent to-black/80 flex items-end justify-center overflow-hidden">
          {person.fotoUrl ? (
            <img
              src={person.fotoUrl}
              alt={person.nombreCompleto}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#004a99] flex flex-col items-center justify-center text-white/40">
              <span className="material-symbols-outlined text-7xl">person</span>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-md ${
                person.estado === 'ENCONTRADO'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {person.estado === 'ENCONTRADO' ? 'Encontrado' : 'Desaparecido'}
            </span>
          </div>

          <div className="relative z-10 p-4 text-center w-full bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-xl sm:text-2xl font-bold font-montserrat text-white">
              {person.nombreCompleto}
            </h3>
            <p className="text-sm text-[#fecb00] font-semibold mt-1">
              {person.edad} años • Sexo: {person.sexo === 'M' ? 'Masculino' : person.sexo === 'F' ? 'Femenino' : 'Otro'}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
          {/* Last Location */}
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-[#fecb00] shrink-0">location_on</span>
            <div>
              <h5 className="text-xs text-white/50 uppercase font-semibold">Última Ubicación</h5>
              <p className="text-sm text-white/90">{person.ultimaUbicacion}</p>
            </div>
          </div>

          {/* Contact Phone */}
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-[#fecb00] shrink-0">call</span>
            <div>
              <h5 className="text-xs text-white/50 uppercase font-semibold">Teléfono de Contacto</h5>
              <a
                href={`tel:${person.telefonoContacto}`}
                className="text-sm text-white hover:text-[#fecb00] font-bold underline flex items-center gap-1"
              >
                {person.telefonoContacto}
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>

          {/* Particular Features */}
          {person.rasgosParticulares && (
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-[#fecb00] shrink-0">visibility</span>
              <div>
                <h5 className="text-xs text-white/50 uppercase font-semibold">Rasgos Particulares</h5>
                <p className="text-sm text-white/90 whitespace-pre-wrap">
                  {person.rasgosParticulares}
                </p>
              </div>
            </div>
          )}

          {/* Date Registered */}
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-[#fecb00] shrink-0">calendar_month</span>
            <div>
              <h5 className="text-xs text-white/50 uppercase font-semibold">Fecha de Registro</h5>
              <p className="text-sm text-white/90">
                {new Date(person.fechaRegistro).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Area with Call button */}
        <div className="p-4 border-t border-white/10 bg-[#002d60] flex gap-2">
          <a
            href={`tel:${person.telefonoContacto}`}
            className="w-full bg-[#fecb00] text-[#6e5700] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ffe08b] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">call</span>
            Llamar a Familiar
          </a>
        </div>
      </div>
    </div>
  );
}
