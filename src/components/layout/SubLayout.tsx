import { Outlet } from "react-router-dom";

import leftArrow from "../../assets/leftArrow.svg";
import home from "../../assets/home.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubLayout = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/recording":
                return t("subLayout.recording");
            case "/quiz":
            case "/quiz/:quizId":
                return t("subLayout.quizList");
            case "/solve":
                return t("subLayout.solveQuiz");
            case "/starred":
                return t("subLayout.starred");
            case "/mypage":
                return t("subLayout.mypage");
            case "/upload":
                return t("subLayout.upload");
            default:
                return "";
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
