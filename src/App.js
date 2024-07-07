import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import FixedRateDeposit from './contracts/FixedRateDeposit.json';
import DepositForm from './components/DepositForm';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Initialize web3
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.enable();
          setWeb3(web3Instance);

          // Get accounts
          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);

          // Get network ID and deployed address
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = FixedRateDeposit.networks[networkId];

          // Create contract instance
          const instance = new web3Instance.eth.Contract(
            FixedRateDeposit.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(instance);
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    init();
  }, []);

  const createDeposit = async (amount, term) => {
    try {
      await contract.methods.createDeposit(
        web3.utils.toWei(amount.toString(), 'ether'),
        term
      ).send({ from: accounts[0] });
      console.log('Deposit created successfully');
    } catch (error) {
      console.error('Error creating deposit:', error);
    }
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <h1>Fixed Rate Deposit</h1>
      <DepositForm createDeposit={createDeposit} />
    </div>
  );
}

export default App;