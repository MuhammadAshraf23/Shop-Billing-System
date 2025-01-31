import { notFound } from "next/navigation";

async function fetchCustomer(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${id}`);
  return res.ok ? res.json() : null;
}

export default async function CustomerDetails({ params }) {
  const { id } = params; // Destructure id from params
  const customer = await fetchCustomer(id);
  
  if (!customer) return notFound();

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Balance:</strong> ${customer.balance}</p>
    </div>
  );
}
