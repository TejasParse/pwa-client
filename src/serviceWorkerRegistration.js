// src/serviceWorkerRegistration.js

import subscribeUserToPush from './subscribeToPush';

export function register() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
                // subscribeUserToPush(registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
}
