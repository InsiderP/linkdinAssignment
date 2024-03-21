const mongoose = require("mongoose");
const billSchema = mongoose.Schema(
  {
    items: {
      type: Array,
      required: true,
    },
    totalQuantityPurchase: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const BillModel = mongoose.model("bill", billSchema);

module.exports = BillModel;
