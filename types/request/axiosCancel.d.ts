import type { AxiosRequestConfig } from 'axios';
export declare let pendingMap: Map<string, AbortController>;
export declare const getPendingUrl: (config: AxiosRequestConfig) => string;
export declare class AxiosCanceler {
    addPending(config: AxiosRequestConfig): void;
    removeAllPending(): void;
    removePending(config: AxiosRequestConfig): void;
    reset(): void;
}
