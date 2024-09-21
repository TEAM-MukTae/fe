import { useState, useEffect } from "react";
import { QuizProps } from "../pages/QuizPage";

import { api } from "../config/axios";

export const useQuiz = () => {
    const [quiz, setQuiz] = useState<QuizProps[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        api.get(`/quiz`)
            .then((data) => {
                setQuiz(data.data.data);
                console.log(data.data.data);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { isLoading, isError, quiz };
};
