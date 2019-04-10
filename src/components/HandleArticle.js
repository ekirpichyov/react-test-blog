import React, {useState, useEffect} from "react"
import "./HandleArticle.css"
import {validateArticle} from "../actions/validate.js"

const HandleArticle = (props) => {
    const data = props.data || false
    const key = props.value || null
    const [head, setHead] = useState(data.head || "")
    const [brief, setBrief] = useState(data.brief || "")
    const [content, setContent] = useState(data.content || "")
    const [disabled, setDisabled] = useState(true)

    //блокирует кнопку по результатам валидации
    useEffect(() => {
        setDisabled(validateArticle(head,brief,content))
    }, [head.length, brief.length, content.length])

    //добавляет в состояние данные из заполненных полей
    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        name === "head" ? setHead(target.value) :
        name === "brief" ? setBrief(target.value) :
        setContent(target.value)
    }

    //отправляет в MainPage данные для публикации
    const handleSubmit = (e) => {
        e.preventDefault()
        props.publicate(head, brief, content, key, data.comments)
        props.close()
    }

    const handleKeyPress = (e) => {
        return e.key === "Enter" ? e.preventDefault() : null
    }

    return (
        <div className="popup">
            <form>
                <button onClick={props.close}><i className="material-icons">arrow_back</i></button>
                <textarea   id="head"
                            minLength="5"
                            maxLength="50"
                            name="head"
                            cols="50" 
                            rows="1"
                            placeholder="Заголовок, 5-50 символов"
                            value={head}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}>
                </textarea>
                <textarea   id="brief"
                            minLength="10"
                            maxLength="200"
                            name="brief" 
                            cols="100" 
                            rows="2"
                            placeholder="Краткое описание, 10-200 символов"
                            value={brief}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}>
                </textarea>
                <textarea   id="content"
                            minLength="150"
                            maxLength="2000"
                            name="content"
                            cols="100" 
                            rows="20"
                            placeholder="Основной контент, 150-2000 символов"
                            value={content}
                            onChange={handleChange}>
                </textarea>
                <button disabled={disabled} onClick={handleSubmit}><i className="material-icons">add_circle</i></button>
            </form>
        </div>
    )
}

export default HandleArticle