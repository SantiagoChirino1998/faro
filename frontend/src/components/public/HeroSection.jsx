import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden bg-[#004a99]">
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-white rounded-full p-1 shadow-xl flex items-center justify-center">
          <img
            alt="Logo Faro de Venezuela"
            className="w-full h-full object-contain rounded-full"
            src="https://lh3.googleusercontent.com/aida/AP1WRLu0RF8GgyICxo0IuMI67lHfegyKXI4M9ioc2odzA7-_C2n1QM31W9brTy6AzIfnjzcJroaLhR4Cxl5DlrGK2pqyWASdngY3hApInuWBy8lpnvbCv_ifCjJr3BIgXESFgKVO9L_lMzDK1HzsqrM6UEzKj9q399cmm8qGtZDarGqXwS4JIO8wBaEinI7DtpgC5x9uhish5K5RW4QlsiAD_LPeou-vvLrT9LzyvSLshFmktwz99FOB_483oX8"
            onError={(e) => {
              // Fallback icon/source in case Google link expires
              e.target.src = 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/sample.jpg';
            }}
          />
        </div>
        
        <h2 className="font-headline-lg-mobile text-2xl sm:text-3xl text-white font-extrabold uppercase tracking-tighter leading-tight font-montserrat">
          Rastreo de Desaparecidos
        </h2>
        
        <button
          onClick={() => navigate('/registro')}
          className="mt-2 bg-[#fecb00] text-[#6e5700] px-8 py-4 font-bold rounded-xl shadow-lg active:scale-95 transition-transform hover:bg-[#ffe08b] flex items-center gap-2 font-montserrat text-sm"
        >
          <span className="material-symbols-outlined">person_add</span>
          REGISTRAR DESAPARECIDO
        </button>
      </div>
    </section>
  );
}
