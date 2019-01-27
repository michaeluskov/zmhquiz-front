export interface Question {
    id: string;
    question: string;
    timeToAnswer: number;
    answers: {
        title: string;
        isRight: boolean;
        isWrong: boolean;
        isLoading: boolean;
    }[];
}

export const wait = (msecs: number) =>
    new Promise((res) => setTimeout(res, msecs));
