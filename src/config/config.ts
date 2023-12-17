const environmentUrls = new Map();

environmentUrls.set("localhost", "http://localhost:8080");

const hostName = environmentUrls.get(window.location.hostname);

export default hostName;
