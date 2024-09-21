import TabBar from "../components/display/TabBar";
import Card from "../components/display/Card";
import bottom from "../assets/chevron-bottom.svg";
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
    ],
};

const StarredPage = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-5 pb-10">
            <div className="flex flex-row items-center justify-end">
                <div className="mr-2 text-gray-600">{t("sort_by_latest")}</div>
                <img src={bottom} />
            </div>

            {dummy.quiz.map((quiz) => (
                <Card
                    key={quiz.quizId}
                    date={quiz.date}
                    isStarred={quiz.starred}
                >
                    {quiz.title}
                </Card>
            ))}

            <TabBar />
        </div>
    );
};

export default StarredPage;
