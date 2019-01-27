import {Question, wait} from "./misc";

interface QuestionMeta {
    questions: Question[];
    error?: string;
}

export const getQuestionMeta = (quizId, login, hash): Promise<QuestionMeta> => {
    return wait(2000)
        .then(() => ({
            questions: [
                {
                    id: "1",
                    question: "Как у тебя дела?",
                    timeToAnswer: 10,
                    answers: [
                        {title: "Отлично"},
                        {title: "Замечательно"},
                        {title: "СуперСуперСуперСуперСуперСуперСуперСуперСуперСуперСупер"}
                    ] as {
                        title: string;
                        isRight: boolean;
                        isWrong: boolean;
                        isLoading: boolean;
                    }[]
                },
                {
                    id: "2",
                    question: "А сейчас?",
                    timeToAnswer: 10,
                    answers: [
                        {title: "Отлично"},
                        {title: "Замечательно"},
                        {title: "СуперСуперСуперСуперСуперСуперСуперСуперСуперСуперСупер"}
                    ] as {
                        title: string;
                        isRight: boolean;
                        isWrong: boolean;
                        isLoading: boolean;
                    }[]
                }
            ]
        }))
};

interface PostAnswerInterface {
    error?: string;
    isRight: boolean;
}

export const postAnswer = (quizId, login, hash, questionId, answerNum): Promise<PostAnswerInterface> => {
    return wait(2000)
        .then(() => ({
            isRight: true
        }));
};
