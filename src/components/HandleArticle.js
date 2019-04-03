import React, {useState} from "react"
import "./HandleArticle.css"
import {validateArticle} from "../actions/validate.js"

const HandleArticle = (props) => {
    const data = props.data || false
    const key = props.value || null
    const [head, setHead] = useState(data.head || "")
    const [brief, setBrief] = useState(data.brief || "")
    const [content, setContent] = useState(data.content || "")
    const [disabled, setDisabled] = useState(true)

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        name === "head" ? setHead(target.value) :
        name === "brief" ? setBrief(target.value) :
        setContent(target.value)
        
        setDisabled(validateArticle(head,brief,content))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.publicate(head, brief, content, key, data.comments)
        props.close()
    }

    return (
        <div className="popup">
            <form onSubmit={handleSubmit}>
                <button onClick={props.close}><i className="fas fa-arrow-left"></i> Назад</button>
                <textarea   name="head"
                            cols="50" 
                            rows="1"
                            placeholder="Заголовок, 5-50 символов"
                            value={head}
                            onChange={handleChange}>
                </textarea>
                <textarea   name="brief" 
                            cols="50" 
                            rows="4"
                            placeholder="Краткое описание, 10-200 символов"
                            value={brief}
                            onChange={handleChange}>
                </textarea>
                <textarea   name="content"
                            cols="100" 
                            rows="20"
                            placeholder="Основной контент, 150-2000 символов"
                            value={content}
                            onChange={handleChange}>
                </textarea>
                <input      type="submit" 
                            name="head"
                            disabled={disabled}>
                </input>

            </form>
        </div>
    )
}

export default HandleArticle