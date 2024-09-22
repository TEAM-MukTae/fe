import { useState } from "react";
import { useTranslation } from "react-i18next";

import languageState from "../context/atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";
import profile from "../assets/profile.svg";

const MyPage = () => {
    const { t, i18n } = useTranslation();

    const setLanguage = useSetRecoilState(languageState);
    const language = useRecoilValue(languageState);

    const [activeTab, setActiveTab] = useState("activity");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const onChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setDropdownOpen(false);
        setLanguage(lang);
    };

    const languageMap: Record<string, string> = {
        ko: "한국어",
        en: "English",
        zh: "中文",
        vi: "Tiếng Việt",
        ru: "Русский",
    };

    return (
        <div className="max-w-[800px] mx-auto pt-10">
            <div className="flex items-center pb-5 border-b border-[#e0e0e0] mb-5">
                <img
                    src={profile}
                    alt="Profile"
                    className="w-[80px] h-[80px] rounded-full mr-5"
                />
                <div>
                    <h2 className="m-0 text-[24px]">먹태깡</h2>
                    <p className="text-[#666] my-[5px]">muktae@knu.ac.kr</p>

                    <div className="flex items-center">
                        <button className="px-4 py-2 mr-4 bg-primary text-white rounded-[5px] transition">
                            {t("profile_edit")}
                        </button>

                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="px-4 py-2 transition bg-white border rounded-md shadow"
                        >
                            {languageMap[language] || t("select_language")}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute mt-2  w-[120px] bg-white border rounded shadow-md">
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => onChangeLanguage("ko")}
                                >
                                    한국어
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => onChangeLanguage("en")}
                                >
                                    English
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => onChangeLanguage("zh")}
                                >
                                    中文
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => onChangeLanguage("vi")}
                                >
                                    Tiếng Việt
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => onChangeLanguage("ru")}
                                >
                                    Русский
                                </button>
                            </div>
                        )}
                    </div>
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
                    {t("my_activity")}
                </button>
                <button
                    className={`py-2 px-5 ${
                        activeTab === "saved"
                            ? "border-b-[2px] border-black font-bold"
                            : "border-b-[2px] border-transparent"
                    } hover:border-black transition`}
                    onClick={() => setActiveTab("saved")}
                >
                    {t("saved_documents")}
                </button>
                <button
                    className={`py-2 px-5 ${
                        activeTab === "settings"
                            ? "border-b-[2px] border-black font-bold"
                            : "border-b-[2px] border-transparent"
                    } hover:border-black transition`}
                    onClick={() => setActiveTab("settings")}
                >
                    {t("settings")}
                </button>
            </div>

            <div className="p-5 bg-white rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                {activeTab === "activity" && (
                    <div>
                        <ul className="pl-5 list-disc">
                            <li>{t("myPage.quiz.ai1")}</li>
                            <li>{t("myPage.quiz.ai2")}</li>
                            <li>{t("myPage.quiz.ai3")}</li>
                        </ul>
                    </div>
                )}
                {activeTab === "saved" && (
                    <div>
                        <ul className="pl-5 list-disc">
                            <li>{t("myPage.record.ai1")}</li>
                            <li>{t("myPage.record.ai2")}</li>
                            <li>{t("myPage.record.ai3")}</li>
                        </ul>
                    </div>
                )}
                {activeTab === "settings" && (
                    <div>
                        <button className="px-5 py-2 bg-primary text-white rounded-[5px] transition">
                            {t("logout")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPage;
