import { notFound } from "next/navigation";

async function fetchCustomer(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${id}`);
  return res.ok ? res.json() : null;
}

async function fetchOrders(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?customerId=${id}`);
  return res.ok ? res.json() : [];
}

export default async function CustomerDetails({ params }) {
  const { id } = params;
  const customer = await fetchCustomer(id);
  const orders = await fetchOrders(id);
console.log("ordersss",orders)
  if (!customer) return notFound();

  // Calculate Total Orders Amount
  const totalOrdersAmount = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Email:</strong> {customer.email || "N/A"}</p>
      <p><strong>Address:</strong> {customer.address || "Not Provided"}</p>
      
      <hr className="my-4" />

      <h3 className="text-lg font-semibold">Financial Summary</h3>
      <p><strong>Balance:</strong> Rs{customer.balance}</p>
      <p><strong>Total Orders Amount:</strong> Rs{totalOrdersAmount}</p>

      <hr className="my-4" />

      <h3 className="text-lg font-semibold">Order History</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {orders.map(order => (
            <li key={order._id} className="p-3 bg-gray-100 rounded-md shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> Rs{order.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
