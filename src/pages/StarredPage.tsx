import { useTranslation } from "react-i18next";
import { useQuiz } from "../hooks/useQuiz";
import { useNavigate } from "react-router-dom";

import TabBar from "../components/display/TabBar";
import Card from "../components/display/Card";

import bottom from "../assets/chevron-bottom.svg";

const StarredPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isLoading, isError, quiz } = useQuiz();

    const handleCardClick = (id: number) => {
        navigate(`/quiz/${id}`, { state: { id } });
    };

    return (
        <div className="pt-5 pb-10">
            <div className="flex flex-row items-center justify-end">
                <div className="mr-2 text-gray-600">{t("sort_by_latest")}</div>
                <img src={bottom} />
            </div>

            {quiz &&
                quiz.map((data) => (
                    <Card
                        key={data.workbookId}
                        date="09.22"
                        isStarred={true}
                        onClick={() => handleCardClick(data.workbookId)}
                    >
                        {data.title}
                    </Card>
                ))}

            <TabBar />
        </div>
    );
};

export default StarredPage;
