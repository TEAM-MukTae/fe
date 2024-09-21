import React, { useState } from "react";

import { useAudio } from "../hooks/useAudio";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ToastPopup from "../components/display/ToastPopup";
import Card from "../components/display/Card";
import Button from "../components/display/Button";

import upload from "../assets/upload.svg";

type Audio = {
    id: number;
    title: string;
    keyword: string[];
    isStarred: boolean;
};

type DummyData = {
    allAudio: Audio[];
};

const dummy: DummyData = {
    allAudio: [
        {
            id: 0,
            title: "제목",
            keyword: ["아빠", "엄마", "효도"],
            isStarred: true,
        },
        {
            id: 1,
            title: "제목",
            keyword: ["아빠", "엄마", "효도"],
            isStarred: true,
        },
        {
            id: 3,
            title: "제목",
            keyword: ["아빠", "엄마", "효도"],
            isStarred: true,
        },
    ],
};

export default function UploadPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isLoading, isError, audio } = useAudio();

    const [fileName, setFileName] = useState<string>("");
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toast, setToast] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("audio");
    const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const toggleCardSelection = (id: number) => {
        setSelectedCardIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((cardId) => cardId !== id);
            } else {
                return [...prev, id];
            }
        });
        console.log(selectedCardIds);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleGenerateQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!fileName) {
            setToastMessage(t("uploadPage.selectFile"));
            setToast(true);
            return;
        }
        const id = 1; // 임시
        navigate(`/quiz/${id}`);
    };

    return (
        <div className="w-full max-w-lg mx-auto font-sans border-gray-300">
            {toast && (
                <ToastPopup
                    setToast={setToast}
                    message={toastMessage}
                    position="bottom"
                />
            )}
            <div className="flex justify-around border-b">
                <button
                    className={`py-2 px-4 text-center flex-1 font-bold ${
                        activeTab === "audio"
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("audio")}
                >
                    {t("uploadPage.audio")}
                </button>
                <button
                    className={`py-2 px-4 text-center flex-1 font-bold ${
                        activeTab === "file"
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("file")}
                >
                    {t("uploadPage.file")}
                </button>
            </div>
            <div className="p-4 bg-gray-100">
                {activeTab === "audio" && (
                    <>
                        {dummy.allAudio.map(({ id, title, keyword }: Audio) => (
                            <Card
                                key={id}
                                keyword={keyword}
                                onClick={() => toggleCardSelection(id)}
                                isSelected={selectedCardIds.includes(id)}
                            >
                                {title}
                            </Card>
                        ))}
                    </>
                )}
                {activeTab === "file" && (
                    <div>
                        <label
                            htmlFor="fileElem"
                            className="flex items-center"
                            no-outline
                        >
                            <img src={upload} alt="upload" className="mr-2" />
                            <span className="font-semibold text-black">
                                {fileName
                                    ? `${fileName}`
                                    : t("uploadPage.upload")}
                            </span>
                        </label>

                        <input
                            type="file"
                            id="fileElem"
                            multiple
                            accept=".pdf, .jpg, .jpeg, .png, .ppt, .pptx"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                )}
            </div>

            <div className="fixed left-0 right-0 flex justify-center bottom-10">
                <Button
                    width="100px"
                    height="10px"
                    onClick={handleGenerateQuiz}
                >
                    {t("uploadPage.generateQuiz")}
                </Button>
            </div>
        </div>
    );
}
