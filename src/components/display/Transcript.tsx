import React from "react";

interface TranscriptProps {
    content: string;
}

const Transcript: React.FC<TranscriptProps> = ({ content }) => {
    return (
        <div className="p-4  w-full mb-4">
            <h3 className="mb-2 text-sm">
                {content === ""
                    ? "녹음이 시작되면, 실시간으로 글이 번역됩니다."
                    : content}
            </h3>
        </div>
    );
};

export default Transcript;
