import { useState, useEffect } from "react";
import { Question } from "../pages/SolvePage";

import { api } from "../config/axios";

export const useQuizDetail = () => {
    const [quizDetail, setQuizDetail] = useState<Question[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const quizId = 1;

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        api.get(`/quiz/${quizId}`)
            .then((data) => {
                setQuizDetail(data.data.data.questions);
                console.log("useQuizDetail", data.data.data.questionss);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { isLoading, isError, quizDetail };
};
