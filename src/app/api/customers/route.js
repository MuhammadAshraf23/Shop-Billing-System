import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export async function POST(req) {
  await dbConnect();

  try {
    const { name, phone, balance } = await req.json(); // Extract request body

    // ✅ Input Validation
    if (!name || !phone) {
      return new Response(JSON.stringify({ message: "Name and phone are required" }), { status: 400 });
    }

    // ✅ Check if Customer Already Exists
    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      return new Response(JSON.stringify({ message: "Customer already exists" }), { status: 400 });
    }

    // ✅ Create New Customer
    const newCustomer = new Customer({
      name,
      phone,
      balance: balance || 0, // Default balance if not provided
    });

    await newCustomer.save();
    return new Response(JSON.stringify({ message: "Customer added successfully", customer: newCustomer }), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const customers = await Customer.find({});
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), { status: 500 });
  }
}
