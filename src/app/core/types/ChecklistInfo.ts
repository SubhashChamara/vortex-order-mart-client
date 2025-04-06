export interface ChecklistInfo {
    headingInfo: {
        id: number;
        category: string;
        header: string;
        index: number;
    };
    checkListItems: CheckListItem[];
}

export interface CheckListItem {
    id: number;
    masterCheckListItemInfo: {
        id: number;
        headingInfo: {
            id: number;
            category: string;
            header: string;
            index: number;
        };
        name: string;
        index: number;
        type: string;
        required: boolean;
    };
    itemCheckValue?: boolean | null;
    itemCheckValueOperation?: boolean;
    itemCheckValueCredit?: boolean;
    itemCheckValueSecondUser?: boolean | null;
    itemTxtValue?: string | null;
    itemTxtValueSecondUser?: string | null;
    showInSales?: boolean;
    showInOperation?: boolean;
    showInCredit?: boolean;
    attachment?: string | null;
}