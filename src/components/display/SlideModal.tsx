import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../../config/axios";
import { useNavigate } from "react-router-dom";

interface SlideModalProps {
    isOpen: boolean;
    onClose: () => void;
    transcript: string;
    saveAudio: () => Blob;
}

const CongratulationModal: React.FC = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-2xl font-bold">🎉 축하합니다!</h2>
                <p className="mt-2">녹음이 성공적으로 저장되었습니다!</p>
            </motion.div>
        </div>
    );
};

const SlideModal: React.FC<SlideModalProps> = ({
    isOpen,
    onClose,
    transcript,
    saveAudio,
}) => {
    const [recordingName, setRecordingName] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("Korean");
    const [selectedTopic, setSelectedTopic] = useState("General");
    const [showCongratulation, setShowCongratulation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setRecordingName(`음성녹음-${today}`);
    }, [isOpen]);

    const handleSave = async () => {
        try {
            const formData = new FormData();

            const recordRequest = {
                title: recordingName,
                text: transcript.trim(),
            };
            formData.append(
                "recordRequest",
                new Blob([JSON.stringify(recordRequest)], {
                    type: "application/json",
                }),
            );

            const audioBlob = await saveAudio();
            formData.append("file", audioBlob, "recording.wav");
            const response = await api.post("/audio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response:", response.data);

            // Show congratulation modal
            setShowCongratulation(true);

            // Hide after 3 seconds and navigate
            setTimeout(() => {
                setShowCongratulation(false);
                navigate("/");
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Error saving recording:", error);
        }
    };

    return (
        <>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onClose}
                    ></div>

                    {/* Modal Content */}
                    <motion.div
                        className="h-[300px] fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl z-50 shadow-lg flex flex-col items-center"
                        initial={{ y: "100%" }}
                        animate={{ y: isOpen ? 0 : "100%" }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">
                            녹음명 입력
                        </h2>

                        {/* Input and Dropdowns */}
                        <div className="flex flex-col w-full space-y-4">
                            <div className="flex items-center">
                                <label
                                    htmlFor="recording-name"
                                    className="mr-2 w-24 text-right"
                                >
                                    녹음명:
                                </label>
                                <input
                                    id="recording-name"
                                    type="text"
                                    value={recordingName}
                                    onChange={(e) =>
                                        setRecordingName(e.target.value)
                                    }
                                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="녹음명 입력"
                                />
                            </div>

                            <div className="flex items-center">
                                <label
                                    htmlFor="language"
                                    className="mr-2 w-24 text-right"
                                >
                                    언어:
                                </label>
                                <select
                                    id="language"
                                    value={selectedLanguage}
                                    onChange={(e) =>
                                        setSelectedLanguage(e.target.value)
                                    }
                                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Korean">한국어</option>
                                    <option value="English">영어</option>
                                    <option value="Chinese">중국어</option>
                                    <option value="Japanese">일본어</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <label
                                    htmlFor="topic"
                                    className="mr-2 w-24 text-right"
                                >
                                    주제:
                                </label>
                                <select
                                    id="topic"
                                    value={selectedTopic}
                                    onChange={(e) =>
                                        setSelectedTopic(e.target.value)
                                    }
                                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="General">일반</option>
                                    <option value="Technology">기술</option>
                                    <option value="Education">교육</option>
                                    <option value="Health">건강</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-200"
                        >
                            저장
                        </button>
                    </motion.div>
                </>
            )}

            {/* Congratulation Modal */}
            {showCongratulation && <CongratulationModal />}
        </>
    );
};

export default SlideModal;
