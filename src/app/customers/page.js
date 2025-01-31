import CustomerList from "@/components/CustomerList";

export default function CustomersPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <CustomerList />
    </div>
  );
}
