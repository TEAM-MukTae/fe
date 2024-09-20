import React, { useState } from "react";
import star from "../../assets/star.svg";

interface CardProps {
    children: React.ReactNode;
    key?: number;
    keyword?: string[] | string;
    isStarred?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    keyword,
    isStarred,
    isSelected,
    onClick,
}) => {
    return (
        <div
            className={`flex items-center justify-between p-4 my-4 rounded-lg shadow-md ${
                isSelected ? "bg-tertiary" : "bg-white"
            }`}
            onClick={onClick}
        >
            <div className="flex items-center">
                <div>
                    <p className="font-medium text-gray-900">{children}</p>
                    <p className="text-sm text-gray-500">
                        {Array.isArray(keyword)
                            ? keyword.join(", ")
                            : keyword || ""}
                    </p>
                </div>
            </div>

            {isStarred && (
                <div>
                    <img src={star} />
                </div>
            )}
        </div>
    );
};

export default Card;
