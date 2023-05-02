import React, { useContext, createContext } from "react";
import { LavinouOptions } from "../model/LavinouOptions";


const LavinouContext = createContext<LavinouOptions>({
    baseUrl: "",
    apiKey: ""
})

interface LavinouProviderProps {
    children: React.ReactNode,
    options: LavinouOptions
}


export const LavinouProvider = ({children, options}: LavinouProviderProps) => {
    return <LavinouContext.Provider value={options}>
        {children}
    </LavinouContext.Provider>
}



export const useLavinouOptions = (): LavinouOptions => {
    return useContext(LavinouContext)
}