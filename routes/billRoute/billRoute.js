const express = require("express");
const { createBill, getAllBill, getSpecificBill } = require("../../controllers/bill/bill");
const billRouter = express.Router();

billRouter.post("/create", createBill);
billRouter.get("/getAllBill",getAllBill);
billRouter.get("/getBill/:id",getSpecificBill)
module.exports = billRouter;
