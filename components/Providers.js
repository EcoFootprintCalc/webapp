"use client"

import {createContext, useContext, useState} from "react";
import {HeroUIProvider, ToastProvider} from "@heroui/react";

export const UIProviders = ({children}) => {
    return (
        <HeroUIProvider>
            <ToastProvider/>
            {children}
        </HeroUIProvider>
    );
}

const UserContext = createContext({
    footprint: 0
});

export const UserProvider = ({user, sum, children}) => {
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