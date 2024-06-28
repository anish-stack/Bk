import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4 text-lg">Thank you for your payment. Your transaction was successful.</p>
        <a
          href="/"
          className="mt-6 inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
