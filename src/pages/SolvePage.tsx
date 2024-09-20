import { useState } from "react";
import Card from "../components/display/Card";
import left from "../assets/leftLine.svg";
import right from "../assets/rightLine.svg";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Button from "../components/display/Button";
import { useQuizDetail } from "../hooks/useQuizDetail";

const dummy = {
    questions: [
        {
            query: "이철우 경북도지사는 기자회견에서 무엇을 대구시에 제안했나요?",
            choices: [
                "신공항 입지를 변경할 것을 제안했다.",
                "SPC(특수목적법인)를 구성할 것을 제안했다.",
                "화물터미널의 위치를 변경할 것을 제안했다.",
                "대구시와 행정통합을 제안했다.",
            ],
            answer: 1,
            explanation:
                "이철우 경북도지사는 신공항 건설을 위해 SPC(특수목적법인)를 구성할 것을 대구시에 제안했습니다.",
        },
        {
            query: "이철우 도지사가 대구시의 신공항 입지 변경 발언에 대해 어떤 입장을 밝혔나요?",
            choices: [
                "대구시장 발언만으로 입지를 변경하는 것이 가능하다고 말했다.",
                "대구시의 입지 변경 발언을 지지했다.",
                "대구시장 발언만으로 입지를 변경하는 것은 불가능하다고 강조했다.",
                "입지 변경에 대해 언급하지 않았다.",
            ],
            answer: 2,
            explanation:
                "이철우 도지사는 대구시장 발언만으로 공항 입지를 변경하는 것은 법적으로 불가능하다고 강조했습니다.",
        },
        {
            query: "신공항 건설 사업의 예상 사업비는 얼마로 추산되었나요?",
            choices: [
                "약 15조 원",
                "약 20조 원",
                "약 26조 5천674억 원",
                "약 30조 원",
            ],
            answer: 2,
            explanation:
                "신공항 건설 사업의 예상 사업비는 총 26조 5천674억 원으로 추산되었습니다.",
        },
    ],
};

function SolvePage() {
    const { isLoading, isError, quizDetail } = useQuizDetail();

    const navigate = useNavigate();

    const [correctCount, setCorrectCount] = useState(0);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

    const totalQuestions = dummy.questions.length;

    const handleChoiceClick = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);

        if (!answeredQuestions.has(currentQuestion)) {
            if (index === dummy.questions[currentQuestion].answer) {
                setCorrectCount((prev) => prev + 1);
            }
            setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
        }
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion(
            (prev) =>
                (prev - 1 + dummy.questions.length) % dummy.questions.length,
        );
        setSelectedAnswer(null);
    };

    const handleNextQuestion = () => {
        if (currentQuestion === totalQuestions - 1) {
            setOpenModal(true);
        } else {
            setSelectedAnswer(null);
            setCurrentQuestion((prev) => (prev + 1) % totalQuestions);
        }
    };

    const resetQuiz = () => {
        setCorrectCount(0);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnsweredQuestions(new Set());
        setOpenModal(false);
    };

    const question = dummy.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="flex flex-col p-2 pb-16">
            <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>맞힌 문제: {correctCount}</span>
                    <span>
                        {currentQuestion + 1} / {totalQuestions}
                    </span>
                </div>
            </div>

            <div>
                <Card>
                    <div className="mb-4 text-lg font-semibold">
                        {currentQuestion + 1}. {question.query}
                    </div>

                    <div className="space-y-4">
                        {question.choices.map((choice, index) => (
                            <div key={index}>
                                <button
                                    className={`p-3 w-full text-left flex items-center rounded-lg ${
                                        selectedAnswer === index
                                            ? selectedAnswer === question.answer
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-red-100 text-red-600"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() => handleChoiceClick(index)}
                                    disabled={selectedAnswer !== null}
                                >
                                    <span
                                        className={`mr-2 font-semibold ${
                                            selectedAnswer === index
                                                ? "text-xl"
                                                : "text-lg"
                                        }`}
                                    >
                                        {index + 1}.
                                    </span>
                                    {choice}
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>

                {selectedAnswer !== null && (
                    <div className="mt-4">
                        <span
                            className={
                                selectedAnswer === question.answer
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            {selectedAnswer === question.answer
                                ? "정답입니다!"
                                : "오답입니다!"}
                        </span>
                        <div className="flex flex-col mt-2">
                            <div className="text-gray-700">
                                정답: {question.answer + 1}번
                            </div>
                            <div className="mt-2 text-gray-700">
                                {question.explanation}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 w-full p-4">
                <div className="flex items-center justify-between mx-auto">
                    <button
                        className="flex items-center text-gray-500"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                    >
                        <img src={left} alt="Previous" className="mr-2" />
                        이전 문제
                    </button>
                    <button
                        className="flex items-center text-primary"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestion === totalQuestions - 1
                            ? "결과 보기"
                            : "다음 문제"}
                        <img src={right} alt="Next" className="ml-2" />
                    </button>
                </div>
            </div>

            <Modal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        height: "30vh",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        background: "#fff",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                <div className="p-5">
                    <div className="text-2xl font-semibold">
                        수고하셨습니다!
                    </div>
                    <div className="mt-4 text-2xl font-bold">
                        {correctCount} / {totalQuestions}
                    </div>
                    <div className="flex justify-end w-full mt-10">
                        <Button
                            width="20px"
                            height="10px"
                            onClick={resetQuiz}
                            className="mr-2"
                        >
                            다시 풀기
                        </Button>
                        <Button
                            width="20px"
                            height="10px"
                            onClick={() => navigate("/quiz")}
                        >
                            확인
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SolvePage;
