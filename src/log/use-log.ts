import { useState } from "react";
import { useLavinouOptions } from "../core/context";

interface Log {
    project: string,
    data: Object
}

interface LogResponse {
    id: string
    project: string 
    data: Object
    created_at: string
}

interface LogHook {
    value: LogResponse | null,
    log: (log: Log) => void
}

export const useLog = (): LogHook => {
    const {baseUrl, apiKey} = useLavinouOptions()
    const [value, setValue] = useState<LogResponse | null>(null)

    const log = (log: Log) => {
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