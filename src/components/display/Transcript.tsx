import React from "react";

interface TranscriptProps {
    content: string;
}

const Transcript: React.FC<TranscriptProps> = ({ content }) => {
    return (
        <div className="p-4  w-full mb-4">
            <h3 className="mb-2 text-sm">{content}</h3>
        </div>
    );
};

export default Transcript;
