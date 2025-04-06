export interface ExtendedVerificationRequest {
    processInstance: string;
    taskInstance?: string,
    nicNotClear: boolean;
    nicNotClearComment?: string | null;
    relationshipIdentified: boolean;
    relationshipIdentifiedComment: string | null;
}