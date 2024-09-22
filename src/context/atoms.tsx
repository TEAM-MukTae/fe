import { atom } from "recoil";

const languageState = atom({
    key: "languageState",
    default: "ko",
});

export default languageState;
