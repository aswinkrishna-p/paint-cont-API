
export interface CustomInterface<T> {
    status: number;
    success: boolean;
    data: T;
    message: string;
}