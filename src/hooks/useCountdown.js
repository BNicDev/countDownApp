import { useState, useEffect } from 'react';


export const useCountdown = (targetTimestamp) => {
  const [tiempo, setTiempo] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
  const [progresoAnio, setProgresoAnio] = useState(0);

  const pad = (n) => String(n).padStart(2, '0');

  useEffect(() => {
    const actualizarContador = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTimestamp - now);

      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000) / 60000);
      const secs  = Math.floor((diff % 60000) / 1000);

      setTiempo({
        days: pad(days),
        hours: pad(hours),
        mins: pad(mins),
        secs: pad(secs)
      });

   
      const anioActual = new Date().getFullYear();
      const yearStart = new Date(anioActual, 0, 1).getTime(); 
      const yearEnd   = new Date(anioActual + 1, 0, 1).getTime(); 
      
      const pct = Math.round(((now - yearStart) / (yearEnd - yearStart)) * 100);
      setProgresoAnio(pct);
    };

    actualizarContador();
    const intervalo = setInterval(actualizarContador, 1000);

   
    return () => clearInterval(intervalo);

  }, [targetTimestamp]);

  return { tiempo, progresoAnio };
};