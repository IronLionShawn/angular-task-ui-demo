export interface TaskRequest {
    task: string;
    description: string;
    status: number | '';
}

export interface TaskObject extends TaskRequest {
    id: number | '';
}
