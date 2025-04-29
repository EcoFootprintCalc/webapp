"use client"

import {HeroUIProvider, ToastProvider} from "@heroui/react";
import {createContext, useContext, useState} from "react";
import Image from "next/image";

const Providers = ({children}) => {
    return (
        <HeroUIProvider>
            <ToastProvider/>
            <LightProvider>
                <CalculationProvider>
                    {children}
                </CalculationProvider>
            </LightProvider>
        </HeroUIProvider>
    );
}

export const LightContext = createContext(null);
const LightProvider = ({children}) => {

    const [mode, setMode] = useState(false);

    return (
        <LightContext.Provider value={{mode, setMode}}>
            {mode &&
                <>
                    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9998]'>
                        <Image alt="caseoh" src={"/flash.gif"} width={500} height={500} unoptimized/>
                    </div>
                    <div className="fixed inset-0 bg-white z-[9999] animate-fade-in"/>
                </>
            }
            {children}
        </LightContext.Provider>
    )
}

const CalculationContext = createContext({
    footprint: 0, addFootprint: () => {
    }
});
const CalculationProvider = ({children}) => {
    const [footprint, setFootprint] = useState(0);

    const addFootprint = (value) => {
        setFootprint(footprint + value);
    }

    return (
        <CalculationContext.Provider value={{footprint, addFootprint}}>
            {children}
        </CalculationContext.Provider>
    )
}

export const useCalculator = () => {
    return useContext(CalculationContext);
}

export const useFootprint = () => {
    const ctx = useContext(CalculationContext);
    return ctx.footprint;
}


export default Providers;