import { useState } from "react";
import stringify from 'querystring'
import { OrderQuery } from "./model/OrderQuery";
import { FilterQuery } from "./model/FilterQuery";
import { PaginationQuery } from "./model/PaginationQuery";
import { ListParams } from "./model/ListParams";
import { UpdateData } from "./model/UpdateParams";
import { DefaultParams } from "./model/DefaultParams";
import { ListPage } from "./model/ListPage";

const getPaginationQuery = (pagination: PaginationQuery) => {
    return {
        page: pagination.page,
        page_size: pagination.per_page,
    };
};
  
const getFilterQuery = (filter: FilterQuery) => {
    const { q: search } = filter;
    return {
        search
    };
};

const getOrderingQuery = (sort: OrderQuery) => {
    const { field, order } = sort;
    return {
        ordering: `${order === 'ASC' ? '' : '-'}${field}`,
    };
};

export const generateHeader = (token: string) => {
    return {
        "Content-Type": "application/json",
        "Authorization": token === undefined ? "" : `Token ${token === null ? "" : token}`
    }
}

export interface ListAction<T> {
    isLoading: boolean
    data: ListPage<T>
    list: (params: ListParams) => void
}

export function useList<T>(token: string,resource: string): ListAction<T> {
    const [data, setData] = useState<ListPage<T>>({results: [], count: 0})
    const [isLoading, setIsLoading] = useState(false)
    const headers = generateHeader(token)

    const list = (params: ListParams) => {
        
        if (token !== undefined) {
            setIsLoading(true)
            const query = {
                ...getFilterQuery(params.filter),
                ...getPaginationQuery(params.pagination),
                ...getOrderingQuery(params.sort),
            };
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}/?${stringify.stringify(query)}`;
            fetch(url,{
                headers: headers
            }).then((res) => res.json())
            .then((data: {results: T[], count: number})=> {
                setIsLoading(false)
                setData({
                    results: data.results ? data.results : [],
                    count: data.count ? data.count : 0,
                })

            }).catch(()=> {
                setIsLoading(false)
            })
        }
    }

    return {
        isLoading,
        data,
        list
    }
}

export const useOne = <T>(token: string, resource: string) => {

    const [data, setData] = useState<T>()
    const headers = generateHeader(token)

    const get = (params: DefaultParams<null>) => {
        if (token !== undefined) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}/${params.id}/${params.sub_path ? params.sub_path : ""}`,{
                headers: headers
            }).then((res) => res.json())
            .then((data: T)=> {
                setData(data)
            })
        }
    }

    return {
        data,
        get
    }
}

export const useCreate = <T>(token: string, resource: string) => {
    const [data, setData] = useState<T | undefined>(undefined)
    const headers = generateHeader(token)
    
    const create = <Body>(body: Body) => {
        if (token !== undefined) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}/`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            }).then(res=>res.json())
                .then((data: T)=>{
                setData(data)
            })
        }
    }

    const clear = () => {
        setData(undefined)
    }

    return {
        data,
        create,
        clear
    }
}

export const useUpdate = <T>(token: string, resource: string) => {
    const [data, setData] = useState<UpdateData<T> | undefined>(undefined)
    const headers = generateHeader(token)

    const update = <Params>(params: DefaultParams<Params>) => {
        if (token !== undefined) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}/${params.id}/${params.sub_path}`, {
                method: 'PATCH',
                body: JSON.stringify(params.data),
                headers: headers
            }).then(res=>res.json())
                .then((data: T)=>{
                setData({
                    id: params.id,
                    data
                })
            })
        }
    }

    return {
        data,
        update
    }
}

export const useDelete = (token: string, resource: string) => {
    const headers = generateHeader(token)
    const [id, setId] = useState<string | undefined>(undefined)

    const deleteOne = (id: string) => {
        if (token !== undefined) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}/${id}/`, {
                method: 'DELETE',
                headers: headers
            }).then((_)=>{
                setId(id)
            })
        }
    }

    return {
        id,
        deleteOne
    }
}

export const useDeleteData = <T>(token: string, resource: string) => {
    const headers = generateHeader(token)
    const [data, setData] = useState<T | undefined>(undefined)

    const deleteOne = (params: DefaultParams<T>) => {
        if (token !== undefined) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}/${params.id}/${params.sub_path}`, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(params.data)
            }).then((_)=>{
                setData(params.data)
            })
        }
    }

    return {
        data,
        deleteOne
    }
}