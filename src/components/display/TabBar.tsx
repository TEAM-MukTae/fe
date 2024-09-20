import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaQuestionCircle, FaStar, FaUser } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import MenuToggle from "./MenuToggle";

const TabBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("홈");
    const [showToggles, setShowToggles] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (tab === "플러스") {
            setShowToggles(!showToggles); // Toggle visibility of buttons
        } else {
            setShowToggles(false); // Hide toggle buttons when another tab is clicked
        }
        switch (tab) {
            case "홈":
                navigate("/");
                break;
            case "퀴즈":
                navigate("/quiz");
                break;
            case "즐겨찾기":
                navigate("/starred");
                break;
            case "마이":
                navigate("/mypage");
                break;
            default:
                break;
        }
    };

    return (
        <div className="bg-white shadow-md fixed bottom-0 left-0 right-0 p-2 flex justify-between rounded-t-lg z-10 border-t border-gray-200">
            {showToggles && <MenuToggle />}
            {["홈", "퀴즈", "플러스", "즐겨찾기", "마이"].map((tab) => (
                <motion.div
                    key={tab}
                    className={`flex flex-col items-center cursor-pointer flex-1 transition-transform duration-200`}
                    onClick={() => handleTabClick(tab)}
                    whileHover={{ scale: 1.05 }}
                >
                    {tab === "플러스" ? (
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            }}
                            className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center cursor-pointer"
                        >
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                }}
                                className="bg-primary flex items-center justify-center cursor-pointer"
                            >
                                <HiPlus className="h-7 w-7 text-white" />
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            className={`flex items-center justify-center ${
                                activeTab === tab
                                    ? "text-gray-800" // Darker color for active tab
                                    : "text-gray-400" // Lighter color for inactive tabs
                            }`}
                        >
                            {tab === "홈" && (
                                <FaHome className="h-5 w-5" aria-label="홈" />
                            )}
                            {tab === "퀴즈" && (
                                <FaQuestionCircle
                                    className="h-5 w-5"
                                    aria-label="퀴즈"
                                />
                            )}
                            {tab === "즐겨찾기" && (
                                <FaStar
                                    className="h-5 w-5"
                                    aria-label="즐겨찾기"
                                />
                            )}
                            {tab === "마이" && (
                                <FaUser className="h-5 w-5" aria-label="마이" />
                            )}
                        </motion.div>
                    )}
                    {tab !== "플러스" && (
                        <motion.span
                            className={`text-xs font-semibold transition-colors duration-300 ${
                                activeTab === tab
                                    ? "text-gray-800" // Bold for the active tab
                                    : "text-gray-500" // Gray for inactive tabs
                            }`}
                        >
                            {tab}
                        </motion.span>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default TabBar;
