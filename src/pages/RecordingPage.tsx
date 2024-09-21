import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import leftArrow from "../assets/leftArrow.svg";
import home from "../assets/home.svg";
import record from "../assets/record.svg";
import stop from "../assets/stop.svg";
import { useNavigate } from "react-router-dom";
import Transcript from "../components/display/Transcript";
import { motion } from "framer-motion";
import SlideModal from "../components/display/SlideModal";

const RecordingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { transcript, startListening, stopListening, saveAudio, canvasRef } =
        useSpeechRecognition();

    const handleRecordToggle = () => {
        if (isRecording) {
            stopListening();
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
            <div className="flex flex-col items-center justify-center mt-3">
                {/* Transcript area with border and scroll */}
                <div className="w-[300px] h-[490px] border border-gray-300 rounded-lg p-2 overflow-y-auto mb-4">
                    <Transcript content={transcript} />
                </div>

                {/* Visualizer and recording button area */}
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
            <SlideModal
                isOpen={isModalOpen}
                onClose={closeModal}
                transcript={transcript}
                saveAudio={saveAudio}
            />
        </>
    );
};

export default RecordingPage;
