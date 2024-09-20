import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import upload from "../../assets/upload.svg";
import Button from "./Button";
import ToastPopup from "./ToastPopup";

const MenuToggle: React.FC = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toast, setToast] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleGenerateQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);

        if (!fileName) {
            if (!fileName) {
                setIsLoading(false);
                setToastMessage("파일을 선택하세요.");
                setToast(true);
                return;
            }
        }

        navigate("/solve");
    };

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
            {toast && (
                <ToastPopup
                    setToast={setToast}
                    message={toastMessage}
                    position="bottom"
                />
            )}

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
                    onClick={() => setOpenModal(true)}
                >
                    <span className="text-white">
                        문제
                        <br />
                        생성
                    </span>

                    <Modal
                        isOpen={openModal}
                        onRequestClose={() => setOpenModal(false)}
                        ariaHideApp={false}
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                            content: {
                                height: "30vh",
                                margin: "auto",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "10px",
                                background: "#fff",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                        contentLabel="Pop up Message"
                        shouldCloseOnOverlayClick={false}
                    >
                        <div className="mb-3 text-xl font-semibold">
                            학습 자료를 업로드하세요.
                        </div>
                        <label
                            htmlFor="fileElem"
                            className="flex items-center"
                            onClick={() => setOpenModal(true)}
                            no-outline
                        >
                            <img src={upload} alt="upload" className="mr-2" />
                            <span className="font-semibold text-primary">
                                {fileName ? `${fileName}` : "업로드"}
                            </span>
                        </label>

                        <input
                            type="file"
                            id="fileElem"
                            multiple
                            accept=".pdf, .jpg, .jpeg, .png, .ppt, .pptx"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div className="mt-4">
                            <Button
                                width="20px"
                                height="10px"
                                onClick={handleGenerateQuiz}
                                isLoading={isLoading}
                            >
                                기출 문제 생성
                            </Button>
                        </div>
                    </Modal>
                </motion.div>
            </motion.div>
        </>
    );
};

export default MenuToggle;
