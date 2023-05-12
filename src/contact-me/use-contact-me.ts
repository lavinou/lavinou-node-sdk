import { useState } from "react"
import { useLavinouOptions } from "../core/context"
import { LavinouOptions } from "../core/model"

export interface ContactMe {
    email: string
    first_name: string
    last_name: string
    subject: string
    summary: string
}

export interface ContacMeReponse {
    id: string 
    email: string
    first_name: string
    last_name: string
    subject: string
    summary: string
    created_at: string
    project: string
}

interface ContactMeHook {
    data: ContacMeReponse | null
    contactMe: (payload: ContactMe) => void
}

export const useContactMe = (): ContactMeHook => {
    const {baseUrl, apiKey} = useLavinouOptions()
    const [data, setValue] = useState<ContacMeReponse | null>(null)

    const contactMe = (payload: ContactMe) => {
        fetch(`${baseUrl}/contactme/new/`,{
            method: 'POST',
            headers: {
                'Authorization': `Api-Key ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((res)=>res.json())
        .then((data)=>setValue(data))
    }

    return {
        data,
        contactMe
    }
}

export const contactMe = async (payload: ContactMe, {baseUrl, apiKey}: LavinouOptions): Promise<ContacMeReponse> => {
    return fetch(`${baseUrl}/contactme/new/`,{
        method: 'POST',
        headers: {
            'Authorization': `Api-Key ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((res)=>res.json())
}