// css
import "./Crawling.css";

// hook
import {usePublicApi} from "../api/publicApi.jsx";
import {useEffect, useState} from "react";

// component
import News from "../components/News.jsx";
import WordCloud from "react-d3-cloud";

// 백엔드에서 한 번에 처리하되, 비동기(CompletableFuture)로 각 포털을 병렬 크롤링하는 방식.
const Crawling = () => {
    const publicApi = usePublicApi(); // api 요청
    const [loading, setLoading] = useState(false);
    const [naver, setNaver] = useState();
    const [daum, setDaum] = useState()
    const [google, setGoogle] = useState()
    const [nate, setNate] = useState();
    const [words, setWords] = useState();


    const crawlingRequest = async () => {
        try {
            const response = await publicApi({
                method: "GET",
                url: "/api/crawl",
            });
            console.log("response:", response);
            setNaver(response.data.news.naver);
            setDaum(response.data.news.daum);
            setGoogle(response.data.news.google);
            setNate(response.data.news.nate);
            const wordArray = Object.entries(response.data.wordFrequency).map(([text, value]) => ({text, value}));
            console.log("wordArray:", wordArray);
            setWords(wordArray);
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        crawlingRequest();
    }, []);

    if (loading) { // 로딩중인 경우
        return <div>로딩중...</div>;
    }

    // Math.sqrt(word.value) * 3
    const fontSize = (word) => Math.log(word.value) * 15; // 너무 큰 값 완화
    const rotate = () => [-30, 0, 30][Math.floor(Math.random() * 3)]; // -30°, 0°, 30° 중 랜덤
    const width = window.innerWidth * 0.5;

    return (
        <div className={"Crawling"}>
            {/* 워드 클라우드 */}
            <section className={"Crawling-wordCloud"}>
                { words &&
                    <WordCloud
                        data={words}
                        fontSize={fontSize}
                        rotate={rotate}
                        padding={0.2}
                        random={() => 0.5} // 랜덤성
                        // spiral={"rectangular"}
                        width={width}
                        height={width/3}
                    />
                }
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