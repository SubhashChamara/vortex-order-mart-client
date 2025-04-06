export interface ActionPoint {
    email: string;
    actionPoint: string;
  }
  
  export interface ActionPointRequest {
    processInstance: string;
    actionPoints: ActionPoint[];
  }