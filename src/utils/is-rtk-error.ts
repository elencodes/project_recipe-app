type RTKQueryError = {
    status: number;
    data: {
        message?: string;
    };
};

export function isRTKQueryError(error: unknown): error is RTKQueryError {
    return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
}
