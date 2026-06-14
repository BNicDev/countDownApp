import React, { useState } from 'react';
import { useCountdown } from './hooks/useCountdown';
import { CountdownDisplay } from './components/CountdownDisplay';
import { ProgressBar } from './components/ProgressBar';
import { EventList } from './components/EventList';
import { AddEventModal } from './components/AddEventModal';

const EVENTOS_INICIALES = [
  { 
    id: 1, 
    ts: new Date('2026-12-25T00:00:00').getTime(), 
    name: '🎄 Navidad 2026', 
    date: '25 dic 2026', 
    color: '#534AB7' 
  },
  { 
    id: 2, 
    ts: new Date('2027-01-01T00:00:00').getTime(), 
    name: '🎆 Año Nuevo 2027', 
    date: '1 ene 2027', 
    color: '#1D9E75' 
  },
  { 
    id: 3, 
    ts: new Date('2027-06-21T00:00:00').getTime(), 
    name: '☀️ Solsticio de invierno 2027', 
    date: '21 jun 2027', 
    color: '#D85A30' 
  }
];

function App() {
  const [eventos, setEventos] = useState(EVENTOS_INICIALES);
  
  const [activeIdx, setActiveIdx] = useState(0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventoActivo = eventos[activeIdx] || eventos[0];
  
  const { tiempo, progresoAnio } = useCountdown(eventoActivo.ts);

  const handleAddEvent = (nuevoEvento) => {
    setEventos([...eventos, nuevoEvento]);
    setActiveIdx(eventos.length);
  };

  return (
    
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 antialiased">
    <div className="w-full max-w-[480px] flex flex-col items-center gap-8 py-8 px-4">
      
     
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-1.5">
          Próximo evento
        </p>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          {eventoActivo.name}
        </h1>
        <p className="text-sm font-mono text-gray-400 mt-1">
          {eventoActivo.date}
        </p>
      </div>

       
        <CountdownDisplay tiempo={tiempo} />

      
        <ProgressBar porcentaje={progresoAnio} color={eventoActivo.color} />

    
        <EventList 
          eventos={eventos} 
          activeIdx={activeIdx} 
          onSelectEvent={setActiveIdx} 
        />

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-[480px] mt-2 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-sm rounded-xl transition-all duration-150 flex justify-center items-center gap-1 shadow-sm active:scale-[0.98]"
        >
          Agregar evento <span className="font-mono text-xs">↗</span>
        </button>

      </div>

      <AddEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddEvent={handleAddEvent}
      />
      
    </div>
  );
}

export default App;