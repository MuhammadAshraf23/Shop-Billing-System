import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true, // Ensure phone numbers are unique
      match: [/^\d{10,15}Rs/, "Please enter a valid phone number"], // 10-15 digit phone numbers
    },
    balance: {
      type: Number,
      required: true,
      default: 0, // Default balance is 0
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference to Product Model
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export default Customer;
