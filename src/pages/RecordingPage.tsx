import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import leftArrow from "../assets/leftArrow.svg";
import home from "../assets/home.svg";
import record from "../assets/record-white.svg";
import pause from "../assets/pause.svg";
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
    const handleStopBtn = () => {
        if (isRecording) {
            setIsModalOpen(true);
        }
    };
    const handleRecordToggle = () => {
        if (isRecording) {
            stopListening();
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
                <div className="w-[280px] h-[400px]  border-gray-300 rounded-lg p-1 overflow-y-auto mb-4 text-sm">
                    <Transcript content={transcript} />
                </div>

                {/* Visualizer and recording button area */}
                <div className="mx-10 mb-2 z-10 items-center pl-5 pr-3 pt-4  bg-black border-t border-gray-200 rounded-2xl shadow-md w-280">
                    <div className=" items-center">
                        <div className="flex flex-row">
                            <div className="flex items-center justify-center w-15 h-15 rounded-full bg-slate-800 mr-4">
                                <img
                                    src={isRecording ? pause : record}
                                    alt={
                                        isRecording
                                            ? "Stop Recording"
                                            : "Start Recording"
                                    }
                                    onClick={handleRecordToggle}
                                    className="w-5 h-5 px-4 object-cover" // Image covers the entire div
                                />
                            </div>

                            {/* Center area for the canvas and instruction */}
                            <div className="flex flex-col ">
                                <div className="overflow-hidden w-[25px] relative">
                                    <canvas
                                        ref={canvasRef}
                                        width="140"
                                        height="20"
                                        className="mt-1"
                                        style={{
                                            transform: "translateX(-60px)",
                                        }} // 400 - 20 = 380px 이동
                                    ></canvas>
                                </div>

                                <div className="text-xs mt-2 text-gray-400">
                                    {isRecording
                                        ? "현재 녹음 진행 중 입니다."
                                        : "녹음을 시작해주세요"}
                                </div>
                            </div>
                        </div>

                        {/* 종료 버튼 on the right */}
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => handleStopBtn()}
                                className="px-4 py-2 text-sm text-primary font-bold rounded"
                            >
                                종료
                            </button>
                        </div>
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
