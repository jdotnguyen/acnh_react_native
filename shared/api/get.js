import fetch from 'cross-fetch'

export function fetchFish() {
    return fetch('http://acnhapi.com/fish/')
        .then(response => response.json())
        .then(response => {return response})
        .catch(error => console.warn(error));
}

export function fetchFishImage(fishId) {
    return 'http://acnhapi.com/icons/fish/' + fishId;
}

export function fetchBugs() {
    return fetch('http://acnhapi.com/bugs/')
        .then(response => response.json())
        .then(response => {
            return response
        })
        .catch(error => console.warn(error));
}

export function fetchBugImage(bugId) {
    return 'http://acnhapi.com/icons/bugs/' + bugId;
}

export function fetchVillagers() {
    return fetch('http://acnhapi.com/villagers/')
        .then(response => response.json())
        .then(response => {
            return response
        })
        .catch(error => console.warn(error));
}

export function fetchVillagerImage(villagerId) {
    return 'http://acnhapi.com/icons/villagers/' + villagerId;
}