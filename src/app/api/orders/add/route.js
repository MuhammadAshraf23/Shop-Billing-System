import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await dbConnect();

  try {
    const { customerId, products } = await req.json(); // Extract data from request body

    // Validate input
    if (!customerId || !products || products.length === 0) {
      return new Response(JSON.stringify({ message: "Customer ID and products are required" }), { status: 400 });
    }

    // Calculate totalAmount
    let totalAmount = 0;
    products = products.map((item) => {
      const amount = item.quantity * item.rate;
      totalAmount += amount;
      return { ...item, amount }; // Ensure each item has an amount field
    });

    const newOrder = new Order({
      customerId,
      products,
      totalAmount,
    });

    await newOrder.save();
    return new Response(JSON.stringify({ message: "Order placed successfully!", order: newOrder }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const orders = await Order.find({});
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), { status: 500 });
  }
}
