import React from 'react';

export const EventList = ({ eventos, activeIdx, onSelectEvent, onDeleteEvent }) => {
  
  const calcularDiasRestantes = (ts) => {
    const now = Date.now();
    const diff = Math.max(0, Number(ts) - now); 
    return Math.floor(diff / 86400000);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[480px]">
      {eventos.map((ev, i) => {
        const esActivo = activeIdx === i;
        
        return (
          <div 
            key={ev.id || i}
            onClick={() => onSelectEvent(i)} 
            className={`
              group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-pointer border transition-all duration-150 bg-neutral-800/40
              ${esActivo 
                ? 'border-solid shadow-sm' 
                : 'border-neutral-800 hover:border-neutral-700'
              }
            `}
            style={esActivo ? { borderColor: ev.color } : {}}
          >
            <span 
              className="w-2 h-2 rounded-full flex-shrink-0" 
              style={{ backgroundColor: ev.color }}
            ></span>
            
            <span className="text-sm font-medium text-neutral-200 flex-1 font-sans">
              {ev.name}
            </span>
            
            <span className="font-mono text-xs text-neutral-400 mr-1">
              {calcularDiasRestantes(ev.ts)} días
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if(confirm(`¿Seguro querés borrar "${ev.name}"?`)) {
                  onDeleteEvent(ev.id, i);
                }
              }}
              className="text-neutral-500 hover:text-red-400 p-1 rounded-md transition-colors duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
              title="Borrar evento"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
};