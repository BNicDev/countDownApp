import React from "react";

export const EventList = ({eventos, activeIdx, onselectEvent})=>{
//calculamos los dias restantes de forma estatica

    const calcularDiasRestantes = (ts) =>{
        const now = Date.now();
        const diff = Math.max(0, ts - now);
        return Math.floor(diff/86400000);
    }
    return(
        <div className="flex flex-col gap-2 w-full max-w-[480px]">
            {eventos.map((ev,i)=>{
                const esActivo = activeIdx === i;
                return(
                    <div key = {ev.id || i} onClick={() => onselectEvent(i)} className={`flex items-center gap-2.5 padding px-3.5 py-2.5 rounded-xl cursor-pointer border transition-all duration-150 bg-white dark:bg-neutral-900 ${esActivo ? 'border-solid shadow-sm' :'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'}`}
                    style={esActivo?{borderColor: ev.color}:{}}>
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor: ev.color}}></span>
                        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex-1 font-sans">{ev.name}</span>
                        <span className ="font-mono text-xs text-neutral-400">{calcularDiasRestantes(ev.ts)} dias</span>
                    </div>

                )
            })}
        </div>
    )

}