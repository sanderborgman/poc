import http from "http";
import { app } from "./app";
import { Request, Response } from "./http";

const PORT = 3000;

export const server = http.createServer((req, res) => {
  app.handleRequest(req as Request, res as Response);
});

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
