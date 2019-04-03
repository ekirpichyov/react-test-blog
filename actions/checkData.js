import json from "../data/data.json"

const checkData = () => {
    if (localStorage.length === 0) {
        json.map(element => localStorage.setItem(element.key, JSON.stringify(element)))
    }
        
    const localData = []
    for(let i = 0; i < localStorage.length; i++) {
        localData[i] = JSON.parse(localStorage.getItem(localStorage.key(i)))
    }
    return localData.reverse()
}

export default checkData