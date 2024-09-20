import Card from "../components/display/Card";
import bottom from "../assets/chevron-bottom.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const dummy = {
    quiz: [
        { quizId: 1, title: "인공지능 Ch1 퀴즈", date: "09.18", starred: true },
        { quizId: 2, title: "인공지능 Ch2 퀴즈", date: "09.18", starred: true },
        {
            quizId: 3,
            title: "인공지능 Ch3 퀴즈",
            date: "09.18",
            starred: true,
        },
        {
            quizId: 4,
            title: "인공지능 Ch4 퀴즈",
            date: "09.18",
            starred: true,
        },
        {
            quizId: 5,
            title: "논리회로 Ch1 퀴즈",
            date: "09.18",
            starred: false,
        },
        {
            quizId: 6,
            title: "논리회로 Ch2 퀴즈",
            date: "09.18",
            starred: false,
        },
    ],
};

function QuizPage() {
    const navigate = useNavigate();

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

            {dummy.quiz.map((quiz) => (
                <Card
                    key={quiz.quizId}
                    keyword={quiz.date}
                    isStarred={quiz.starred}
                    onClick={() => handleCardClick(`${quiz.quizId}`)}
                >
                    {quiz.title}
                </Card>
            ))}
        </div>
    );
}

export default QuizPage;
