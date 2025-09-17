'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import '@/styles/context.css';

export type Loader = { active: boolean; message?: string };
export type Toast = { message: string; type?: 'success' | 'error' | 'info' };
export type Alert = { message: string; onConfirm?: () => void; onCancel?: () => void };

interface UIContextType {
    loader: Loader;
    setLoader: (loader: Loader) => void;
    toast: Toast | null;
    setToast: (toast: Toast | null) => void;
    alert: Alert | null;
    setAlert: (alert: Alert | null) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [loader, setLoader] = useState<Loader>({ active: false, message: 'Sample message' });
    const [toast, setToast] = useState<Toast | null>(null);
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        if (toast) setTimeout(() => setToast(null), 5000);
    }, [toast]);

    return (
        <UIContext.Provider value={{ loader, setLoader, toast, setToast, alert, setAlert }}>
            <SessionProvider>{children}</SessionProvider>

            {/* Loader */}
            {loader.active && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                    <div id="wifi-loader" className="min-w-7xl">
                        <svg className="circle-outer" viewBox="0 0 86 86">
                            <circle className="back" cx="43" cy="43" r="40"></circle>
                            <circle className="front" cx="43" cy="43" r="40"></circle>
                            <circle className="new" cx="43" cy="43" r="40"></circle>
                        </svg>
                        <svg className="circle-middle" viewBox="0 0 60 60">
                            <circle className="back" cx="30" cy="30" r="27"></circle>
                            <circle className="front" cx="30" cy="30" r="27"></circle>
                        </svg>
                        <svg className="circle-inner" viewBox="0 0 34 34">
                            <circle className="back" cx="17" cy="17" r="14"></circle>
                            <circle className="front" cx="17" cy="17" r="14"></circle>
                        </svg>
                        <div className="text" data-text={loader.message}></div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div
                    id="toast-success"
                    className="bg-light-muted shadow-dark-muted fixed right-4 bottom-4 mb-4 flex w-full max-w-sm items-center rounded-lg p-4 shadow-sm"
                    role="alert"
                >
                    <div
                        className={
                            'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ' +
                            (toast.type === 'success'
                                ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'
                                : toast.type === 'error'
                                  ? 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'
                                  : 'bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200')
                        }
                    >
                        {toast.type === 'success' ? (
                            <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                        ) : toast.type === 'error' ? (
                            <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                            </svg>
                        )}
                    </div>
                    <div className="text-dark-muted ms-3 text-sm font-normal">{toast.message}</div>
                    <button
                        type="button"
                        className="bg-light-muted border-dark-muted/25 -mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border"
                        data-dismiss-target="#toast-success"
                        aria-label="Close"
                        onClick={() => setToast(null)}
                    >
                        <svg
                            className="h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            )}

            {/* Alert */}
            {alert && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                    <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
                        <p className="text-lg">{alert.message}</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="rounded bg-gray-200 px-3 py-1"
                                onClick={() => {
                                    alert.onCancel?.();
                                    setAlert(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded bg-blue-600 px-3 py-1 text-white"
                                onClick={() => {
                                    alert.onConfirm?.();
                                    setAlert(null);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </UIContext.Provider>
    );
}

export const useUI = () => {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error('useUI must be used within UIProvider');
    return ctx;
};
