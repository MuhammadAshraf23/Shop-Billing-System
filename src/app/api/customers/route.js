import { NextResponse } from 'next/server';

let customers = [
  { id: 1, name: 'John Doe', contact: '1234567890', balance: 500 },
  { id: 2, name: 'Jane Smith', contact: '9876543210', balance: 1500 },
  { id: 3, name: 'Alice Johnson', contact: '5555555555', balance: 250 },
];

export async function GET() {
  // Return the customer data
  return NextResponse.json(customers);
}
