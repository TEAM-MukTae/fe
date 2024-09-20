/* eslint-disable no-undef */
const BACKGROUND_WIDTH = {
    280: "280px",
    320: "320px",
    360: "360px",
    420: "420px",
};

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#E30513",
                secondary: "#FF989E",
                tertiary: "#FFDEE0",
            },
            fontSize: {},
            fontFamily: {
                sans: [
                    '"Pretendard Variable"',
                    "Pretendard",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "system-ui",
                    "Roboto",
                    '"Helvetica Neue"',
                    '"Segoe UI"',
                    '"Apple SD Gothic Neo"',
                    '"Noto Sans KR"',
                    '"Malgun Gothic"',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    "sans-serif",
                ],
            },
        },
        maxWidth: { ...BACKGROUND_WIDTH },
        minWidth: { ...BACKGROUND_WIDTH },
        width: { ...BACKGROUND_WIDTH },
    },
    plugins: [],
};
