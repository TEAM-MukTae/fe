import { useState, useEffect } from "react";

import { api } from "../config/axios";

export const useQuizDetail = () => {
    const [quizDetail, setQuizDetail] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const quizId = 1; // temporary

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        api.get(`/quiz/${quizId}`)
            .then((data) => {
                setQuizDetail(data.data.total_count);
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
