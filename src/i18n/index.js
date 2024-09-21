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
                profile_edit: "Edit",
                my_activity: "Recent",
                saved_documents: "Saved",
                settings: "Setting",
                tabs: {
                    home: "home",
                    quiz: "quiz",
                    plus: "plus",
                    starred: "favorites",
                    my: "my",
                },
                quiz: {
                    correctAnswers: "Correct Answers",
                    previous: "Previous Question",
                    next: "Next Question",
                    showResults: "View Results",
                    congratulations: "Well Done!",
                    correct: "Correct!",
                    incorrect: "Incorrect!",
                    correctAnswer: "Correct Answer",
                    retry: "Retry",
                    confirm: "Confirm",
                },
                subLayout: {
                    recording: "AI 학습 보조",
                    quizList: "Quiz List",
                    solveQuiz: "Quiz",
                    starred: "Favorites",
                    mypage: "My page",
                    upload: "Upload",
                },
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
                tabs: {
                    home: "홈",
                    quiz: "퀴즈",
                    plus: "플러스",
                    starred: "즐겨찾기",
                    my: "마이",
                },
                quiz: {
                    correctAnswers: "맞힌 문제",
                    previous: "이전 문제",
                    next: "다음 문제",
                    showResults: "결과 보기",
                    congratulations: "수고하셨습니다!",
                    correct: "정답입니다!",
                    incorrect: "오답입니다!",
                    correctAnswer: "정답",
                    retry: "다시 풀기",
                    confirm: "확인",
                },
                recordDetail: {
                    script: "스크립트",
                    summary: "요약",
                    loading: "로딩 중...",
                    error: "오류가 발생했습니다.",
                    summaryPreparing: "요약 준비중...",
                },
                uploadPage: {
                    audio: "녹음 파일",
                    file: "강의 자료",
                    selectFile: "파일을 선택하세요.",
                    upload: "업로드",
                    generateQuiz: "퀴즈 생성하기",
                },
                subLayout: {
                    recording: "AI 학습 보조",
                    quizList: "퀴즈 목록",
                    solveQuiz: "퀴즈 풀기",
                    starred: "즐겨찾기",
                    mypage: "마이 페이지",
                    upload: "파일 업로드",
                },
                menuToggle: {
                    close: "닫기",
                    record: "녹음",
                    createQuiz: "문제 생성",
                },
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
                tabs: {
                    home: "主页",
                    quiz: "测验",
                    plus: "添加",
                    starred: "收藏",
                    my: "我的",
                },
                quiz: {
                    correctAnswers: "正确答案",
                    previous: "上一题",
                    next: "下一题",
                    showResults: "查看结果",
                    congratulations: "恭喜你！",
                    correct: "正确！",
                    incorrect: "错误！",
                    correctAnswer: "正确答案",
                    retry: "再试一次",
                    confirm: "确认",
                },
                recordDetail: {
                    script: "脚本",
                    summary: "摘要",
                    loading: "加载中...",
                    error: "发生错误。",
                    summaryPreparing: "摘要准备中...",
                },
                uploadPage: {
                    audio: "录音文件",
                    file: "讲义资料",
                    selectFile: "请选择文件。",
                    upload: "上传",
                    generateQuiz: "生成测验",
                },
                subLayout: {
                    recording: "AI 学习辅助",
                    quizList: "测验列表",
                    solveQuiz: "解决测验",
                    starred: "收藏夹",
                    mypage: "我的页面",
                    upload: "文件上传",
                },
                menuToggle: {
                    close: "关闭",
                    record: "录音",
                    createQuiz: "创建问题",
                },
            },
        },
        vi: {
            translation: {
                feature_cards: {
                    card1: {
                        title: "Không còn lo lắng",
                        description: "Học tập bình đẳng",
                    },
                    card2: {
                        title: "Tóm tắt bằng AI",
                        description: "Tăng hiệu quả học tập",
                    },
                    card3: {
                        title: "Ôn tập qua đề thi cũ",
                        description: "Ôn luyện kỹ càng",
                    },
                },
                sort_by_latest: "Sắp xếp theo mới nhất",
                loading: "Đang tải...",
                error_occurred: "Đã xảy ra lỗi",
                profile_edit: "Chỉnh sửa hồ sơ",
                select_language: "Chọn ngôn ngữ",
                my_activity: "Hoạt động gần đây",
                saved_documents: "Tài liệu đã lưu",
                settings: "Cài đặt",
                tabs: {
                    home: "Trang chủ",
                    quiz: "Trắc nghiệm",
                    plus: "Thêm",
                    starred: "Đã đánh dấu",
                    my: "Của tôi",
                },
                quiz: {
                    correctAnswers: "Đáp án đúng",
                    previous: "Câu trước",
                    next: "Câu tiếp theo",
                    showResults: "Xem kết quả",
                    congratulations: "Chúc mừng bạn!",
                    correct: "Chính xác!",
                    incorrect: "Sai!",
                    correctAnswer: "Đáp án đúng",
                    retry: "Thử lại",
                    confirm: "Xác nhận",
                },
                recordDetail: {
                    script: "Kịch bản",
                    summary: "Tóm tắt",
                    loading: "Đang tải...",
                    error: "Đã xảy ra lỗi.",
                    summaryPreparing: "Đang chuẩn bị tóm tắt...",
                },
                uploadPage: {
                    audio: "Tệp âm thanh",
                    file: "Tài liệu giảng dạy",
                    selectFile: "Vui lòng chọn tệp.",
                    upload: "Tải lên",
                    generateQuiz: "Tạo trắc nghiệm",
                },
                subLayout: {
                    recording: "Hỗ trợ học tập AI",
                    quizList: "Danh sách trắc nghiệm",
                    solveQuiz: "Giải trắc nghiệm",
                    starred: "Danh sách yêu thích",
                    mypage: "Trang của tôi",
                    upload: "Tải tệp lên",
                },
                menuToggle: {
                    close: "Đóng",
                    record: "Ghi âm",
                    createQuiz: "Tạo câu hỏi",
                },
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
