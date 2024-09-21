import { useLocation } from "react-router-dom";
import { useAudioDetail } from "../hooks/useAudioDetail";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export interface AudioDetail {
    id: number;
    text: string;
    summary: string;
    voiceUrl: string;
}

function RecordDetailPage() {
    const location = useLocation();
    const { t } = useTranslation();
    const { id } = location.state || {};

    const { isLoading, isError, audioDetail } = useAudioDetail(id);

    const [activeTab, setActiveTab] = useState<string>("script");
    const [url, setUrl] = useState<string>("");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            {isLoading && <div>{t("loading")}</div>}
            {isError && <div>{t("error_occurred")}</div>}

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

            <div className="p-4 bg-gray-100" style={{ paddingBottom: "100px" }}>
                {activeTab === "script" && audioDetail && (
                    <div className="mt-1">{audioDetail.text}</div>
                )}

                {activeTab === "summary" && audioDetail && (
                    <div className="mt-1">{audioDetail.summary}</div>
                )}

                {activeTab === "summary" && !audioDetail && (
                    <div>{t("recordDetail.summaryPreparing")}</div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0">
                <AudioPlayer
                    autoPlay
                    src={url}
                    onPlay={(e) => console.log("onPlay")}
                    style={{ width: "100vw" }}
                />
            </div>
        </>
    );
}

export default RecordDetailPage;
