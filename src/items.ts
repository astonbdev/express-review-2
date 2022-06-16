//Express App
import { Request, Response, NextFunction } from "express";
import { Item } from "./fakeDb";

const express = require("express");
const {items} = require("./fakeDb");

const { NotFoundError, BadRequestError } = require("./expressError");

const router = new express.Router();

//get all items
router.get("/", function(req: Request, res:Response, next:NextFunction){
  return res.status(200).json(items);
});

//post an item

router.post("/", function(req:Request, res:Response, next:NextFunction){
  items.push(req.body);
  return res.status(200).json(req.body);
});

//get specific items
router.get("/:name", function (req:Request, res:Response, next:NextFunction){
  const names = items.map((e: Item) => e.name);
  const name_idx = names.indexOf(req.params.name);
  console.log(names);
  console.log(name_idx);
  if(name_idx === -1){
    throw new NotFoundError(`Could not locate item ${req.params.name}`);
  }

  return res.status(200).json(items[name_idx]);
});

//patch specific item
router.patch("/:name", function(req:Request, res:Response, next:NextFunction){
  const names = items.map((e: Item) => e.name);
  const name_idx = names.indexOf(req.params.name);
  if(name_idx === -1){
    throw new NotFoundError(`Could not locate item ${req.params.name}`);
  }

  items[name_idx] = req.body;

  return res.status(200).json(items[name_idx]);
});

module.exports = router;