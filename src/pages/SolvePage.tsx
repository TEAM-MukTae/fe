import { useState, useEffect } from "react";
import Modal from "react-modal";

import Card from "../components/display/Card";
import Button from "../components/display/Button";

import { useNavigate } from "react-router-dom";
import { useQuizDetail } from "../hooks/useQuizDetail";
import { useTranslation } from "react-i18next";

import left from "../assets/leftLine.svg";
import right from "../assets/rightLine.svg";

export interface Question {
    questionId: number;
    query: string;
    choices: string[];
    answer: number;
    explanation: string;
}

function SolvePage() {
    const { isLoading, isError, quizDetail } = useQuizDetail();
    console.log(quizDetail);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [totalQuestions, setTotalQuestions] = useState<number>(0);
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

    useEffect(() => {
        if (quizDetail) {
            setTotalQuestions(quizDetail.length);
            console.log("sovle", quizDetail.length);
        }
    }, [quizDetail]);

    const handleChoiceClick = (index: number) => {
        if (selectedAnswer !== null || !quizDetail) return;
        setSelectedAnswer(index);

        if (!answeredQuestions.has(currentQuestion)) {
            if (quizDetail && index === quizDetail[currentQuestion].answer) {
                setCorrectCount((prev) => prev + 1);
            }
            setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
        }
    };

    const handlePreviousQuestion = () => {
        if (!quizDetail) return;
        setCurrentQuestion(
            (prev) => (prev - 1 + totalQuestions) % totalQuestions,
        );
        setSelectedAnswer(null);
    };

    const handleNextQuestion = () => {
        if (!quizDetail) return;
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !quizDetail) {
        return <div>Error loading quiz details</div>;
    }

    const question = quizDetail[currentQuestion];
    console.log(question);
    const progress = ((currentQuestion + 1) / quizDetail.length) * 100;

    return (
        <div className="flex flex-col p-2 pt-10 pb-16">
            <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>
                        {t("quiz.correctAnswers")}: {correctCount}
                    </span>
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
                                ? t("quiz.correct")
                                : t("quiz.incorrect")}
                        </span>
                        <div className="flex flex-col mt-2">
                            <div className="text-gray-700">
                                {t("quiz.correctAnswer")}: {question.answer + 1}
                            </div>
                            <div className="mt-2 text-gray-700">
                                {question.explanation}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-white">
                <div className="flex items-center justify-between mx-auto">
                    <button
                        className="flex items-center text-gray-500"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                    >
                        <img src={left} alt="Previous" className="mr-2" />
                        {t("quiz.previous")}
                    </button>
                    <button
                        className="flex items-center text-primary"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestion === totalQuestions - 1
                            ? t("quiz.showResults")
                            : t("quiz.next")}
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
                        {t("quiz.congratulations")}
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
                            {t("quiz.retry")}
                        </Button>
                        <Button
                            width="20px"
                            height="10px"
                            onClick={() => navigate("/quiz")}
                        >
                            {t("quiz.confirm")}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SolvePage;
