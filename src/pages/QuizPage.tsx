import Card from "../components/display/Card";
import bottom from "../assets/chevron-bottom.svg";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";

import ToastPopup from "../components/display/ToastPopup";

export interface QuizProps {
    workbookId: number;
    title: string;
}

function QuizPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const [toast, setToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");

    const { isLoading, isError, quiz } = useQuiz();
    const { t } = useTranslation();

    useEffect(() => {
        if (location.state?.showToast) {
            setToastMessage(location.state.toastMessage);
            setToast(true);

            setTimeout(() => {
                setToast(false);
            }, 3000);
        }
    }, [location.state]);

    const handleCardClick = (quizId: string) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div className="pt-5 pb-5">
            {toast && (
                <ToastPopup
                    setToast={setToast}
                    message={toastMessage}
                    position="bottom"
                />
            )}

            <div className="flex flex-row items-center justify-end">
                <div className="mr-2 text-gray-600">{t("sort_by_latest")}</div>
                <img src={bottom} />
            </div>

            {quiz &&
                quiz.map((data) => (
                    <Card
                        key={data.workbookId}
                        date="09.18"
                        onClick={() => handleCardClick(`${data.workbookId}`)}
                    >
                        {data.title}
                    </Card>
                ))}
        </div>
    );
}

export default QuizPage;
