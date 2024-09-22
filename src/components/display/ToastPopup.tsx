import React, { useEffect } from "react";

export default function ToastPopup({
    message,
    setToast,
    position,
}: {
    message: string;
    setToast: React.Dispatch<React.SetStateAction<boolean>>;
    position: "top" | "bottom";
}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [setToast]);

    return (
        <div
            className={`fixed z-50 flex h-16 w-[90%] max-w-[73rem] items-center justify-center rounded-full bg-primary opacity-97 shadow-md ${
                position === "top"
                    ? "animate-toast-top top-4"
                    : "animate-toast-bottom bottom-4"
            }`}
            style={{ left: "50%", transform: "translateX(-50%)" }}
        >
            <p className="font-bold text-white">{message}</p>
        </div>
    );
}
