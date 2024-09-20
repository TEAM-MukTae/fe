import React, { CSSProperties } from "react";

import Card from "../components/display/Card";
import bottom from "../assets/chevron-bottom.svg";
import { useAllAudio } from "../hooks/useAllAudio";
import { useNavigate } from "react-router-dom";

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
    const features = [
        {
            backgroundColor: "bg-primary",
            title: "이제 불편없이",
            description: "평등하게 학습하세요",
            icon: "🦫",
        },
        {
            backgroundColor: "bg-secondary",
            title: "인공지능 요약으로",
            description: "학습 효율을 높이세요",
            icon: "🤖",
        },
        {
            backgroundColor: "bg-tertiary",
            title: "기출문제를 통해",
            description: "복습하세요",
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

type Audio = {
    id: number;
    title: string;
    keyword: string[];
    isStarred: boolean;
};

type DummyData = {
    allAudio: Audio[];
};

const dummy: DummyData = {
    allAudio: [
        {
            id: 0,
            title: "제목",
            keyword: ["아빠", "엄마", "효도"],
            isStarred: true,
        },
        {
            id: 1,
            title: "제목",
            keyword: ["아빠", "엄마", "효도"],
            isStarred: true,
        },
        {
            id: 3,
            title: "제목",
            keyword: ["아빠", "엄마", "효도"],
            isStarred: true,
        },
    ],
};

function MainPage() {
    const { isLoading, isError, allAudio } = useAllAudio();

    const navigate = useNavigate();

    return (
        <div className="pb-10">
            <FeatureCards />

            <div className="flex flex-row items-center justify-end">
                <div className="mr-2 text-gray-600">최신순</div>
                <img src={bottom} />
            </div>

            {isLoading && <div>Loading...</div>}
            {isError && <div>오류가 발생했습니다.</div>}

            {dummy.allAudio.map(({ id, title, keyword }: Audio) => (
                <Card
                    key={id}
                    keyword={keyword}
                    onClick={() =>
                        navigate(`/recording/${id}`, { state: { id } })
                    }
                >
                    {title}
                </Card>
            ))}
        </div>
    );
}

export default MainPage;
