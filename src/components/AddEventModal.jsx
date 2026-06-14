import React, { useState } from 'react';

export const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [name, setName] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [color, setColor] = useState('#534AB7');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !dateStr) {
      alert('Por favor, completá todos los campos.');
      return;
    }

    const targetDate = new Date(`${dateStr}T00:00:00`);
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateFormatted = targetDate.toLocaleDateString('es-AR', opciones);

    onAddEvent({
      id: Date.now(),
      name,
      ts: targetDate.getTime(),
      date: dateFormatted,
      color
    });

    setName('');
    setDateStr('');
    setColor('#534AB7');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 w-full max-w-[400px] shadow-xl font-sans" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          Nuevo Evento
        </h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
              Nombre del Evento:
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Ej: 🍕 Fin de cursada" 
              className="px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-mono text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-400"
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
              Fecha Target:
            </label>
            <input 
              type="date" 
              value={dateStr} 
              onChange={(e) => setDateStr(e.target.value)} 
              className="px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-mono text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-400"
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
              Color Distintivo:
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)} 
                className="w-10 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-neutral-400 uppercase">{color}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#534AB7] hover:bg-[#433a9c] text-white text-sm font-bold rounded-xl shadow-md transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};