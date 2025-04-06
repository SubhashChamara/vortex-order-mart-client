export const formatCardNumber = (value: string) => {
    return value
        .replace(/\s+/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
};

export const formatCurrency = (value: string) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    if (cleanedValue.includes(".")) {
        const [integer, decimal] = cleanedValue.split(".");
        cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
};

export const determineIfDisabled = (edit: boolean, semiEdit: boolean | undefined) => {
    if (edit === true) {
        return false;
    }
    if (edit === false && semiEdit === true) {
        return false;
    }
    return true;
}
