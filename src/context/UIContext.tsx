'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Toast = { message: string; type?: 'success' | 'error' | 'info' };
type Alert = { message: string; onConfirm?: () => void; onCancel?: () => void };

interface UIContextType {
    showLoader: boolean;
    setShowLoader: (val: boolean) => void;
    toast: Toast | null;
    setToast: (toast: Toast | null) => void;
    alert: Alert | null;
    setAlert: (alert: Alert | null) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [showLoader, setShowLoader] = useState(false);
    const [toast, setToast] = useState<Toast | null>(null);
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        if (toast) setTimeout(() => setToast(null), 5000);
    }, [toast]);

    return (
        <UIContext.Provider value={{ showLoader, setShowLoader, toast, setToast, alert, setAlert }}>
            {children}

            {/* Loader */}
            {showLoader && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div
                    id="toast-success"
                    className="fixed right-4 bottom-4 mb-4 flex w-full max-w-sm items-center rounded-lg bg-light-muted p-4 shadow-sm shadow-dark-muted"
                    role="alert"
                >
                    <div
                        className={
                            'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ' +
                            (toast.type === 'success'
                                ? 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200'
                                : toast.type === 'error'
                                  ? 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200'
                                  : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200')
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
                    <div className="ms-3 text-sm font-normal text-dark-muted">{toast.message}</div>
                    <button
                        type="button"
                        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-light-muted border border-dark-muted/25 cursor-pointer "
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
