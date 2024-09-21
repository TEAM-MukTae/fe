import React, { useState, useEffect, CSSProperties } from "react";
import { useTranslation } from "react-i18next";

const animationStyles = {
    bounce: {
        animation: "bounce 2s infinite",
    },
    rotate: {
        animation: "rotate 3s linear infinite",
    },
    wave: {
        animation: "wave 2.5s infinite",
    },
};

const keyframes = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes wave {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
        60% { transform: rotate(0deg); }
        100% { transform: rotate(0deg); }
    }
`;

interface FeatureCardProps {
    backgroundColor: string;
    title: string;
    description: string;
    icon: string;
    animationType: "bounce" | "rotate" | "wave";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    backgroundColor,
    title,
    description,
    icon,
    animationType,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`rounded-md p-4 text-white w-40 h-40 flex flex-col flex-shrink-0 mr-4 transition-opacity duration-500 ${backgroundColor}`}
            style={{
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="text-sm">{title}</div>
            <div className="text-sm">{description}</div>
            <div
                className="mt-3 text-5xl text-right"
                style={animationStyles[animationType]}
            >
                {icon}
            </div>
        </div>
    );
};

const FeatureCards = () => {
    const { t } = useTranslation();

    const features = [
        {
            backgroundColor: "bg-primary",
            title: t("feature_cards.card1.title"),
            description: t("feature_cards.card1.description"),
            icon: "📖",
            animationType: "bounce" as const,
        },
        {
            backgroundColor: "bg-secondary",
            title: t("feature_cards.card2.title"),
            description: t("feature_cards.card2.description"),
            icon: "🤖",
            animationType: "rotate" as const,
        },
        {
            backgroundColor: "bg-tertiary",
            title: t("feature_cards.card3.title"),
            description: t("feature_cards.card3.description"),
            icon: "💡",
            animationType: "wave" as const,
        },
    ];

    return (
        <>
            <style>{keyframes}</style>
            <div
                style={{
                    marginBottom: "1.5rem",
                    overflowX: "auto",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        paddingBottom: "1rem",
                    }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FeatureCards;
