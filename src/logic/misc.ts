export interface Question {
    question: string;
    price: number;
    timeToAnswer: number;
    answers: {
        title: string;
        isRight: boolean;
        isWrong: boolean;
        isLoading: boolean;
    }[];
}

export interface Quiz {
    id: string;
    from: string;
    till: string;
    name: string;
    questions: Question[];
}

export const wait = (msecs: number) =>
    new Promise((res) => setTimeout(res, msecs));
