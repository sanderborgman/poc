import { Middleware } from "../router";

export const requestLogger: Middleware = (req, res, next) => {
  console.log(`[REQUEST] [${req.method}] ${req.url}`);

  next();
};
