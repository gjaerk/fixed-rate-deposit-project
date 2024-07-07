// File: frontend/src/components/DepositForm.js

import React, { useState } from 'react';

function DepositForm({ createDeposit }) {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState(365);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount >= 20000 && amount <= 85000) {
      createDeposit(amount, term);
    } else {
      alert('Deposit amount must be between 20,000 and 85,000 GBP');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Deposit Amount (GBP):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="20000"
          max="85000"
          required
        />
      </div>
      <div>
        <label htmlFor="term">Term:</label>
        <select id="term" value={term} onChange={(e) => setTerm(Number(e.target.value))}>
          <option value={365}>1 Year</option>
          <option value={730}>2 Years</option>
        </select>
      </div>
      <button type="submit">Create Deposit</button>
    </form>
  );
}

export default DepositForm;