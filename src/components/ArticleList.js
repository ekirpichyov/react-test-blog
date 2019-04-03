import React, {useState, useEffect} from "react"
import InfiniteScroll from 'react-infinite-scroll-component'

const ArticleList = (props) => {
    const data = props.data
    
    const [position, setPosition] = useState(5)
    const [scroll, setScroll] = useState(data.slice(0, position))

    useEffect(() => {
        setScroll(data.slice(0, position))
    }, [position])
    
    return (
        <InfiniteScroll
            next={()=> setPosition(position + 5)}
            dataLength={position}
            hasMore={position <= data.length}
            endMessage={<h4>Конец</h4>}
            loader={<h4>Загрузка...</h4>}
            height={550}
        >
        {scroll.map((element, index) => 
            <article key={index}>
                <div className="head" onClick={()=>{props.selector(element.key)}}>{element.data.head}</div>
                <div className="comments-count">Комментариев: {element.data.comments.length}</div>
                <div className="brief">{element.data.brief}</div>
            </article>
        )}
        </InfiniteScroll>
    )
}

export default ArticleList