// app/api/customers/[id].js
export async function GET(req, { params }) {
    const { id } = params;  // Extract the customer ID from the URL
  
    try {
      // Simulate fetching the customer data (you can replace this with your database logic)
      const customers = [
        { id: "1", name: "John Doe", contact: "1234567890", balance: 1000 },
        { id: "2", name: "Jane Smith", contact: "0987654321", balance: 500 },
        // Add more customers as needed
      ];
  
      // Find the customer by ID
      const customer = customers.find((customer) => customer.id === id);
  
      if (!customer) {
        return new Response(JSON.stringify({ message: "Customer not found" }), {
          status: 404,
        });
      }
  
      // Return the customer data
      return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Server error" }), {
        status: 500,
      });
    }
  }
  