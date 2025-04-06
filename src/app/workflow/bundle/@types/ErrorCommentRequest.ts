export interface ErrorCommentRequest {
    taskInstance: string;
    errorTypes: string[];
    hasError: boolean;
    errorComment?: string | null;
}