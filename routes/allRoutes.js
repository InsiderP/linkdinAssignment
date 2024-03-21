const express = require("express");
const itemRouter = require("./itemRoute/itemRoute");
const billRouter = require("./billRoute/billRoute");

const allRoutes = express.Router();
allRoutes.use("/item", itemRouter);
allRoutes.use("/bill", billRouter);
module.exports = allRoutes;
