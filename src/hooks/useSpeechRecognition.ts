import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { api } from "../config/axios";
import i18n from "../i18n";

// Web Speech API 관련 타입 정의
interface SpeechRecognition extends EventTarget {
    start: () => void;
    stop: () => void;
    continuous: boolean;
    interimResults: boolean;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
}

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas ref for visualizer

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("이 브라우저는 Web Speech API를 지원하지 않습니다.");
            return;
        }

        const recognition = new (
            window as any
        ).webkitSpeechRecognition() as SpeechRecognition;
        recognition.continuous = true;
        recognition.interimResults = true; // Enable interim results

        recognition.onresult = handleResult; // Use the handleResult function
        recognition.onend = () => {
            setIsListening(false);
        };
        recognitionRef.current = recognition;
        startVisualizer();
        // 컴포넌트 언마운트 시 음성 인식 중지 (메모리 누수 방지)
        return () => {
            recognition.stop();
        };
    }, []);

    const handleResult = async (_: SpeechRecognitionEvent) => {
        const promises = []; // Create an array to hold promises

        for (let i = _.resultIndex; i < _.results.length; i++) {
            if (_.results[i].isFinal) {
                const finalTranscript = _.results[i][0].transcript;
                promises.push(translateText(finalTranscript));
            }
        }

        // Wait for all translation requests to complete
        const translatedTexts = await Promise.all(promises);
        const completeTranscript = translatedTexts.join(" "); // Combine all translated texts

        // Update transcript state
        setTranscript((prev) => prev + completeTranscript + " ");
    };

    const translateText = async (text: string) => {
        const lan = i18n.language === "zh" ? "zh-CN" : i18n.language;
        const data = {
            text: text,
            target: lan,
        };
        if (lan !== "ko") {
            try {
                const res = await api.post("/translate", data);
                return res.data; // Return the translated text
            } catch (error) {
                console.error("Translation error:", error);
                return text; // If error, return the original text
            }
        } else {
            return text;
        }
    };

    const startListening = useCallback(async () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);

            // Capture audio stream
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: "audio/webm",
                });
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setAudioChunks((prev) => [...prev, event.data]); // Add audio chunks
                    }
                };

                mediaRecorder.onstop = () => {
                    console.log("MediaRecorder stopped.");
                };

                mediaRecorder.onerror = (event: any) => {
                    console.error("MediaRecorder error:", event.error);
                };

                mediaRecorder.start();
            } catch (error) {
                console.error(
                    "오디오 스트림을 가져오는 데 실패했습니다:",
                    error,
                );
            }
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            stopVisualizer();

            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current.stream
                    .getTracks()
                    .forEach((track) => track.stop()); // Stop audio tracks
            }
        }
    }, []);
    const saveAudio = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioChunks([]); // Clear the chunks after saving

        // Create a download link
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm"; // Set the file name for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Clean up the DOM
        URL.revokeObjectURL(url); // Free up memory by revoking the URL

        return audioBlob; // Return the Blob for further processing if needed
    };

    // Visualizer logic
    const startVisualizer = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const audioContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256; // Lower fftSize for block visualizer
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const draw = () => {
                if (!canvasRef.current) return;
                const WIDTH = canvas.width;
                const HEIGHT = canvas.height;
                const centerY = HEIGHT / 2; // Midpoint of the canvas

                requestAnimationFrame(draw);
                analyser.getByteFrequencyData(dataArray); // Get frequency data

                ctx.clearRect(0, 0, WIDTH, HEIGHT);
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(0, 0, WIDTH, HEIGHT);

                const barWidth = (WIDTH / bufferLength) * 0.8; // Width of each bar
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i]; // Height of each bar based on frequency

                    // Limit the maximum bar height to a reasonable value
                    const maxBarHeight = HEIGHT * 0.5; // Max height is 50% of the canvas height
                    barHeight = Math.min(barHeight, maxBarHeight);

                    // Create a gradient for each bar
                    const gradient = ctx.createLinearGradient(
                        x,
                        centerY - barHeight / 2,
                        x,
                        centerY + barHeight / 2,
                    );
                    gradient.addColorStop(
                        0,
                        `hsl(${(i / bufferLength) * 360}, 100%, 50%)`,
                    ); // Start color
                    gradient.addColorStop(
                        1,
                        `hsl(${(i / bufferLength) * 360}, 100%, 30%)`,
                    ); // End color

                    ctx.fillStyle = gradient; // Set the gradient as the fill style
                    ctx.fillRect(
                        x,
                        centerY - barHeight / 2,
                        barWidth,
                        barHeight,
                    ); // Center the bar

                    x += barWidth + 1; // Add some space between bars
                }
            };

            draw();
        });
    };

    const stopVisualizer = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas when stopping
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        saveAudio,
        canvasRef,
    };
};

export default useSpeechRecognition;
