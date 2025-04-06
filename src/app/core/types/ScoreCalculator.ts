export interface ScoreCalculatorIf {
    dvKey: string;
    dvValue: number | null;
    dvValueExp: string | null;
    transformValue: number | null;
    transformValueExp: string | null;
    coefficient: number | null;
    points: number | null;
    pointsExp: string | null;
}
