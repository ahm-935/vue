export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: File | string| null;
    // image_path?: string;
    description?: string;
    category_id: number;
    category: string;
    brand_id: number;
    brand: string;
    reorder_level?: number;
    active: boolean;
    created_at?: string;
    updated_at?: string;
}

export const defaultProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    image: '',
    // image_path: '',
    description: '',
    category_id: 0,
    category: '',
    brand_id: 0,
    brand: '',
    reorder_level: 0,
    active: false,
    created_at: '',
    updated_at: '',
};