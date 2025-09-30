import React from 'react';

const TransactionHistory = ({ transactions }) => {
  if (transactions.length === 0) return null;

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.slice(0, 5).map((t) => (
          <div key={t._id} className="flex justify-between items-center p-3 border-b last:border-b-0">
            <div>
              <p className="font-semibold text-slate-800">{t.product?.name || 'Product not found'}</p>
              <p className="text-sm text-slate-500">Bought {t.units} units @ ₹{t.pricePerUnit.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-600">- ₹{(t.units * t.pricePerUnit).toFixed(2)}</p>
              <p className="text-sm text-slate-500">{new Date(t.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;