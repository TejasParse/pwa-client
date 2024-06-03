import { urlB64ToUint8Array } from './utils';


const subscribeUserToPush = async (registration) => {
    const applicationServerKey = urlB64ToUint8Array(import.meta.env.VITE_APP_PUBLIC_VAPID_KEY);
    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        });
        console.log('Push Subscription:', subscription);

        // Send subscription to your server
        await fetch(`${import.meta.env.VITE_APP_PUBLIC_API_URL}/subscribe`, {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Failed to subscribe to push notifications:', error);
    }
};

export default subscribeUserToPush;
