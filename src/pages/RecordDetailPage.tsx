import { useLocation } from "react-router-dom";
import { useAudioDetail } from "../hooks/useAudioDetail";
import Card from "../components/display/Card";

const dummy = {
    data: [
        {
            id: 0,
            script: ["안녕하세요.", "hello", "hi", "안녕"],
            url: "http://naver.com",
        },
    ],
};

type AudioDetail = {
    id: number;
    script: string[];
    url: string;
};

function RecordDetailPage() {
    const location = useLocation();
    const { id } = location.state || {};

    const { isLoading, isError, audioDetail } = useAudioDetail(id);

    if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>오류가 발생했습니다.</div>;

    return (
        <div className="mt-5">
            <div>{id}</div>
            {dummy.data.map(({ id, script, url }: AudioDetail) => (
                <div key={id} className="mt-5">
                    {script.map((line, index) => (
                        <div key={index} className="mt-4">
                            {line}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default RecordDetailPage;
