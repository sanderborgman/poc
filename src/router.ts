import FindMyWay from "find-my-way";
import { Request, Response } from "./http";

export type Middleware = (
  req: Request,
  res: Response,
  next: CallableFunction
) => void;

export class Router {
  middleware: Middleware[] = [];
  router = FindMyWay({
    defaultRoute: (_req, res) => {
      res.statusCode = 404;
      res.statusMessage = "Not found";
      res.end();
    },
  });

  use(middleware: Middleware) {
    this.middleware.push(middleware);
  }

  handleRequest(req: Request, res: Response): Promise<void> {
    return new Promise((resolve) => {
      res.on("finish", resolve);

      const next = (i = 0) => {
        if (i < this.middleware.length) {
          this.middleware[i](req, res, () => next(i + 1));
        } else {
          this.router.lookup(req as any, res as any);
        }
      };

      next();
    });
  }
}
