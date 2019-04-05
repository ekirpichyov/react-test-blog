import React, {useState, useEffect} from "react"
import InfiniteScroll from 'react-infinite-scroller'


const ArticleList = (props) => {
    const data = props.data
    
    const [loadPostsCount, setLoadPostsCount] = useState(5)
    const [loadPostsData, setLoadPostsData] = useState(data.slice(0, loadPostsCount))

    //обновляет список постов, при добавлении, удалении или подгрузке новых
    useEffect(() => {
        setLoadPostsData(data.slice(0, loadPostsCount))
    }, [data.length, loadPostsCount])

    //подгружает новые посты
    const handleNext = () => {
        setLoadPostsCount(loadPostsCount + 5)
    }

    const Posts = () => {
        return (
            <>
            {loadPostsData.map(element => 
                <article key={element.key}>
                    <div className="head" onClick={()=>{props.selector(element.key)}}>{element.data.head}</div>
                    <div className="comments-count">Комментариев: {element.data.comments.length}</div>
                    <div className="brief">{element.data.brief}</div>
                </article>
            )}
            </>
        )
    }

    return (
        <InfiniteScroll
            loadMore={handleNext}
            hasMore={loadPostsCount <= data.length}
        >
            <Posts/>
        </InfiniteScroll>
    )
}

export default ArticleList