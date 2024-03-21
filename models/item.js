const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    itemName: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    itemExpiryDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

const ItemModel = mongoose.model("item", itemSchema);

module.exports = ItemModel;
