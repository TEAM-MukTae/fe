import React from "react";
import star from "../../assets/star.svg";

interface CardProps {
    children: any;
    key?: number;
    keyword?: string[] | string;
    isStarred?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    keyword,
    isStarred,
    onClick,
}) => {
    return (
        <div
            className="flex items-center justify-between p-4 my-4 bg-white rounded-lg shadow-md"
            onClick={onClick}
        >
            <div className="flex items-center">
                <div className="ml-3">
                    <p className="font-medium text-gray-900">{children}</p>
                    <p className="text-sm text-gray-500">
                        {/* {keyword?.join(" ")} */}
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
