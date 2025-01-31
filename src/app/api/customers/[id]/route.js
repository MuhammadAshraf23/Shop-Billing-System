import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(req, { params }) {
  await dbConnect(); // Ensure DB connection

  const { id } = params; // Extract customer ID from URL

  try {
    const customer = await Customer.findById(id); // Fetch customer from MongoDB

    if (!customer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(customer), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
