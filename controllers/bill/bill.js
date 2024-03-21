const BillModel = require("../../models/bill");
const ItemModel = require("../../models/item");
const mongoose = require("mongoose");

const createBill = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let { items } = req.body;

    // items = [
    //   {
    //     _id: "65fc2386d6c0eb56421a0c0e",
    //     itemName: "abc",
    //     price: 45,
    //     quantity: 1,
    //     itemExpiryDate: "2024-04-15T00:00:00.000Z",
    //     createdAt: "2024-03-21T12:09:42.891Z",
    //     updatedAt: "2024-03-21T12:09:42.891Z",
    //   },
    //   {
    //     _id: "65fc239bd6c0eb56421a0c10",
    //     itemName: "cde",
    //     price: 35,
    //     quantity: 1,
    //     itemExpiryDate: "2024-04-15T00:00:00.000Z",
    //     createdAt: "2024-03-21T12:10:03.368Z",
    //     updatedAt: "2024-03-21T12:10:03.368Z",
    //   },
    //   {
    //     _id: "65fc23add6c0eb56421a0c12",
    //     itemName: "efg",
    //     price: 20,
    //     quantity: 11,
    //     itemExpiryDate: "2024-04-15T00:00:00.000Z",
    //     createdAt: "2024-03-21T12:10:21.893Z",
    //     updatedAt: "2024-03-21T12:10:21.893Z",
    //   },
    // ];

    for (const item of items) {
      const data = await ItemModel.findOneAndUpdate(
        {
          _id: item._id,
          price: item.price,
          quantity: { $gte: item.quantity },
        },
        { $inc: { quantity: -item.quantity } },
        { new: true, session }
      );

      if (!data) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          error: `Item ${item.name} not found or insufficient quantity`,
        });
      }
    }

    let totalQuantityPurchase = 0;
    let totalAmount = 0;

    for (const item of items) {
      totalAmount += item.quantity * item.price;
      totalQuantityPurchase += item.quantity;
    }

    const bill = await BillModel.create(
      [
        {
          items: items,
          totalQuantityPurchase,
          totalAmount,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Bill created successfully", bill });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating bill:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllBill = async (req, res) => {
  try {
    const getBill = await BillModel.find();
    return res
      .status(200)
      .json({ message: "Get All Bill", status: true, data: getBill });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: false });
  }
};
const getSpecificBill = async (req, res) => {
  console.log(req.params.id);
  try {
    const specificBill = await BillModel.findById(req.params.id);
    if (specificBill) {
      console.log(specificBill);
      return res
        .status(200)
        .json({ message: "Get Specific Bill", data: specificBill, status: true });
    }
    return res
      .status(200)
      .json({ message: "There is no bill", status: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: false });
  }
};
module.exports = { createBill, getAllBill,getSpecificBill };
