import fetch from 'cross-fetch'

// Get fish list
export function fetchFish() {
    return fetch('http://acnhapi.com/fish/')
        .then(response => response.json())
        .then(response => {return response})
        .catch(error => console.warn(error));
}

// Get fish icon
export function fetchFishIcon(fishId) {
    return 'http://acnhapi.com/icons/fish/' + fishId;
}

// Get fish image
export function fetchFishImage(fishId) {
    return 'http://acnhapi.com/images/fish/' + fishId;
}

// Get bug list
export function fetchBugs() {
    return fetch('http://acnhapi.com/bugs/')
        .then(response => response.json())
        .then(response => {
            return response
        })
        .catch(error => console.warn(error));
}

// Get bug icon
export function fetchBugImage(bugId) {
    return 'http://acnhapi.com/icons/bugs/' + bugId;
}

// Get villager list
export function fetchVillagers() {
    return fetch('http://acnhapi.com/villagers/')
        .then(response => response.json())
        .then(response => {
            return response
        })
        .catch(error => console.warn(error));
}

// Get villager icon
export function fetchVillagerImage(villagerId) {
    return 'http://acnhapi.com/icons/villagers/' + villagerId;
}