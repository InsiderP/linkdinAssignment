const express = require("express");
const {
  createItem,
  getAllitem,
  getSingleItem,
  UpdateItems,
  DeleteItem,
} = require("../../controllers/item/items");
const itemRouter = express.Router();
itemRouter.post("/createItem", createItem);
itemRouter.get("/getAllItem", getAllitem);
itemRouter.get("/getItem/:id", getSingleItem);
itemRouter.patch("/updateItem/:id", UpdateItems);
itemRouter.delete("/delete/:id", DeleteItem);
module.exports = itemRouter;
