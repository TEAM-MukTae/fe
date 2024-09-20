import { Outlet } from "react-router-dom";

import leftArrow from "../../assets/leftArrow.svg";
import home from "../../assets/home.svg";
import { useNavigate, useLocation } from "react-router-dom";

const SubLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/recording":
                return "AI 학습 보조";
            case "/quiz":
            case "/quiz/:quizId":
                return "퀴즈 목록";
            case "/solve":
                return "퀴즈 풀기";
            case "/starred":
                return "즐겨찾기";
            case "/mypage":
                return "마이 페이지";
        }
    };

    return (
        <>
            <div className="flex justify-between">
                <img src={leftArrow} alt="Back" onClick={() => navigate(-1)} />
                <div className="text-lg font-medium">{getTitle()}</div>
                <img src={home} alt="Home" onClick={() => navigate("/")} />
            </div>

            <Outlet />
        </>
    );
};
export default SubLayout;
