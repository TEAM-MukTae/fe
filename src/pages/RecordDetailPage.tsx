import { useLocation } from "react-router-dom";
import { useAudioDetail } from "../hooks/useAudioDetail";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const dummy = {
    data: [
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
    ],
};

type AudioDetail = {
    id: number;
    script: string[];
    url: string;
};

function RecordDetailPage() {
    const location = useLocation();
    const { t } = useTranslation();
    const { id } = location.state || {};

    const [activeTab, setActiveTab] = useState<string>("script");

    const { isLoading, isError, audioDetail } = useAudioDetail(id);

    if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>오류가 발생했습니다.</div>;

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="flex justify-around border-b">
                <button
                    className={`py-2 px-4 text-center flex-1 font-bold ${
                        activeTab === "script"
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("script")}
                >
                    {t("recordDetail.script")}
                </button>
                <button
                    className={`py-2 px-4 text-center flex-1 font-bold ${
                        activeTab === "summary"
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                    }`}
                    onClick={() => handleTabClick("summary")}
                >
                    {t("recordDetail.summary")}
                </button>
            </div>

            <div
                className="p-4 bg-gray-100 "
                style={{ paddingBottom: "100px" }}
            >
                {activeTab === "script" && (
                    <>
                        {dummy.data.map(({ id, script, url }: AudioDetail) => (
                            <div key={id} className="mt-1">
                                {script.map((line, index) => (
                                    <div key={index} className="mt-4">
                                        {line}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                )}
                {activeTab === "summary" && (
                    <div>{t("recordDetail.summaryPreparing")}</div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0">
                <AudioPlayer
                    autoPlay
                    src="http://example.com/audio.mp3"
                    onPlay={(e) => console.log("onPlay")}
                    style={{ width: "100vw" }}
                />
            </div>
        </>
    );
}

export default RecordDetailPage;
