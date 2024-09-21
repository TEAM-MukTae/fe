import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import leftArrow from "../assets/leftArrow.svg";
import home from "../assets/home.svg";
import record from "../assets/record.svg";
import stop from "../assets/stop.svg";
import { useNavigate } from "react-router-dom";
import Transcript from "../components/display/Transcript";
import SlideModal from "../components/display/SlideModal";

const RecordingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<string>("");

    const {
        transcript,
        startListening,
        stopListening,
        saveAudio, // Get saveAudio from the hook
        canvasRef,
    } = useSpeechRecognition();

    const handleRecordToggle = () => {
        if (isRecording) {
            stopListening();
            setModalContent(transcript);
            setIsModalOpen(true);
        } else {
            startListening();
        }
        setIsRecording(!isRecording);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center py-6">
                <div className="w-72 h-24 flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        width="100"
                        height="40"
                        className="border border-gray-300 rounded-3xl"
                    ></canvas>
                    <div className="flex flex-col items-center ml-4">
                        <img
                            src={isRecording ? stop : record}
                            alt={
                                isRecording
                                    ? "Stop Recording"
                                    : "Start Recording"
                            }
                            onClick={handleRecordToggle}
                            className="w-10 h-10 cursor-pointer mb-2"
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <Transcript content={transcript} />
            </div>

            {/* Modal for Transcript Display */}
            <SlideModal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={modalContent}
                saveAudio={saveAudio} // Pass saveAudio to the modal
            />
        </>
    );
};

export default RecordingPage;
