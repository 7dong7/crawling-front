// css
import "./News.css";

const News = ({news}) => {
    return (
        <div className={"News"}>
            <a className={"News-link"}
                href={news.href}>
                {news.title}
            </a>
        </div>
    )
}

export default News;