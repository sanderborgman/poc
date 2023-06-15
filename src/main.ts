import "process/browser.js";

import { createRequest, createResponse } from "./http";
import { app } from "./app";

let req = createRequest("GET", "/example2");
let res = createResponse();

app.handleRequest(req, res).then(() => {
  console.log(
    `Response: ${res.statusCode} ${
      res.statusMessage
    } | Headers: ${JSON.stringify(res.headers)} | Body: ${res.data}`
  );
});
