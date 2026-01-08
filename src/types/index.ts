import { categoryMap } from "../utils/constants";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TCategoryKey = keyof typeof categoryMap;

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: TCategoryKey;
    price: number | null;
    description: string
}

export type TPayment = 'card' | 'cash' | 'online' | ''; 

export interface IBuyer {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}

export interface IBuyerErrors {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
}

export type TProductListInfo = {
    total: number;
    items: IProduct[];
}

export type TOrderInfo = IBuyer & {
    total: number;
    items: string[];
}