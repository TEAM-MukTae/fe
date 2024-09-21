import { Outlet, useLocation, matchPath } from "react-router-dom";
import TabBar from "../display/TabBar";

const RootLayout = () => {
    const location = useLocation();

    const hideTabBarRoutes = [
        "/quiz/:quizId",
        "/solve",
        "/recording",
        "/recording/:recordingId",
        "/upload",
    ];
    const shouldHideTabBar = hideTabBarRoutes.some((route) =>
        matchPath(route, location.pathname),
    );

    return (
        <main className="w-full max-w-[800px] h-screen mx-auto py-5 px-7 pt-10 pb-10">
            <Outlet />
            {!shouldHideTabBar && <TabBar />}
        </main>
    );
};
export default RootLayout;
