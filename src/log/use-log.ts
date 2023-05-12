import { useState } from "react";
import { useLavinouOptions } from "../core/context";
import { LavinouOptions } from "../core/model";

export interface Log {
    project: string
    data: Object
    environment: string
    type: string
    level: string
}

export interface LogResponse {
    id: string
    project: string 
    data: Object
    created_at: string
}

export interface LogAction {
    value: LogResponse | null,
    log: (log: Log) => void
}

export const useLog = (): LogAction => {
    const {baseUrl, apiKey, debug} = useLavinouOptions()
    const [value, setValue] = useState<LogResponse | null>(null)

    const log = (log: Log) => {
        log.environment = debug ? "DEBUG" : "PROD"
        fetch(`${baseUrl}/logs/`,{
            method: 'POST',
            headers: {
                'Authorization': `Api-Key ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(log)
        }).then((res)=>res.json())
        .then((data)=>setValue(data))
    }

    return {
        value,
        log
    }

}

export const log = async (log: Log, {baseUrl, apiKey}: LavinouOptions): Promise<LogResponse> => {
    return fetch(`${baseUrl}/logs/`,{
        method: 'POST',
        headers: {
            'Authorization': `Api-Key ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(log)
    }).then((res)=>res.json())
}