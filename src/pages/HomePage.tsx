import React, { CSSProperties } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import bottom from "../assets/chevron-bottom.svg";
import logo from "../assets/logo.svg";

import { useAudio } from "../hooks/useAudio";

import Card from "../components/display/Card";
import FeatureCards from "../components/display/FeatureCard";

export interface Audio {
    id: number;
    title: string;
    keywords: string[];
    starred: boolean;
}

function MainPage() {
    const { t } = useTranslation();

    const { isLoading, isError, audio } = useAudio();
    console.log("audio data", audio);

    const navigate = useNavigate();

    return (
        <div className="pb-10">
            <div className="flex flex-row items-center mb-2">
                <div className="mr-2">
                    <img src={logo} />
                </div>

                <div className="text-gray-500">
                    경북대학교 AI 학습 보조 플랫폼
                </div>
            </div>
            <FeatureCards />

            <div className="flex flex-row items-center justify-end">
                <div className="mr-2 text-gray-600">{t("sort_by_latest")}</div>
                <img src={bottom} />
            </div>

            {isLoading && <div>{t("loading")}</div>}
            {isError && <div>{t("error_occurred")}</div>}

            {Array.isArray(audio) && audio.length > 0 ? (
                audio.map(({ id, title, keywords, starred }: Audio) => (
                    <Card
                        key={id}
                        keyword={
                            Array.isArray(keywords) && keywords.length > 0
                                ? keywords
                                : "No keywords"
                        }
                        isStarred={starred}
                        onClick={() => {
                            navigate(`/recording/${id}`, { state: { id } });
                        }}
                    >
                        {title}
                    </Card>
                ))
            ) : (
                <div>No audio data available</div>
            )}
        </div>
    );
}

export default MainPage;
