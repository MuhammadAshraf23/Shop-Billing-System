import CustomerList from "@/components/CustomerList";

export default function Home() {
  return ( // ✅ Added return statement
    <>
      <h1>Billing System</h1>
      {/* <AddCustomer /> */}
      <CustomerList />
    </>
  );
}
