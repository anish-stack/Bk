import React from 'react';

const Bill = ({ logo, shopName, address, phone, items, termsAndConditions }) => {
    const handlePrint = ()=>{
        window.print()
    }
  return (
    <div className="bg-white p-8 shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <img src={logo} alt="Logo" className="w-16 h-auto" />
          <div className="mt-2">
            <p className="text-lg font-bold">{shopName}</p>
            <p className="text-sm">{address}</p>
            <p className="text-sm">{phone}</p>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 py-2 px-4 text-sm font-semibold">Product Name</th>
            <th className="border border-gray-300 py-2 px-4 text-sm font-semibold">Price</th>
            <th className="border border-gray-300 py-2 px-4 text-sm font-semibold">Quantity</th>
            <th className="border border-gray-300 py-2 px-4 text-sm font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-300 py-2 px-4">{item.name}</td>
              <td className="border border-gray-300 py-2 px-4">${item.price}</td>
              <td className="border border-gray-300 py-2 px-4">{item.quantity}</td>
              <td className="border border-gray-300 py-2 px-4">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <p className="text-sm font-semibold">Total: ${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <p className="text-sm">{termsAndConditions}</p>
      </div>
    </div>
  );
};

export default Bill;
