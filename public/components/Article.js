import React, {useState} from "react"
import "./Article.css"
import HandleArticle from "./HandleArticle"
import {validateComment} from "../actions/validate.js"

const Article = (props) => {
    const data = props.data.data
    const key = props.data.key
    const comments = data.comments
    const [editPost, setEditPost] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        name === "author" ? setAuthor(target.value) :
        setText(target.value)
        setDisabled(validateComment(author, text))
    }

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

    const removeComment = (e) => {
        const target = e.target
        const value = target.value
        const newComments = comments.filter(el => el.key !== value)
        props.publicate(data.head, data.brief, data.content, key, newComments)
    }

    return (
        <>
        <button className="close" onClick={() => props.selector(null)}><i className="fas fa-arrow-left"> Назад</i></button>
        <button className="remove" onClick={()=>props.remover(key)}><i className="fas fa-trash-alt"></i></button>
        <button className="edit" onClick={()=>setEditPost(true)}><i className="fas fa-pencil-alt"></i></button>
        
        <article className="open">
            <div className="head">{data.head}</div>
            <div className="content">{data.content}</div>
        </article>

        <div className="comments">
            <div className="comments-count">Комментариев: {comments.length}</div>
            {comments.map(item => 
                <div className="comment" key={item.key}>
                    <button className="remove-comment" value={item.key} onClick={removeComment}>Х</button>
                    <div className="author">{item.author}</div>
                    <div className="content">{item.comment}</div>
                </div>
            )}

            <form id="add-comment" onSubmit={handleSubmitComment}>
                Добавить комментарий
                <textarea   name="author"
                            cols="50"
                            rows="1"
                            placeholder="Ваше имя"
                            value={author}
                            onChange={handleChange}>
                </textarea>
                <textarea   name="text"
                            cols="50"
                            rows="3"
                            value={text}
                            placeholder="Комментарий"
                            onChange={handleChange}>
                </textarea>
                <input      type="submit" 
                            value="Отправить"
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