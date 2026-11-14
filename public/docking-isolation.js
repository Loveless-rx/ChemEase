// Finish the first static-host bootstrap when a newly activated isolation worker
// claims this document after coi-serviceworker's registration-time reload.
if (typeof navigator !== "undefined" && navigator.serviceWorker && !crossOriginIsolated) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!crossOriginIsolated) location.reload();
  }, {once: true});
}
