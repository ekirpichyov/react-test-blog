import React, {useState, useEffect} from 'react';
import Article from "./Article"
import ArticleList from "./ArticleList"
import HandleArticle from "./HandleArticle"
import localData from "../actions/checkData"
import "./MainPage.css"

const MainPage = () => {
    const [keys, setKeys] = useState([])
    const [data, setData] = useState(localData)
    const [article, setArticle] = useState(null)
    const [publicate, setPublicate] = useState(false)
    
    useEffect(() => {
        const arrKey = [] 
        data.forEach(item => arrKey.push(item.key))
        setKeys(arrKey)
    }, [data.length])

    const showArticle = (key) => {
        setArticle(key)
    }

    const handleRemove = (value) => {
        localStorage.removeItem(value)
        setData(data.filter(el => el.key !== value))
        setArticle(null)
    }

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
            <button onClick={()=>setPublicate(true)}><i className="fas fa-plus"></i> Написать</button>
        </header>
        <main>
            {article !== null ? 
            <Article selector={showArticle} publicate={handlePublicate} remover={handleRemove} data={JSON.parse(localStorage.getItem(article))}/> : 
            <ArticleList   selector={showArticle} data={data}/>}
            {publicate ?  <HandleArticle publicate={handlePublicate} close={()=>setPublicate(false)}/> : null}
           
        </main>
        </>
    )
}
export default MainPage