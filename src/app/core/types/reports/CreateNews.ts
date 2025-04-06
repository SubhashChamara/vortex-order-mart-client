export interface CreateNews {
    startDate: string;
    endDate: string;
    message: string;
    isEditable: boolean;
    id?: number | null;
}  