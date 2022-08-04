export interface UploadFileParams {
    data?: Recordable;
    name?: string;
    file: File | Blob;
    raw?: File | Blob;
    filename?: string;
    [key: string]: any;
}
export declare type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
    joinParamsToUrl?: boolean;
    formatDate?: boolean;
    isTransformResponse?: boolean;
    isReturnNativeResponse?: boolean;
    joinPrefix?: boolean;
    apiUrl?: string;
    urlPrefix?: string;
    errorMessageMode?: ErrorMessageMode;
    joinTimestamp?: boolean;
    ignoreCancelToken?: boolean;
    withToken?: boolean;
}
export interface Result<T = any> {
    code: number;
    type?: 'success' | 'error' | 'warning';
    message: string;
    data: T;
}
export declare enum RequestEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare enum ResultEnum {
    SUCCESS = 200,
    ERROR = 1,
    TIMEOUT = 401,
    TYPE = "success"
}
export declare enum ContentTypeEnum {
    JSON = "application/json;charset=UTF-8",
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
    FORM_DATA = "multipart/form-data"
}
