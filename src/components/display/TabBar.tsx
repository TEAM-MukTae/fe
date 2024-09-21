import React, { useState, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaQuestionCircle, FaStar, FaUser } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";

import record from "../../assets/record-white.svg";
import quiz from "../../assets/quiz.svg";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MenuProps {
    showToggles: boolean;
    setShowToggles: React.Dispatch<SetStateAction<boolean>>;
}

const MenuToggle: React.FC<MenuProps> = ({ showToggles, setShowToggles }) => {
    const navigate = useNavigate();

    const toggleVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.2, // 요소들이 순차적으로 등장
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <>
            <motion.div
                style={{
                    position: "absolute",
                    top: "-74px",
                    left: "29%",
                }}
                className="flex items-center justify-center"
                variants={toggleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    className="flex items-center justify-center bg-white cursor-pointer"
                    variants={itemVariants}
                    onClick={() => setShowToggles(!showToggles)}
                >
                    <span className="text-black">X</span>
                </motion.div>
                <motion.div
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    onClick={() => {
                        navigate("/recording");
                    }}
                    className="flex items-center justify-center mx-3 cursor-pointer bg-primary mb-9"
                    variants={itemVariants}
                >
                    <img src={record} />
                </motion.div>
                <motion.div
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    className="flex items-center justify-center cursor-pointer bg-primary"
                    variants={itemVariants}
                    onClick={() => navigate("/upload")}
                >
                    <img src={quiz} />
                </motion.div>
            </motion.div>
        </>
    );
};

const TabBar: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<string>(t("tabs.home"));
    const [showToggles, setShowToggles] = useState<boolean>(false);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);

        if (tab === t("tabs.plus")) {
            setShowToggles(!showToggles);
        } else if (tab !== t("tabs.plus")) {
            setShowToggles(false);
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
            <AnimatePresence>
                {showToggles && (
                    <MenuToggle
                        showToggles={showToggles}
                        setShowToggles={setShowToggles}
                    />
                )}
            </AnimatePresence>

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
