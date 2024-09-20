import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaQuestionCircle, FaStar, FaUser } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import MenuToggle from "./MenuToggle";
import { useTranslation } from "react-i18next";

const TabBar: React.FC = () => {
    const { t, i18n } = useTranslation();

    const [activeTab, setActiveTab] = useState<string>(t("tabs.home"));
    const [showToggles, setShowToggles] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (tab === t("tabs.plus")) {
            setShowToggles(!showToggles); // Toggle visibility of buttons
        } else {
            setShowToggles(false); // Hide toggle buttons when another tab is clicked
        }
        switch (tab) {
            case t("tabs.home"):
                navigate("/");
                break;
            case t("tabs.quiz"):
                navigate("/quiz");
                break;
            case t("tabs.starred"):
                navigate("/starred");
                break;
            case t("tabs.my"):
                navigate("/mypage");
                break;
            default:
                break;
        }
    };
    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-between p-2 bg-white border-t border-gray-200 rounded-t-lg shadow-md">
            {showToggles && <MenuToggle />}
            {["home", "quiz", "plus", "starred", "my"].map((key) => {
                const tab = t(`tabs.${key}`);

                return (
                    <motion.div
                        key={tab}
                        className={`flex flex-col items-center cursor-pointer flex-1 transition-transform duration-200`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab === t("tabs.plus") ? (
                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                }}
                                className="absolute flex items-center justify-center transform -translate-x-1/2 cursor-pointer -top-2 left-1/2"
                            >
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                    }}
                                    className="flex items-center justify-center cursor-pointer bg-primary"
                                >
                                    <HiPlus className="text-white h-7 w-7" />
                                </div>
                            </div>
                        ) : (
                            <motion.div className="flex items-center justify-center text-gray-600">
                                {tab === t("tabs.home") && (
                                    <FaHome
                                        className="w-5 h-5 text-gray-800"
                                        aria-label="홈"
                                    />
                                )}
                                {tab === t("tabs.quiz") && (
                                    <FaQuestionCircle
                                        className="w-5 h-5 text-gray-800"
                                        aria-label="퀴즈"
                                    />
                                )}
                                {tab === t("tabs.starred") && (
                                    <FaStar
                                        className="w-5 h-5 text-gray-800"
                                        aria-label="즐겨찾기"
                                    />
                                )}
                                {tab === t("tabs.my") && (
                                    <FaUser
                                        className="w-5 h-5 text-gray-800"
                                        aria-label="마이"
                                    />
                                )}
                            </motion.div>
                        )}
                        {tab !== t("tabs.plus") && (
                            <motion.span
                                className={`text-xs font-semibold transition-colors duration-300 ${
                                    activeTab === tab
                                        ? "text-gray-800"
                                        : "text-gray-500"
                                }`}
                            >
                                {tab}
                            </motion.span>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default TabBar;
