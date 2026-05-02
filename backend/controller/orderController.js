import orderModel from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const currency = "inr";
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// for user
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    // Handle errors gracefully
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("userOrders error:", error);
    return res.status(500).json({ message: "userOrders error" });
  }
};

// for admin
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "adminAllOrders error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: "Status Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);
    return res.status(201).json({ order: razorpayOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay payment fields" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid Razorpay signature" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment is not marked paid" });
    }

    await orderModel.findOneAndUpdate(
      { _id: orderInfo.receipt, userId },
      { payment: true }
    );
    await User.findByIdAndUpdate(userId, { cartData: {} });
    return res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ success: false, message: "Payment verification error" });
  }
};
