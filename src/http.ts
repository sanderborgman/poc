import { EventEmitter } from "events";

export type { IncomingMessage, ServerResponse } from "http";

interface MinimalIncomingMessage {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
}

interface MinimalServerResponse {
  statusCode?: number;
  statusMessage?: string;
  headers?: Record<string, string>;
  setHeader(name: string, value: string): void;
  end(data?: string): void;
}

export interface Request extends EventEmitter, MinimalIncomingMessage {}

export function createRequest(method: string, url: string): Request {
  let req = new EventEmitter() as Request;
  req.method = method;
  req.url = url;
  req.headers = {};
  return req;
}

export interface Response extends EventEmitter, MinimalServerResponse {
  data?: string;
}

export function createResponse(): Response {
  let res = new EventEmitter() as Response;
  res.statusCode = 200;
  res.headers = res.headers || {};
  res.end = function (data: string) {
    this.data = data;
    this.emit("finish");
  };
  res.setHeader = function (name: string, value: string) {
    this.headers = this.headers || {};
    this.headers[name] = value;
  };
  return res;
}
