import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    products: [
      {
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true }, // Auto-calculated (quantity * rate)
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
