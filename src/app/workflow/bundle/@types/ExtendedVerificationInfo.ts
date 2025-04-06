export interface ExtendedVerificationInfo {
    processInstance: string;
    nicNotClear: boolean;
    nicNotClearComment?: string | null;
    relationshipIdentified: boolean;
    relationshipIdentifiedComment: string | null;
}