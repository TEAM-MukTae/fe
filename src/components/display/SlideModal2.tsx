import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SlideModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSave?: () => void;
}

const SlideModal2: React.FC<SlideModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    onSave,
}) => {
    const { t } = useTranslation();

    return (
        <>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black bg-opacity-50"
                        onClick={onClose}
                    ></div>

                    <motion.div
                        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center p-6 bg-white shadow-lg rounded-t-3xl"
                        initial={{ y: "100%" }}
                        animate={{ y: isOpen ? 0 : "100%" }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        <div className="mb-4 text-xl font-bold text-center align-center">
                            {title}
                        </div>
                        <div className="w-full mb-4">{children}</div>

                        {onSave && (
                            <button
                                onClick={onSave}
                                className="px-6 py-2 mt-4 text-white transition-colors duration-200 rounded-lg shadow-md bg-primary"
                            >
                                {t("uploadPage.save")}
                            </button>
                        )}
                    </motion.div>
                </>
            )}
        </>
    );
};

export default SlideModal2;
