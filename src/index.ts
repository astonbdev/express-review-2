import { Request, Response, NextFunction } from "express";
const app = require("./app");

const port = 3000;
app.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.status(200).send()
});
app.listen(port, () => console.log(`Running on port ${port}`));