"use strict";
/** Simple demo Express app. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const app = (0, express_1.default)();
app.use(express_1.default.json());
/*********ITEM ROUTES*****************/
const itemRoutes = require("./items");
app.use("/items", itemRoutes);
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