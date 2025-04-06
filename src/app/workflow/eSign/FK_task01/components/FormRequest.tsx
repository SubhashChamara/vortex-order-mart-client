export interface FormRequest {
    documentName:string;
    documentType:string;
    active:boolean;
    customerName:string;
    acNumber:string;
    docRef:string;
    cardNumber:string;
    nic:string;
    branch:string;
    wfLabel:string;
    initiator:string;
    createUser:string;
    createDate:string;
    businessKey:string;
    processInstance:string;
    signatureImage:Uint8Array;
    docReferenceID:string;
    oldEdgeDocRef:string;
    newEdgeDocRef:string;
    approverId:string;
    wfIsCompleted:boolean;
    addLetterHead:boolean;
    docPath: string;
  }