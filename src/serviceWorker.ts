/* eslint-disable */
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function registerServiceWorkerForPWA(): void {
    // @ts-ignore
    if (!isLocalhost && process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // @ts-ignore
        window.addEventListener("load", (): void => {
            // @ts-ignore
            navigator.serviceWorker.register("./service-worker.js");
        });
    }
}
/* eslint-enable */
