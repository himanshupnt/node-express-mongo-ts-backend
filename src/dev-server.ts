import http from "http";
import app from "./app";

const server = http.createServer(app);
let currentApp = app;
server.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log(`DEV SERVER listening on port 3000.`);
});
if (module.hot) {
  module.hot.accept("./app", () => {
    server.removeListener("request", currentApp);
    server.on("request", app);
    currentApp = app;
  });
}
