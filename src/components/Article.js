import React, {useState, useEffect} from "react"
import "./Article.css"
import HandleArticle from "./HandleArticle"
import {validateComment} from "../actions/validate.js"
import styled from "styled-components"
import {TransitionMotion, spring} from 'react-motion'

const Article = (props) => {
    const data = props.data.data
    const key = props.data.key
    const comments = data.comments
    const [editPost, setEditPost] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")

    //блокирует кнопку добавления комментария
    useEffect(() => {
        setDisabled(validateComment(author, text))
    }, [text.length, author.length])

    //добавляет данные из полей в состояние
    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        name === "author" ? setAuthor(target.value) :
        setText(target.value)
    }

    //отправляет комментарий в MainPage и очищает поля
    const handleSubmitComment = (e) => {
        e.preventDefault()
        const comment = {
            key: Date.now() + [],
            author: author,
            comment: text
        }
        comments.push(comment)
        props.publicate(data.head, data.brief, data.content, key, comments)
        setAuthor("")
        setText("")
    }

    //удаляет комментарии
    const removeComment = (e) => {
        const target = e.target
        const value = target.value
        const newComments = comments.filter(el => el.key !== value)
        props.publicate(data.head, data.brief, data.content, key, newComments)
    }

    const handleKeyPress = (e) => {
        return e.key === "Enter" ? e.preventDefault() : null
    }

    const Comments = ({className, children}) => {
        return (<div className={className}>{children}</div>)
    }

    const StyledComments = styled(Comments)`opacity: ${props=>props.style.opacity}`

    const willLeave = () => {
        return {opacity: spring(0)}
    }

    const willEnter = () => {
        return {opacity: 0}
    }

    return (
        <>
        <button className="close" onClick={() => props.selector(null)}><i className="material-icons">arrow_back</i></button>
        
        <article className="open">
            <button className="remove" onClick={()=>props.remover(key)}><i className="material-icons">delete_outline</i></button>
            {editPost ? null : <button className="edit" onClick={()=>setEditPost(true)}><i className="material-icons">edit</i></button>}
            <div className="head">{data.head}</div>
            <div className="content">{data.content}</div>
        </article>

        <div className="comments">
            <div className="comments-count">Комментарии: {comments.length}</div>

            <TransitionMotion
                willEnter={willEnter}
                willLeave={willLeave}
                styles={comments.map(item => ({
                    key: item.key + [],
                    style: {opacity: spring(1)},
                    data: item,
                }))}>
                {interpolatedStyles  =>
                    <>
                    {interpolatedStyles.map(config => {
                        return (
                            <StyledComments className="comment" key={config.key} style={config.style}>
                                <button className="remove-comment" value={config.key} onClick={removeComment}>Х</button>
                                <div className="author">{config.data.author}</div>
                                <div className="content">{config.data.comment}</div>
                            </StyledComments>
                        )})}
                    </>
                }
            </TransitionMotion>

            <form id="add-comment" onSubmit={handleSubmitComment}>
                Добавить комментарий
                <textarea   name="author"
                            cols="50"
                            rows="1"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="30"
                            value={author}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}>
                </textarea>
                <textarea   name="text"
                            cols="50"
                            rows="3"
                            minLength="5"
                            maxLength="150"
                            value={text}
                            placeholder="Комментарий"
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}>
                </textarea>
                <input      type="submit" 
                            value="ОТПРАВИТЬ"
                            name="submit"
                            placeholder="Заголовок" disabled={disabled}>
                </input>
            </form>
        </div>
        {editPost ? <HandleArticle data={data} publicate={props.publicate} close={()=>setEditPost(false)} value={key}/>: null}
        
        </>
    )
}

export default Article