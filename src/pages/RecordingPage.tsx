import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import leftArrow from "../assets/leftArrow.svg";
import home from "../assets/home.svg";
import record from "../assets/record.svg";
import { useNavigate } from "react-router-dom";
import Button from "../components/display/Button";
import Transcript from "../components/display/Transcript";

const RecordingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        canvasRef,
    } = useSpeechRecognition();

    const handleRecordToggle = () => {
        if (isRecording) {
            stopListening();
            // Show modal here
        } else {
            startListening();
        }
        setIsRecording(!isRecording);
    };

    return (
        <>
            {/* Visualizer and Control Button */}
            <div className="flex items-center justify-center py-6">
                <img
                    src={isRecording ? home : record}
                    alt={isRecording ? "Stop Recording" : "Start Recording"}
                    onClick={handleRecordToggle}
                    className="w-10 h-10   cursor-pointer pr-4"
                />
                <canvas
                    ref={canvasRef}
                    width="100"
                    height="40"
                    className="border border-gray-300 rounded-3xl shadow-lg"
                ></canvas>
            </div>
            <div>
                <Transcript content={transcript} />
            </div>
        </>
    );
};

export default RecordingPage;
