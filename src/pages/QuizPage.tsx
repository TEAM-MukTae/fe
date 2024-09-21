import Card from "../components/display/Card";
import bottom from "../assets/chevron-bottom.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuiz } from "../hooks/useQuiz";

export interface QuizProps {
    workbookId: number;
    title: string;
}

function QuizPage() {
    const navigate = useNavigate();
    const { isLoading, isError, quiz } = useQuiz();

    const { t } = useTranslation();

    const handleCardClick = (quizId: string) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div className="pt-5 pb-5">
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
