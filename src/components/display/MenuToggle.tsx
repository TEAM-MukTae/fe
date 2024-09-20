import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MenuToggle: React.FC = () => {
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
                    <span className="text-white">녹음</span>
                </motion.div>
                <motion.div
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    className="flex items-center justify-center cursor-pointer bg-secondary"
                    variants={itemVariants}
                    onClick={() => navigate("/upload")}
                >
                    <span className="text-white">
                        문제
                        <br />
                        생성
                    </span>
                </motion.div>
            </motion.div>
        </>
    );
};

export default MenuToggle;
