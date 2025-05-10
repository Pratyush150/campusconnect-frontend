// src/pages/PaymentCancel.jsx
import React from 'react';
// ...rest of your imports and code
import { IconCircleX } from '@tabler/icons-react';

export default function PaymentCancel() {
  return (
    <div className="payment-status">
      <IconCircleX size={64} color="red" />
      <h2>Payment Cancelled</h2>
      <p>Your booking was not completed.</p>
    </div>
  );
}

