import { useState } from 'react'
import { useLavinouOptions } from '../core/context'
import { LavinouOptions } from '../core/model'

interface EmailSubscription {
    id: string
    type: string
    value: string
    created_at: string
    project: string
}

interface EmailSubscriberResponse {
    data: EmailSubscription | null
    subscribe: (email: string) => void
}

export const useEmailSubscriber = (): EmailSubscriberResponse => {
    const {baseUrl, apiKey} = useLavinouOptions()
    const [data, setValue ] = useState<EmailSubscription | null>(null)

    const subscribe = (email: string) => {
        fetch(`${baseUrl}/subscriptions/new/`,{
            method: 'POST',
            headers: {
                'Authorization': `Api-Key ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: "EMAIL",
                value: email
            })
        }).then((res)=>res.json())
        .then((data)=>setValue(data))
    }
    
    return {
        data,
        subscribe
    }
}

export const emailSubscribe = async (email: string, {baseUrl, apiKey}: LavinouOptions): Promise<EmailSubscriberResponse> => {
    return fetch(`${baseUrl}/subscriptions/new/`,{
        method: 'POST',
        headers: {
            'Authorization': `Api-Key ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: "EMAIL",
            value: email
        })
    }).then((res)=>res.json())
}