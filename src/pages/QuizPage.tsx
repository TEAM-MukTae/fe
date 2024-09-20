import TabBar from "../components/display/TabBar";
import Card from "../components/display/Card";
import bottom from "../assets/chevron-bottom.svg";
import { useNavigate } from "react-router-dom";

const dummy = {
    quiz: [
        { quizId: 1, title: "인공지능 Ch1 퀴즈", date: "09.18", starred: true },
        { quizId: 2, title: "인공지능 Ch2 퀴즈", date: "09.18", starred: true },
        {
            quizId: 3,
            title: "인공지능 Ch3 퀴즈",
            date: "09.18",
            starred: false,
        },
        {
            quizId: 4,
            title: "인공지능 Ch4 퀴즈",
            date: "09.18",
            starred: false,
        },
    ],
};

function QuizPage() {
    const navigate = useNavigate();

    const handleCardClick = (quizId: string) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div className="pb-10">
            <div className="flex flex-row items-center justify-end">
                <div className="mr-2 text-gray-600">최신순</div>
                <img src={bottom} />
            </div>

            {dummy.quiz.map((quiz) => (
                <Card
                    key={quiz.quizId}
                    keyword={quiz.date}
                    isStarred={quiz.starred}
                    onClick={() => handleCardClick(`quiz-${quiz.quizId}`)}
                >
                    {quiz.title}
                </Card>
            ))}
        </div>
    );
}

export default QuizPage;
