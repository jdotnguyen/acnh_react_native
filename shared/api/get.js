import fetch from 'cross-fetch'

// Get list with type param
export function fetchList(pageType) {
    const type = String(pageType).toLowerCase();
    return fetch('http://acnhapi.com/' + type + '/')
        .then(response => response.json())
        .then(response => {return response})
        .catch(error => console.warn(error));
}

// Get icon with type and ID param
export function fetchIcon(pageType, id) {
    const type = String(pageType).toLowerCase();
    return 'http://acnhapi.com/icons/' + type + '/' + id;
}

// Get image with type and ID param
export function fetchImage(pageType, id) {
    const type = String(pageType).toLowerCase();
    return 'http://acnhapi.com/images/' + type + '/' + id;
}

// Get songs in MP3 format
export function fetchSongMP3(id) {
    return 'http://acnhapi.com/music/' + id;
}