/// <reference lib="webworker" />

export {};

declare const self: ServiceWorkerGlobalScope;


const CACHE_NAME =
  "tasksphere-cache-v1";


self.addEventListener(

  "install",

  (event: ExtendableEvent) => {

    event.waitUntil(

      caches.open(CACHE_NAME)

    );

  }

);