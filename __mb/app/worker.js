const KEEP = "mb-page-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/__mb/")) return;
  event.respondWith(fetch(request).then((response) => {
    if (response.status === 200) {
      const copy = response.clone();
      event.waitUntil(caches.open(KEEP).then((kept) => kept.put(request, copy)).catch(() => {}));
    }
    return response;
  }).catch(() => caches.match(request).then((kept) => kept || Response.error())));
});
self.addEventListener("push", (event) => {
  let said = {};
  try { said = event.data.json(); } catch (e) { /* a push with no words draws the name */ }
  event.waitUntil(self.registration.showNotification(said.title || "mindblown", {
    body: said.body || "", tag: said.tag || undefined, icon: "/__mb/app/icon-192.png",
    data: { url: said.url || "/" },
  }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(self.clients.matchAll({ type: "window" }).then((open) => {
    const same = open.find((client) => client.url.startsWith(url) && "focus" in client);
    return same ? same.focus() : self.clients.openWindow(url);
  }));
});
