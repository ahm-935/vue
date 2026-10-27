export interface Brand {
    id: number
    name: string
    created_at?: string
    updated_at?: string
}

export const defaultBrand: Brand = {
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
}