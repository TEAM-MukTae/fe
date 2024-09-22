import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from "recoil";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
