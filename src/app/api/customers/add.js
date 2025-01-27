import { connectToDatabase } from "@/utils/db"; // Utility function to connect to your database

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // 1. Parse the incoming request
      const { customerId, products } = req.body;

      // 2. Validate the request body
      if (!customerId || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      // 3. Connect to the database
      const { db } = await connectToDatabase();

      // 4. Save the products to the database
      const customer = await db.collection("customers").findOne({ _id: customerId });
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Add products to the customer's record
      const result = await db.collection("customers").updateOne(
        { _id: customerId },
        { $push: { products: { $each: products } } }
      );

      // 5. Return a success response
      return res.status(200).json({
        message: "Products added successfully",
        result,
      });
    } catch (error) {
      console.error("Error handling /api/customers/add:", error);

      // Return an error response
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
