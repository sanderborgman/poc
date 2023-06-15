import { requestLogger } from "./middleware/request-logger";
import { responseLogger } from "./middleware/response-logger";
import { Router } from "./router";

export const app = new Router();

app.use(requestLogger);
app.use(responseLogger);

app.router.on("GET", "/example", (req, res, params) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Hello, world!" }));
});
