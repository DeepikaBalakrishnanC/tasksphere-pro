const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const registerServiceWorker = () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    const swUrl = "/service-worker.js";

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        if (isLocalhost) {
          console.info(
            "PWA service worker registered",
            registration.scope
          );
        }
      })
      .catch((error) => {
        console.error(
          "PWA service worker registration failed",
          error
        );
      });
  });
};

export const requestPushPermission = async () => {
  if (!("Notification" in window)) {
    return "unsupported";
  }

  return Notification.requestPermission();
};
