import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerMissingSchema } from '../../validations/missing';
import { registerMissing } from '../../services/missingService';

export default function RegistroDesaparecidoPage() {
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerMissingSchema),
  });

  const onSubmit = async (data) => {
    setEnviando(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    if (foto) {
      formData.append('foto', foto);
    }

    try {
      await registerMissing(formData);
      toast.success('Registro completado exitosamente.');
      reset();
      setFoto(null);
      setPreview(null);
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al procesar el registro.';
      toast.error(msg);
    } finally {
      setEnviando(false);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low font-montserrat flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-surface p-8 rounded-2xl shadow-lg border border-outline-variant/30">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <span className="w-12 h-2 bg-[#FCE300] rounded-l-full"></span>
            <span className="w-12 h-2 bg-[#0033A0]"></span>
            <span className="w-12 h-2 bg-[#CE1126] rounded-r-full"></span>
          </div>
          <h1 className="text-display-lg text-primary flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-4xl fill-icon">lightbulb</span>
            Faro de Venezuela
          </h1>
          <p className="mt-2 text-body-lg text-on-surface-variant">
            Registro público de personas desaparecidas
          </p>
          <p className="mt-1 text-body-sm text-on-surface-variant max-w-md mx-auto">
            Ayúdanos a encontrar a los afectados. Por favor proporciona la mayor cantidad de información posible.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Completo */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-label-lg text-on-surface mb-1">
                Nombre Completo <span className="text-error">*</span>
              </label>
              <input
                {...register('nombreCompleto')}
                className={`w-full px-4 py-2 bg-surface-container-highest border ${
                  errors.nombreCompleto ? 'border-error' : 'border-outline-variant'
                } rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                placeholder="Ej. Juan Pérez"
              />
              {errors.nombreCompleto && (
                <p className="mt-1 text-label-sm text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {errors.nombreCompleto.message}
                </p>
              )}
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-label-lg text-on-surface mb-1">
                Sexo <span className="text-error">*</span>
              </label>
              <select
                {...register('sexo')}
                className={`w-full px-4 py-2 bg-surface-container-highest border ${
                  errors.sexo ? 'border-error' : 'border-outline-variant'
                } rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
              >
                <option value="">Seleccione</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.sexo && (
                <p className="mt-1 text-label-sm text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {errors.sexo.message}
                </p>
              )}
            </div>

            {/* Edad */}
            <div>
              <label className="block text-label-lg text-on-surface mb-1">
                Edad Aproximada <span className="text-error">*</span>
              </label>
              <input
                type="number"
                {...register('edad')}
                className={`w-full px-4 py-2 bg-surface-container-highest border ${
                  errors.edad ? 'border-error' : 'border-outline-variant'
                } rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                placeholder="Ej. 35"
              />
              {errors.edad && (
                <p className="mt-1 text-label-sm text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {errors.edad.message}
                </p>
              )}
            </div>

            {/* Última Ubicación */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-label-lg text-on-surface mb-1">
                Última Ubicación Conocida <span className="text-error">*</span>
              </label>
              <input
                {...register('ultimaUbicacion')}
                className={`w-full px-4 py-2 bg-surface-container-highest border ${
                  errors.ultimaUbicacion ? 'border-error' : 'border-outline-variant'
                } rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                placeholder="Ej. Calle 4, Sector Centro, Ciudad"
              />
              {errors.ultimaUbicacion && (
                <p className="mt-1 text-label-sm text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {errors.ultimaUbicacion.message}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-label-lg text-on-surface mb-1">
                Teléfono de Contacto <span className="text-error">*</span>
              </label>
              <input
                {...register('telefonoContacto')}
                className={`w-full px-4 py-2 bg-surface-container-highest border ${
                  errors.telefonoContacto ? 'border-error' : 'border-outline-variant'
                } rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
                placeholder="Ej. +58 412 1234567"
              />
              <p className="mt-1 text-xs text-on-surface-variant">Para que los rescatistas puedan contactarte.</p>
              {errors.telefonoContacto && (
                <p className="mt-1 text-label-sm text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {errors.telefonoContacto.message}
                </p>
              )}
            </div>

            {/* Rasgos Particulares */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-label-lg text-on-surface mb-1">
                Rasgos Particulares (Opcional)
              </label>
              <textarea
                {...register('rasgosParticulares')}
                rows="3"
                className={`w-full px-4 py-2 bg-surface-container-highest border ${
                  errors.rasgosParticulares ? 'border-error' : 'border-outline-variant'
                } rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none`}
                placeholder="Tatuajes, cicatrices, vestimenta al momento de desaparecer, etc."
              ></textarea>
              {errors.rasgosParticulares && (
                <p className="mt-1 text-label-sm text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {errors.rasgosParticulares.message}
                </p>
              )}
            </div>

            {/* Foto */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-label-lg text-on-surface mb-1">
                Foto Reciente (Opcional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-outline-variant border-dashed rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                <div className="space-y-1 text-center">
                  {!preview ? (
                    <>
                      <span className="material-symbols-outlined text-4xl text-outline mb-2">add_a_photo</span>
                      <div className="flex text-sm text-on-surface-variant justify-center">
                        <label
                          htmlFor="foto-upload"
                          className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-primary-container focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                        >
                          <span>Subir un archivo</span>
                          <input
                            id="foto-upload"
                            name="foto-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFotoChange}
                          />
                        </label>
                        <p className="pl-1">o arrastrar y soltar</p>
                      </div>
                      <p className="text-xs text-outline">PNG, JPG, WEBP hasta 5MB</p>
                    </>
                  ) : (
                    <div className="relative inline-block">
                      <img src={preview} alt="Previsualización" className="h-48 w-auto object-cover rounded-lg shadow-sm" />
                      <button
                        type="button"
                        onClick={() => { setFoto(null); setPreview(null); }}
                        className="absolute -top-2 -right-2 bg-error text-on-error rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-error/90 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/30">
            <button
              type="submit"
              disabled={enviando}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-label-lg text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-colors"
            >
              {enviando ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Registrando...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined fill-icon">send</span>
                  Registrar Desaparecido
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
