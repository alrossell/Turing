function storeData(items) {
    for (let item of items) {
        window.sessionStorage.setItem(item[0], JSON.stringify(item[1]))
    } 
}

export default storeData;