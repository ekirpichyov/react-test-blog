import React, {useState, useEffect} from "react"
import InfiniteScroll from 'react-infinite-scroller'
import {TransitionMotion, spring} from 'react-motion'
import styled from "styled-components"


const ArticleList = (props) => {
    const data = props.data
    const [loadPostsCount, setLoadPostsCount] = useState(5)
    const [loadPostsData, setLoadPostsData] = useState(data.slice(0, loadPostsCount))

    //обновляет список постов, при добавлении, удалении или подгрузке новых
    useEffect(() => {
        setLoadPostsData(data.slice(0, loadPostsCount))
    }, [data.length, loadPostsCount])

    //фейковая задержка загрузки новостей
    const handleNext = () => {
        setTimeout(() => {
            setLoadPostsCount(loadPostsCount + 5)
        }, 1500);
    }

    const Post = ({className, children}) => {
        return (<article className={className}>{children}</article>)
    }

    const StyledPost = styled(Post)`height: ${props=>props.style.h}px;
    margin-bottom: -${props=>props.style.w}px`

    const willLeave = () => {
        return {h: spring(0), w: spring(31)}
    }

    const willEnter = () => {
        return {h: 0, w: 0}
    }

    return (
            <TransitionMotion
                willEnter={willEnter}
                willLeave={willLeave}
                styles={loadPostsData.map(item => ({
                    key: item.key + [],
                    style: {h: spring(150), w: spring(0)},
                    data: item.data,
                }))}>
                {interpolatedStyles  =>
                    <InfiniteScroll
                    threshold={100}
                    loader={
                        <div className="spinner" key="a">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>}
                    loadMore={handleNext}
                    hasMore={loadPostsCount <= data.length}
                    >
                    {interpolatedStyles.map(config => {
                        return (
                            <StyledPost key={config.key} style={config.style}>
                                <div className="article-wrap" onClick={()=>{props.selector(config.key)}}>
                                    <div className="head">{config.data.head}</div>
                                    <div className="comments-count"><i className="material-icons">comment</i> {config.data.comments.length}</div>
                                    <div className="brief">{config.data.brief}</div>
                                </div>
                            </StyledPost>
                        )})}
                    </InfiniteScroll>}
            </TransitionMotion>
        
    )
}

export default ArticleList