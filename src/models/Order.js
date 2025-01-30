import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Customer ID (Reference to Customers Collection)
      required: true,
    },
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
