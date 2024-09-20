import React, { useState } from "react";

const MyPage = () => {
    const [activeTab, setActiveTab] = useState("activity");

    return (
        <div className="max-w-[800px] mx-auto p-5 bg-[#f9f9f9] rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <div className="flex items-center pb-5 border-b border-[#e0e0e0] mb-5">
                <img
                    src="/path-to-profile-image.jpg"
                    alt="Profile"
                    className="w-[80px] h-[80px] rounded-full mr-5"
                />
                <div>
                    <h2 className="m-0 text-[24px]">먹태깡</h2>
                    <p className="text-[#666] my-[5px]">muktae@knu.ac.kr</p>
                    <button className="px-4 py-2 bg-primary text-white rounded-[5px] transition">
                        프로필 편집
                    </button>
                </div>
            </div>

            <div className="flex justify-around mb-5">
                <button
                    className={`py-2 px-5 ${
                        activeTab === "activity"
                            ? "border-b-[2px] border-black font-bold"
                            : "border-b-[2px] border-transparent"
                    } hover:border-black transition`}
                    onClick={() => setActiveTab("activity")}
                >
                    내 활동
                </button>
                <button
                    className={`py-2 px-5 ${
                        activeTab === "saved"
                            ? "border-b-[2px] border-black font-bold"
                            : "border-b-[2px] border-transparent"
                    } hover:border-black transition`}
                    onClick={() => setActiveTab("saved")}
                >
                    저장한 문서
                </button>
                <button
                    className={`py-2 px-5 ${
                        activeTab === "settings"
                            ? "border-b-[2px] border-black font-bold"
                            : "border-b-[2px] border-transparent"
                    } hover:border-black transition`}
                    onClick={() => setActiveTab("settings")}
                >
                    설정
                </button>
            </div>

            <div className="p-5 bg-white rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                {activeTab === "activity" && (
                    <div>
                        <h3 className="text-[20px] mb-4">최근 활동</h3>
                        <ul className="pl-5 list-disc">
                            <li>인공지능 Ch1 퀴즈</li>
                            <li>인공지능 Ch2 퀴즈</li>
                            <li>인공지능 Ch3 퀴즈</li>
                        </ul>
                    </div>
                )}
                {activeTab === "saved" && (
                    <div>
                        <h3 className="text-[20px] mb-4">저장한 문서</h3>
                        <ul className="pl-5 list-disc">
                            <li>인공지능 9/18 녹음</li>
                            <li>인공지능 9/20 녹음</li>
                            <li>인공지능 9/21 녹음</li>
                        </ul>
                    </div>
                )}
                {activeTab === "settings" && (
                    <div>
                        <h3 className="text-[20px] mb-4">설정</h3>
                        <button className="px-5 py-2 bg-primary text-white rounded-[5px]  transition">
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPage;
