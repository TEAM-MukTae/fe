import { useState, useEffect, useCallback, useRef } from "react";

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
    const recognitionRef = useRef<SpeechRecognition | null>(null);
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

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = "";
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + " ";
                } else {
                    interimTranscript += event.results[i][0].transcript + " "; // Collect interim results
                }
            }

            setTranscript(finalTranscript + interimTranscript); // Update with final and interim transcripts
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);
            startVisualizer();
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            stopVisualizer();
        }
    }, []);

    // Visualizer logic for block style with center alignment
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
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.fillRect(0, 0, WIDTH, HEIGHT);

                const barWidth = (WIDTH / bufferLength) * 0.8; // Width of each bar
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i]; // Height of each bar based on frequency

                    // Limit the maximum bar height to a reasonable value
                    const maxBarHeight = HEIGHT * 0.5; // Max height is 50% of the canvas height
                    barHeight = Math.min(barHeight, maxBarHeight);

                    ctx.fillStyle = "rgb(255, 0, 0)"; // Red blocks
                    ctx.fillRect(
                        x,
                        centerY - barHeight / 2, // Center the bar
                        barWidth,
                        barHeight,
                    );

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
        canvasRef,
    };
};

export default useSpeechRecognition;
