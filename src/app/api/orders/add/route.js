import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { customerId, products } = req.body;

      // Calculate totalAmount
      let totalAmount = 0;
      products.forEach((item) => {
        item.amount = item.quantity * item.rate;
        totalAmount += item.amount;
      });

      const newOrder = new Order({
        customerId,
        products,
        totalAmount,
      });

      await newOrder.save();
      return res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
