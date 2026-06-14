import React, {useEffect,useRef} from "react";

export const CountdownDisplay = ({tiempo})=>{
    const {days, hours, mins, secs} = tiempo;

    //referencias para los bloques animados 
    const secsRef = useRef(null);
    const minsRef = useRef(null);

    const dispararTick = (elemento)=>{
        if(!elemento) return;

        elemento.classList.add('scale-108', 'transition-transform', 'duration-150');

        setTimeout(()=>{
            elemento.classList.remove('scale-108');
        },150);
    };

    useEffect(()=>{
        dispararTick(minsRef.current)
    },[mins]);

    return(
        <div className="grid grid-cols-4 gap-3 w-full max-w-[480px]">
            {/*bloque de los dias*/}
            <div className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pt-5 pb-4 px-3 flex flex-col items-center gap-1.5">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#534AB7]"></div>
                <span className="font-mono text-3xl font-bold leading-none text-neutral-800 dark:text-neutral-100">
                    {days}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-sans">
                    dias
                </span>
            </div>
            {/*bloque de horas*/}
            <div className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pt-5 pb-4 px-3 flex flex-col items-center gap-1.5">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1D9E75]"></div>
                <span className="font-mono text-3xl font-bold leading-none text-neutral-800 dark:text-neutral-100">
                    {hours}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-sans">
                    horas
                </span>
            </div>
            {/*Bloque de minutos*/}
            <div className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pt-5 pb-4 px-3 flex flex-col items-center gap-1.5">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg[#D85A30]"></div>
                <span ref={minsRef} className="font-mono text-3xl font-bold leading-none text-neutral-800 dark:text-neutral-100 will-change-transform">
                    {mins}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-sans">min</span>
            </div>
            {/*bloque de segundos*/}
            <div className="relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pt-5 px-3 flex flex-col items-center gap-1.5">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D4537E]"></div>
                    <span ref ={secsRef} className="font-mono text-3xl font-bold leading-none text-neutral-800 dark:text-neutral-100 will-change-transform">
                        {secs}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-sans">segs</span>
            </div>
        </div>
    )
}