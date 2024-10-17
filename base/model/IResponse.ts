export interface IResponse<T = any> {
    data: T;
    messages: string[];
    message: string;
    success: boolean;
    status?: number;
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}