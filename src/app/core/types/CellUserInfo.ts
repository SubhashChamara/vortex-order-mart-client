export interface CellUserInfo {
    headingInfo: {
        id: number;
        category: string;
        header: string;
        index: number;
    };
    checkListItems: {
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
        itemCheckValue?: boolean;
        itemTxtValue?: string;
    }[];
}
