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
    const [nate, setNate] = useState()

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


    if (loading) { // 로딩중인 경우
        return <div>로딩중...</div>;
    }
    return (
        <div className={"Crawling"}>
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