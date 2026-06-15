import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Importamos el cliente
import { useCountdown } from './hooks/useCountdown';
import { CountdownDisplay } from './components/CountdownDisplay';
import { ProgressBar } from './components/ProgressBar';
import { EventList } from './components/EventList';
import { AddEventModal } from './components/AddEventModal';

function App() {
  const [eventos, setEventos] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const traerEventos = async () => {
      const { data, error } = await supabase
        .from('eventos_compartidos')
        .select('*')
        .order('ts', { ascending: true });

      if (!error && data) {
        setEventos(data);
      }
      setLoading(false);
    };

    traerEventos();
  }, []);

  const eventoActivo = eventos[activeIdx] || { 
    ts: new Date('2026-12-25T00:00:00').getTime(), 
    name: 'Cargando...', 
    date: '-', 
    color: '#534AB7' 
  };
  
  const { tiempo, progresoAnio } = useCountdown(eventoActivo.ts);

  const handleAddEvent = async (nuevoEvento) => {
    const { data, error } = await supabase
      .from('eventos_compartidos')
      .insert([
        { 
          name: nuevoEvento.name, 
          ts: nuevoEvento.ts, 
          date: nuevoEvento.date, 
          color: nuevoEvento.color 
        }
      ])
      .select();

    if (!error && data) {
      const listaActualizada = [...eventos, data[0]];
      setEventos(listaActualizada);
      setActiveIdx(listaActualizada.length - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-sans">
        <p className="text-sm font-mono animate-pulse">Conectando con Supabase gratis...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-8 py-8 px-4 font-sans">
        
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
            Panel Global Compartido
          </p>
          <h1 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            {eventoActivo.name}
          </h1>
          <p className="text-sm font-mono text-neutral-400 mt-1">
            {eventoActivo.date}
          </p>
        </div>

        <CountdownDisplay tiempo={tiempo} />
        <ProgressBar porcentaje={progresoAnio} color={eventoActivo.color} />
        
        {eventos.length > 0 ? (
          <EventList eventos={eventos} activeIdx={activeIdx} onSelectEvent={setActiveIdx} />
        ) : (
          <p className="text-xs font-mono text-neutral-500 my-4 text-center">No hay eventos. ¡Agregá el primero!</p>
        )}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-[480px] mt-2 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold text-sm rounded-xl transition-all duration-150 flex justify-center items-center gap-1 shadow-sm cursor-pointer"
        >
          Agregar evento <span className="font-mono text-xs">↗</span>
        </button>
      </div>

      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddEvent={handleAddEvent} />
    </div>
  );
}

export default App;