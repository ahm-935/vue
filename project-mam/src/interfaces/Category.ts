export interface Category {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export const defaultCategory: Category = {
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
}