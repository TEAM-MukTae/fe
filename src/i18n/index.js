import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                feature_cards: {
                    card1: {
                        title: "Now without inconvenience",
                        description: "Study equally",
                    },
                    card2: {
                        title: "Increase efficiency",
                        description: "Study with AI summary",
                    },
                    card3: {
                        title: "Review with past papers",
                        description: "Learn from experience",
                    },
                },
                sort_by_latest: "Sort by latest",
                loading: "Loading...",
                error_occurred: "An error occurred",
                my_activity: "Recent",
                saved_documents: "Saved",
                settings: "Setting",
                home: "home",
                quiz: "quiz",
                plus: "plus",
                starred: "starred",
                mypage: "mypage",
            },
        },
        ko: {
            translation: {
                feature_cards: {
                    card1: {
                        title: "이제 불편없이",
                        description: "평등하게 학습하세요",
                    },
                    card2: {
                        title: "인공지능 요약으로",
                        description: "학습 효율을 높이세요",
                    },
                    card3: {
                        title: "기출문제를 통해",
                        description: "복습하세요",
                    },
                },
                sort_by_latest: "최신순",
                loading: "로딩 중...",
                error_occurred: "오류가 발생했습니다.",

                profile_edit: "프로필 수정",
                select_language: "언어 선택",
                my_activity: "최근 활동",
                saved_documents: "저장한 문서",
                settings: "설정",
            },
        },
        zh: {
            translation: {
                feature_cards: {
                    card1: {
                        title: "现在无需烦恼",
                        description: "平等地学习",
                    },
                    card2: {
                        title: "通过人工智能总结",
                        description: "提高学习效率",
                    },
                    card3: {
                        title: "通过往年试题",
                        description: "进行复习",
                    },
                },
                sort_by_latest: "按最新排序",
                loading: "加载中...",
                error_occurred: "发生错误",
                profile_edit: "编辑个人资料",
                select_language: "选择语言",
                my_activity: "最近活动",
                saved_documents: "保存的文档",
                settings: "设置",
            },
        },
    },
    lng: "ko", // 기본 언어 설정
    fallbackLng: "en", // 번역을 찾지 못했을 때 사용할 언어
    interpolation: {
        escapeValue: false, // React는 기본적으로 XSS 방지를 위해 이스케이프를 처리합니다.
    },
});

export default i18n;
