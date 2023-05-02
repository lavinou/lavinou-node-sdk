import React, { useState, useContext, createContext, useEffect } from "react";
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

    const [value, setValue] = useState<LavinouOptions>(options)

    useEffect(()=>{
        setValue(options)
    },[options])

    return <LavinouContext.Provider value={value}>
        {children}
    </LavinouContext.Provider>
}



export const useLavinouOptions = (): LavinouOptions => {
    return useContext(LavinouContext)
}