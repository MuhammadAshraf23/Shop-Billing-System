import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export default async function handler(req, res) {
  await dbConnect(); // MongoDB se connection establish karna

  if (req.method === "POST") {
    try {
      const { name, phone, balance } = req.body;

      // ✅ Input Validation
      if (!name || !phone) {
        return res.status(400).json({ message: "Name and phone are required" });
      }

      // ✅ Check if Customer Already Exists
      const existingCustomer = await Customer.findOne({ phone });
      if (existingCustomer) {
        return res.status(400).json({ message: "Customer already exists" });
      }

      // ✅ Create New Customer
      const newCustomer = new Customer({
        name,
        phone,
        balance: balance || 0, // Default balance agar nahi diya gaya
      });

      await newCustomer.save();

      return res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
