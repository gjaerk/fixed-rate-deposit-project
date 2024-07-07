
# Blockchain-Powered Digital Bank POC

A proof of concept leveraging blockchain technology across all operational areas, focusing on fixed rate deposits.

## Project Overview

This project demonstrates an implementation of blockchain technology. It showcases the potential for increased efficiency, transparency, and security in banking operations, while offering innovative products like fixed rate deposits.

## Features

- Blockchain-based core banking system
- Smart contract-powered financial products:
  - Fixed rate deposits

## Technology Stack

- Blockchain Platform: Hyperledger Fabric
- Smart Contracts: Solidity
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB (for off-chain data)
- Identity Management: Hyperledger Indy
- API Integration: RESTful APIs and GraphQL

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/gjaerk/blockchain-digital-bank-poc.git
   cd blockchain-digital-bank-poc
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the blockchain network (Hyperledger Fabric):
   ```
   ./setup-blockchain-network.sh
   ```

4. Deploy smart contracts:
   ```
   truffle migrate --network development
   ```

5. Start the application:
   ```
   npm start
   ```

## Usage

1. Access the web application at `http://localhost:3000`
2. Create an account and complete the KYC process
3. Explore available products:
   - Create fixed rate deposits

## Project Status and Roadmap

Current Status: Active Development

Upcoming Features:
- Mobile application development
- Expansion of loan products
- Implementation of blockchain-based interbank settlement system

## License

This project is licensed under the [MIT License](LICENSE).

