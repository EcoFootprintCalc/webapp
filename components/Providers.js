"use client"

import {HeroUIProvider, ToastProvider} from "@heroui/react";
import {createContext, useContext, useState} from "react";
import Image from "next/image";

const Providers = ({user, children}) => {
    return (
        <HeroUIProvider>
            <ToastProvider/>
            <LightProvider>
                <UserProvider user={user}>
                    {children}
                </UserProvider>
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
                        <Image alt="flash" src={"/flash.gif"} width={500} height={500} unoptimized/>
                    </div>
                    <div className="fixed inset-0 bg-white z-[9999] animate-fade-in"/>
                </>
            }
            {children}
        </LightContext.Provider>
    )
}

const UserContext = createContext({
    footprint: 0, addFootprint: () => {
    }
});
const UserProvider = ({user, children}) => {
    const [userData, setUserData] = useState(user);
    const [footprint, setFootprint] = useState(0);

    const addFootprint = (value) => {
        setFootprint(footprint + value);
    }

    return (
        <UserContext.Provider value={{footprint, addFootprint, userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useCalculator = () => {
    return useContext(UserContext);
}

export const useUser = () => {
    const ctx = useContext(UserContext);
    return {...ctx.userData, set: ctx.setUserData};
}

export const useFootprint = () => {
    const ctx = useContext(UserContext);
    return ctx.footprint;
}


export default Providers;