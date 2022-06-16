/** Simple demo Express app. */

import express from "express";
import { Request, Response, NextFunction } from "express";
import { request } from "http";
import { Item } from "./fakeDb"

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const app = express();
app.use(express.json());

/*********ITEM ROUTES*****************/
const itemRoutes = require("./items");
app.use("/items", itemRoutes);

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req:Request, res:Response, next:NextFunction) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err: ExpressError, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;