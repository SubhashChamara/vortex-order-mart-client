
export interface RelationshipFraudInfo {
    matchedList: string[];
    matchedProcessList: FraudInfoDTO[]
}

interface FraudInfoDTO {
    id: number;
    accountEcapsRef: string;
    frmRef: string;
    fullName: string;
    nicPassportNo: string;
    resAddress1: string;
    resAddress2: string;
    resAddress3: string;
    mobileNo: string;
    residenceNo: string;
    empNo: string;
    empName: string;
    empAddress1: string;
    empAddress2: string;
    empAddress3: string;
    fraudCategory: string;
    remarks: string;
    dsrCode: string;
}
