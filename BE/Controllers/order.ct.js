const { default: mongoose } = require("mongoose");
const { generateAlphanumericString } = require("../Utils/common.ut");
const Order = mongoose.model("orders");
const User = mongoose.model("users");

module.exports = {
  getOrders,
  placeOrder
};

async function placeOrder(req, res, next) {
  try {
    let { books = [], total_amount, address } = req.body;
    const { _id } = req.obj
    const oid = generateAlphanumericString();
    const orderData = await new Order({ user: _id, books, total_amount, address, oid }).save();
    res.json({ success: true, message: "Orderded successfully!", data: orderData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrders(req, res, next) {
  try {
    const { _id } = req.obj;
    const pipeline = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(_id)
            }
        }
    ];
    pipeline.push(
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "user",
                as: "orders"
            }
        },
        {
            $project: {
                password: 0,
                address: 0
            }
        }
    )
    const response = await User.aggregate(pipeline);
    res.json({ success: true, data: response?.[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}