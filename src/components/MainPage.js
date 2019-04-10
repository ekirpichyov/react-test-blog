import React, {useState} from 'react';
import Article from "./Article"
import ArticleList from "./ArticleList"
import HandleArticle from "./HandleArticle"
import localData from "../actions/checkData"
import "./MainPage.css"

const MainPage = () => {
    const [data, setData] = useState(localData)
    const [article, setArticle] = useState(null)
    const [publicate, setPublicate] = useState(false)

    //показывает отдельную статью полностью
    const showArticle = (key) => {
        setArticle(key)
    }

    //удаляет статью
    const handleRemove = (key) => {
        localStorage.removeItem(key)
        setData(localData)
        setArticle(null)
    }

    //обновляет существующую или добавляет новую статью в 
    //зависимости от наличия editKey
    const handlePublicate = (head, brief, content, editKey, comments) => {
        const key = editKey ? editKey : Date.now()
        const post = {
            key: key,
            data:{
                head: head,
                brief: brief,
                content: content,
                comments: comments || []
        }}
        
        localStorage.setItem(key, JSON.stringify(post))
        const newData = localData()
        setData(newData)
    }

    return (
        <>
        <header>
            <div className="logo">БЛОГ</div>
            {!publicate ? <button onClick={()=>setPublicate(true)}><i className="material-icons">add_circle</i></button> : null}
        </header>
        <main>
            {article !== null ? 
                <Article 
                    selector={showArticle} 
                    publicate={handlePublicate} 
                    remover={handleRemove} 
                    data={JSON.parse(localStorage.getItem(article))}/> : 
                <ArticleList   
                    remover={handleRemove}  
                    selector={showArticle} 
                    data={data}/>}
            {publicate ?  
                <HandleArticle 
                    publicate={handlePublicate} 
                    close={()=>setPublicate(false)}/> : 
                    null}
           
        </main>
        </>
    )
}
export default MainPage