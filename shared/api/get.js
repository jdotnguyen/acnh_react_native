import fetch from 'cross-fetch'

// Get list with type param
export function fetchList(pageType) {
    const type = String(pageType).toLowerCase();
    return fetch('http://acnhapi.com/' + type + '/')
        .then(response => response.json())
        .then(response => {return response})
        .catch(error => console.warn(error));
}

// Get icon with type param
export function fetchIcon(pageType, id) {
    const type = String(pageType).toLowerCase();
    return 'http://acnhapi.com/icons/' + type + '/' + id;
}

// Get icon with type param
export function fetchImage(pageType, id) {
    const type = String(pageType).toLowerCase();
    return 'http://acnhapi.com/images/' + type + '/' + id;
}