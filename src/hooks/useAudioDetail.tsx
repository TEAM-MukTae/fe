import { useState, useEffect } from "react";

import { api } from "../config/axios";

export const useAudioDetail = (id: number) => {
    const [audioDetail, setAudioDetail] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        api.get(`/audio/${id}`)
            .then((data) => {
                setAudioDetail(data.data.total_count);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { isLoading, isError, audioDetail };
};
