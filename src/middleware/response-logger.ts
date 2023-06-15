import { Middleware } from "../router";

export const responseLogger: Middleware = (req, res, next) => {
  next();

  console.log(
    `[RESPONSE] [${res.statusCode}] ${res.statusMessage || "Unknown"}`
  );
};
