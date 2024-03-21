const ItemModel = require("../../models/item");

const createItem = async (req, res) => {
  try {
    const itemAdd = await ItemModel.create(req.body);

    return res.status(201).json({
      message: "item added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "item added successfully",
    });
  }
};
const getAllitem = async (req, res) => {
  try {
    const getItem = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "Get All item", status: true, data: getItem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: false });
  }
};

const getSingleItem = async (req, res) => {
  console.log(req.params.id);
  try {
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem) {
      console.log(singleItem);
      return res
        .status(200)
        .json({ message: "Get Single Item", data: singleItem, status: true });
    }
    return res
      .status(200)
      .json({ message: "There is no data of Item", status: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: false });
  }
};
const UpdateItems = async (req, res) => {
  try {
    const updateItem = await ItemModel.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "item Updated", status: true, data: updateItem });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};
const DeleteItem = async (req, res) => {
  try {
    const deleteItem = await ItemModel.findByIdAndDelete({
      _id: req.params.id,
    });
    return res
      .status(200)
      .json({ message: "item Deleted", status: true, data: deleteItem });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};
module.exports = {
  createItem,
  getAllitem,
  getSingleItem,
  UpdateItems,
  DeleteItem,
};
