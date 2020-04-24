document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(req => console.log('Service worker registered', req)), err => console.error('Failed to register service worker', err)
    }
}