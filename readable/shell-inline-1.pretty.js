addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  window.mbInstall = e;
  dispatchEvent(new Event("mb:install"));
});
addEventListener("appinstalled", function () {
  window.mbInstall = null;
  dispatchEvent(new Event("mb:install"));
});
if ("serviceWorker" in navigator)
  addEventListener("load", function () {
    navigator.serviceWorker
      .register("/__mb/app/worker.js", { scope: "/" })
      .catch(function () {});
  });
