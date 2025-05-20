"use client"

import {createContext, useContext, useState} from "react";
import Image from "next/image";
import {HeroUIProvider, ToastProvider} from "@heroui/react";

export const UIProviders = ({children}) => {
    return (
        <HeroUIProvider>
            <ToastProvider/>
            {children}
        </HeroUIProvider>
    );
}

const Providers = ({user, footprint, children}) => {
    return (
        <LightProvider>
            <UserProvider user={user} sum={footprint}>
                {children}
            </UserProvider>
        </LightProvider>
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
const UserProvider = ({user, sum, children}) => {
    const [userData, setUserData] = useState(user);
    const [footprint, setFootprint] = useState(sum);

    return (
        <UserContext.Provider value={{footprint, setFootprint, userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useCalculator = () => {
    const ctx = useContext(UserContext);
    return {footprint: ctx.footprint, setFootprint: ctx.setFootprint};
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