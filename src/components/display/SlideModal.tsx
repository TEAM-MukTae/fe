import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SlideModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    saveAudio: () => void; // Add saveAudio prop
}

const SlideModal: React.FC<SlideModalProps> = ({
    isOpen,
    onClose,
    content,
    saveAudio,
}) => {
    const navigate = useNavigate();
    const [showConfirmSave, setShowConfirmSave] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    const handleConfirm = () => {
        setShowConfirmSave(true); // 첫 번째 모달에서 확인을 클릭하면 저장 여부 모달 표시
    };

    const handleSaveConfirmation = async (shouldSave: boolean) => {
        if (shouldSave) {
            saveAudio(); // Call saveAudio
            /**
             * 서버로 보내는 로직 추가.
             */
            setShowSuccessModal(true); // 성공 모달 표시
            setTimeout(() => {
                navigate("/"); // 2초 후 홈으로 이동
            }, 2000);
        }
        setShowConfirmSave(false); // 두 번째 모달 닫기
    };

    return (
        <>
            {isOpen && !showConfirmSave && !showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-sm"
                    >
                        <h2 className="text-lg font-bold mb-2">
                            🎉 녹음을 성공적으로 마쳤습니다!
                        </h2>
                        <p className="text-sm mb-4">{content}</p>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleConfirm}
                                className="p-2 bg-blue-500 text-white rounded transition hover:bg-blue-600"
                            >
                                확인
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 bg-gray-300 rounded transition hover:bg-gray-400"
                            >
                                취소
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            {showConfirmSave && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-sm"
                    >
                        <h2 className="text-lg font-bold mb-2">
                            📥 해당 내용을 정상적으로 저장하시겠습니까?
                        </h2>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleSaveConfirmation(true)} // 예 클릭 시 저장
                                className="p-2 bg-blue-500 text-white rounded transition hover:bg-blue-600"
                            >
                                예
                            </button>
                            <button
                                onClick={() => handleSaveConfirmation(false)} // 아니요 클릭 시 확인
                                className="p-2 bg-red-500 text-white rounded transition hover:bg-red-600"
                            >
                                아니요
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-sm"
                    >
                        <h2 className="text-lg font-bold mb-2">
                            ✅ 성공적으로 서버로 전송되었습니다!
                        </h2>
                        <p className="text-sm">
                            내용을 요약하는데 시간이 걸릴 수 있습니다.
                        </p>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default SlideModal;
