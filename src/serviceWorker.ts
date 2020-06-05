export function registerServiceWorker() {
    window["isUpdateAvailable"] = new Promise((resolve) => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", async () => {
                navigator.serviceWorker
                    .register("/service-worker.js", { scope: "/" })
                    .then((registration) => {
                        console.info("⚙️ Service worker registration succeeded:", registration);

                        registration.onupdatefound = () => {
                            const installingWorker = registration.installing;
                            if (installingWorker) {
                                installingWorker.onstatechange = () => {
                                    if (installingWorker.state === "installed") {
                                        if (navigator.serviceWorker.controller) {
                                            // tslint:disable-next-line:no-console
                                            console.log("Service worker new update available", navigator.serviceWorker);
                                            resolve(true);
                                        } else {
                                            // tslint:disable-next-line:no-console
                                            console.log("Service worker no new update", navigator.serviceWorker);
                                            resolve(false);
                                        }
                                    }
                                };
                            }
                        };
                    })
                    .catch((error) => {
                        console.error({
                            message: "Service worker registration failed",
                            error,
                            additionalData: {
                                tags: {
                                    component: "service-worker",
                                },
                                level: "info",
                            },
                        });
                    });
            });
        } else {
            console.error({ message: "Service workers are not supported." });
        }
    });
}
