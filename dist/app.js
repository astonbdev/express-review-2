"use strict";
/** Simple demo Express app. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
//fake DB
const { items } = require("./fakeDb");
//Express App
const app = (0, express_1.default)();
app.use(express_1.default.json());
//get all items
app.get("/items", function (req, res, next) {
    return res.status(200).json(items);
});
//post an item
app.post("/items", function (req, res, next) {
    items.push(req.body);
    return res.status(200).json(req.body);
});
//get specific items
app.get("/items/:name", function (req, res, NextFunction) {
    const names = items.map((e) => e.name);
    const name_idx = names.indexOf(req.params.name);
    if (!name_idx) {
        throw new NotFoundError(`Could not locate item ${req.params.name}`);
    }
    return res.status(200).json(names[name_idx]);
});
//patch specific item
app.patch("/items/:name", function (req, res, next) {
    const names = items.map((e) => e.name);
    const name_idx = names.indexOf(req.params.name);
    if (!name_idx) {
        throw new NotFoundError(`Could not locate item ${req.params.name}`);
    }
    items[name_idx] = req.body;
    return res.status(200).json(items[name_idx]);
});
/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
    throw new NotFoundError();
});
/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test")
        console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
});
module.exports = app;
//# sourceMappingURL=app.js.map