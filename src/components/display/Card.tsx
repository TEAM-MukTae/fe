import React, { useState } from "react";
import star from "../../assets/star.svg";

interface CardProps {
    children: React.ReactNode;
    key?: number;
    keyword?: string[] | string;
    date?: string;
    isStarred?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    keyword,
    date,
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
                    <p className="text-sm text-gray-600">{date}</p>

                    <p className="text-sm text-gray-500">
                        {Array.isArray(keyword)
                            ? keyword.map((kw, index) => (
                                  <button
                                      key={index}
                                      className="px-3 py-1 mt-1 mr-1 text-sm text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300"
                                  >
                                      {kw}
                                  </button>
                              ))
                            : keyword && (
                                  <button className="px-3 py-1 mt-1 mr-1 text-sm text-gray-800 bg-gray-200 rounded-full hover:bg-gray-300">
                                      {keyword}
                                  </button>
                              )}
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
