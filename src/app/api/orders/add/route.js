import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    console.log("Received body:", body);

    const { customerId, products } = body;

    if (!customerId || !products || products.length === 0) {
      return new Response(
        JSON.stringify({ message: "Customer ID and products are required" }),
        { status: 400 }
      );
    }

    // Transform product fields to match schema
    let totalAmount = 0;
    const processedProducts = products.map((item) => {
      const amount = item.quantity * item.rate;
      totalAmount += amount;
      return { 
        productName: item.name, // Fix: Rename `name` → `productName`
        quantity: item.quantity, 
        rate: item.rate, 
        amount 
      };
    });

    const newOrder = new Order({
      customerId,
      products: processedProducts, // Use the corrected structure
      totalAmount,
    });

    await newOrder.save();
    return new Response(
      JSON.stringify({ message: "Order placed successfully!", order: newOrder }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
