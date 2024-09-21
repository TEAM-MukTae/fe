import React, { CSSProperties } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import bottom from "../assets/chevron-bottom.svg";
import logo from "../assets/logo.svg";

import { useAudio } from "../hooks/useAudio";

import Card from "../components/display/Card";

interface FeatureCardProps {
    backgroundColor: string;
    title: string;
    description: string;
    icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    backgroundColor,
    title,
    description,
    icon,
}) => (
    <div
        className={`rounded-lg p-4 text-white ${backgroundColor} w-40 h-40 flex flex-col flex-shrink-0 mr-4`}
    >
        <div className="text-sm">{title}</div>
        <div className="text-sm">{description}</div>
        <div className="mt-3 text-7xl text-end">{icon}</div>
    </div>
);

const FeatureCards = () => {
    const { t } = useTranslation();

    const features = [
        {
            backgroundColor: "bg-primary",
            title: t("feature_cards.card1.title"),
            description: t("feature_cards.card1.description"),
            icon: "🦫",
        },
        {
            backgroundColor: "bg-secondary",
            title: t("feature_cards.card2.title"),
            description: t("feature_cards.card2.description"),
            icon: "🤖",
        },
        {
            backgroundColor: "bg-tertiary",
            title: t("feature_cards.card3.title"),
            description: t("feature_cards.card3.description"),
            icon: "🗣️",
        },
    ];

    return (
        <div
            className="mb-6 overflow-x-auto"
            style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
            }}
        >
            <div
                className="flex pb-4"
                style={
                    {
                        "::-webkit-scrollbar": {
                            display: "none",
                        },
                    } as CSSProperties
                }
            >
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </div>
    );
};

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
            <div className="flex flex-row mb-2">
                <div className="mr-2">
                    <img src={logo} />
                </div>

                <div className="mr-2">경북대학교 AI 학습 보조 플랫폼</div>
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
