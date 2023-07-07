
export interface UpdateParams<T> {
    id: string
    sub_path: string
    data: T
}

export interface UpdateData<T> {
    id: string | undefined
    data: T
}