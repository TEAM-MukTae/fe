import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import leftArrow from "../assets/leftArrow.svg";
import home from "../assets/home.svg";
import record from "../assets/record.svg";
import stop from "../assets/stop.svg";
import { useNavigate } from "react-router-dom"; // 수정된 부분
import Transcript from "../components/display/Transcript";

const RecordingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        saveAudio,
        canvasRef,
    } = useSpeechRecognition();

    const handleRecordToggle = () => {
        if (isRecording) {
            console.log(transcript);
            stopListening();
        } else {
            startListening();
        }
        setIsRecording(!isRecording);
    };

    const handleStopRecording = () => {
        if (isRecording) {
            stopListening();
            setIsRecording(false);
        }
    };

    return (
        <>
            {/* Visualizer and Control Button */}
            <div className="flex flex-col items-center justify-center py-6">
                <div className=" w-72 h-24 flex items-center justify-center">
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
                <button onClick={saveAudio}>aa</button>

                <Transcript content={transcript} />
            </div>
            <div className="flex justify-center"></div>
        </>
    );
};

export default RecordingPage;
