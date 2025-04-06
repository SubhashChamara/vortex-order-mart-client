import { ProcessInfo } from "./ProcessInfo";
import { GroupInfo } from "./GroupInfo";

export interface ProcessAllocationInfo {
    process: ProcessInfo;
    group: GroupInfo;
    createdDate: string;
}