import React from "react";

//recibimos el pocentaje de la barra y el color por parametro

export const ProgressBar = ({porcentaje, color}) =>{
    return(
        <div className="w-full max-w-[480px]">
            /* track: fondo de la barra*/
            <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                /*fill: la barra dinamica de progreso*/
                <div className="h-full rounded-full transition-all duration-1000 ease-linear" style={{width:`${porcentaje}`, backgroundColor: color}}></div>
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-neutral-400 font-mono">
                <span>Progreso del año</span>
                <span>{porcentaje}%</span>
            </div>
        </div>
    )
}