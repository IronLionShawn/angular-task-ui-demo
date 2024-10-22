export interface Alert {
    message: string;
    type: 'success' | 'danger' | 'info';
    callback?: () => {};
}