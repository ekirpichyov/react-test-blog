import json from "../data/data.json"

//проверка наличия данных в localStorage

const validData = (element) => {
    return (
    typeof element === "object" &&
    "key" in element && 
    "data" in element &&
    "head" in element.data &&
    "comments" in element.data &&
    "brief" in element.data &&
    "content" in element.data
    )
}

const checkData = () => {

    if (localStorage.length === 0) {
        json.map(element => localStorage.setItem(element.key, JSON.stringify(element)))
    }
        
    const localData = []
    let element
    for(let i = 0; i < localStorage.length; i++) {
        element = JSON.parse(localStorage.getItem(localStorage.key(i)))
        if (validData(element)) {
            localData[i] = element
        } else {
            continue
        }
    }
    return localData.sort((a,b)=>{
        return a.key < b.key ? 1 :
        a.key > b.key ? -1 : 0})
}

export default checkData