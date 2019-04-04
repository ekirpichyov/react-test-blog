import json from "../data/data.json"

//проверка наличия данных в localStorage

const checkData = () => {
    if (localStorage.length === 0) {
        json.map(element => localStorage.setItem(element.key, JSON.stringify(element)))
    }
        
    const localData = []
    for(let i = 0; i < localStorage.length; i++) {
        localData[i] = JSON.parse(localStorage.getItem(localStorage.key(i)))
    }
    return localData.sort((a,b)=>{
        return a.key < b.key ? 1 :
        a.key > b.key ? -1 : 0})
}

export default checkData