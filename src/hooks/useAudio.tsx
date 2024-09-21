import { useState, useEffect } from "react";
import { Audio } from "../pages/HomePage";

import { api } from "../config/axios";

export const useAudio = () => {
    const [audio, setAudio] = useState<Audio | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        api.get(`/audio`)
            .then((data) => {
                setAudio(data.data.data);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { isLoading, isError, audio };
};
