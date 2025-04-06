export const filterSteps = (
    alpl: boolean,
    cc: boolean,
    steps: { label: string; content: React.ReactNode | null }[]
) => {
    return steps.filter(step => {
        if (step.label === "ALPL Checkpoints") {
            return alpl; // Show this step only if alpl is true
        }
        if (step.label === "CC Checkpoints") {
            return cc; // Show this step only if cc is true
        }
        return true; // Keep all other steps
    });
};
