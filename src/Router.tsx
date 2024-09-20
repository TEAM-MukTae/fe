import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecordingPage from "./pages/RecordingPage";
import QuizPage from "./pages/QuizPage";
import RootLayout from "./components/layout/RootLayout";
import SolvePage from "./pages/SolvePage";
import StarredPage from "./pages/StarredPage";
import MyPage from "./pages/MyPage";
import SubLayout from "./components/layout/SubLayout";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />}></Route>

                <Route path="/" element={<SubLayout />}>
                    <Route
                        path="/recording"
                        element={<RecordingPage />}
                    ></Route>
                    <Route path="/quiz" element={<QuizPage />}></Route>
                    <Route path="/quiz/:quizId" element={<SolvePage />} />
                    <Route path="/solve" element={<SolvePage />}></Route>
                    <Route path="/starred" element={<StarredPage />}></Route>
                    <Route path="/mypage" element={<MyPage />}></Route>
                </Route>
            </Route>
        </Routes>
    );
};
