import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

self.skipWaiting()
clientsClaim()

// Precache files
precacheAndRoute(self.__WB_MANIFEST)

// Log when the service worker is installed
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed')
})

// Log when the service worker is activated
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated')
})

self.addEventListener('push', (event) => {

    console.log("Something is pushed bro", event);

    const data = event.data.json()
    const options = {
        body: data.body,
        icon: 'icon-192x192.png',
        badge: 'icon-192x192.png'
    }

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    )
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    event.waitUntil(
        clients.openWindow('/')
    )
})
