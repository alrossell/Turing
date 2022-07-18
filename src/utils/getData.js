function getLocalSession(value) {
    return JSON.parse(window.sessionStorage.getItem(value))
}

export default getLocalSession;