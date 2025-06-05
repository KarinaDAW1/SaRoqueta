const repoName = "SaRoqueta";

export const BASE_URL =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "/"
    : `/${repoName}/`;

console.log("config.js cargado correctamente, BASE_URL:", BASE_URL);
