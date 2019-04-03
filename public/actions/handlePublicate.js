import localData from "./checkData"

const handlePublicate = (head, brief, content, editKey) => {
    const key = editKey ? editKey : generator(keys)
    const post = {
    key: key,
    data:{
        head: head,
        brief: brief,
        content: content,
        comments: [],
    }}
    localStorage.setItem(key, JSON.stringify(post))
    return localData()
    
}

export default handlePublicate