import { Outlet } from "react-router-dom";
import TabBar from "../display/TabBar";

const RootLayout = () => {
    return (
        <main className="w-full max-w-[800px] h-screen mx-auto py-5 px-7 pt-10 pb-10">
            <Outlet />
            <TabBar />
        </main>
    );
};
export default RootLayout;
