// css
import "./Crawling.css";

// hook
import {usePublicApi} from "../api/publicApi.jsx";
import {useEffect, useState} from "react";

// component
import News from "../components/News.jsx";

// 백엔드에서 한 번에 처리하되, 비동기(CompletableFuture)로 각 포털을 병렬 크롤링하는 방식.
const Crawling = () => {
    const publicApi = usePublicApi(); // api 요청
    const [loading, setLoading] = useState(true);
    const [naver, setNaver] = useState();
    const [daum, setDaum] = useState()
    const [google, setGoogle] = useState()
    const [nate, setNate] = useState();
    const [testWord, setTestWord] = useState({
        "경제": 25,
        "기술": 13,
        "정치": 10,
        "인공지능": 12,
        "사회": 2,
    });

    const crawlingRequest = async () => {
        try {
            const response = await publicApi({
                method: "GET",
                url: "/api/crawl",
            });
            console.log("response:", response);
            setNaver(response.data.naver);
            setDaum(response.data.daum);
            setGoogle(response.data.google);
            setNate(response.data.nate);
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        crawlingRequest();
    }, []);

    // === 워드 클라우드 옵션 설정 === //
    const options = {
        rotation: 2, // 단어 회전 각도 ( 0: 수평만, 2: 수직/수평 등)
        rotationAngle: [0, 90], // 회전 각도
        fontSizes: [20, 60], // 폰트 사이즈 최소, 최대
        padding: 2, // 단어 간격
        fontFamily: "Noto Sans KR", // 한글 폰트 css 로 설정 가능
        deterministic: true, // 동일 데이터에 대해 고정된 레이아웃
    };


    if (loading) { // 로딩중인 경우
        return <div>로딩중...</div>;
    }
    return (
        <div className={"Crawling"}>
            {/* 워드 클라우드 */}
            <section className={"Crawling-wordCloud"}>
                <ReactWordCloud words={testWord} options={options} />
            </section>


            {/* 네이버 뉴스*/}
            <section className={"Crawling-news"}>
                <h2 className={"Crawling-news-source Crawling-news-Naver"}>NAVER</h2>
                <div className={"Crawling-news-content"}>
                    {
                        naver &&
                        naver.map((news) => <News key={news.id} news={news}/>)
                    }
                </div>
            </section>

            {/* 다음 뉴스*/}
            <section className={"Crawling-news"}>
                <h2 className={"Crawling-news-source Crawling-news-daum"}>Daum</h2>
                <div className={"Crawling-news-content"}>
                    {
                        daum &&
                        daum.map((news) => <News key={news.id} news={news}/>)
                    }
                </div>
            </section>
            <section className={"Crawling-news"}>
                <h2 className={"Crawling-news-source Crawling-news-google"}>Google</h2>
                <div className={"Crawling-news-content"}>
                    {
                        google &&
                        google.map((news) => <News key={news.id} news={news}/>)
                    }
                </div>
            </section>
            <section className={"Crawling-news"}>
                <h2 className={"Crawling-news-source Crawling-news-nate"}>Nate</h2>
                <div className={"Crawling-news-content"}>
                    {
                        nate &&
                        nate.map((news) => <News key={news.id} news={news}/>)
                    }
                </div>
            </section>


        </div>
    );
}

export default Crawling;