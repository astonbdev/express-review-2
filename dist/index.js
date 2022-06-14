"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
const port = 3000;
app.get('/', function (req, res, next) {
    res.status(200).send();
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map