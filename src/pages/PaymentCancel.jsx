
// src/pages/PaymentCancel.jsx
import { XCircle } from 'tabler-icons-react';

export default function PaymentCancel() {
  return (
    <div className="payment-status">
      <XCircle size={64} color="red" />
      <h2>Payment Cancelled</h2>
      <p>Your booking was not completed.</p>
    </div>
  );
}