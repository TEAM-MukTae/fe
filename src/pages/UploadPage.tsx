import React, { useState, useRef } from "react";

import { useAudio } from "../hooks/useAudio";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import Card from "../components/display/Card";
import Button from "../components/display/Button";
import SlideModal from "../components/display/SlideModal2";

import upload from "../assets/upload.svg";

import { Audio } from "../pages/HomePage";
import { api } from "../config/axios";
import languageState from "../context/atoms";

export default function UploadPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const language = useRecoilValue(languageState);
    console.log(language);

    const { isLoading, isError, audio } = useAudio();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toast, setToast] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("audio");
    const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
    const [quizTitle, setQuizTitle] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
            setSelectedFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!quizTitle.trim()) {
            setToastMessage(t("uploadPage.enterTitle"));
            setToast(true);
            return;
        }

        const formData = new FormData();

        const quizRequest = {
            title: quizTitle,
            idList: selectedCardIds,
            language: language,
        };
        formData.append(
            "quizRequest",
            new Blob([JSON.stringify(quizRequest)], {
                type: "application/json",
            }),
        );
        console.log(formData);

        if (selectedFile) {
            formData.append("files", selectedFile);
            console.log(formData);
        } else {
            console.log("No file selected");
        }

        try {
            const response = await api.post("/quiz", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);

            setToastMessage(t("uploadPage.quizGenerationSuccess"));
            setOpenModal(false);

            navigate(`/quiz`, {
                state: {
                    showToast: true,
                    toastMessage: t("uploadPage.quizGenerationSuccess"),
                    from: "UploadPage",
                },
            });
        } catch (error) {
            console.error("Error generating quiz:", error);
            setToastMessage(t("uploadPage.quizGenerationError"));
            setToast(true);
        }
    };

    return (
        <div className="w-full max-w-lg pb-20 mx-auto font-sans border-gray-300">
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
                        {Array.isArray(audio) &&
                            audio.length > 0 &&
                            audio.map(({ id, title, keywords }: Audio) => (
                                <Card
                                    key={id}
                                    keyword={keywords}
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
                            accept=".pdf"
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
                    onClick={() => setOpenModal(true)}
                >
                    {t("uploadPage.generateQuiz")}
                </Button>
            </div>

            {openModal && (
                <SlideModal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    title={t("uploadPage.enterQuizTitle")}
                    onSave={handleSubmit}
                >
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder={t("uploadPage.quizTitlePlaceholder")}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </SlideModal>
            )}
        </div>
    );
}
