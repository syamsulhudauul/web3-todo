# Web3 To-Do List

This is a decentralized to-do list application that allows users to manage their tasks on the blockchain. The project leverages smart contracts to ensure transparency and immutability.

## 📌 Features
✅ Users can add, update, mark complete, and delete tasks.
🔗 Tasks are stored on the blockchain (testnet).
🦊 Users interact using MetaMask.
💻 Front-end in React + Ethers.js.
📜 Smart contract in Solidity (EVM-compatible).

## 🛠 Tech Stack
- **Smart Contract**: Solidity + Hardhat
- **Blockchain**: MonadTestnet (or any EVM testnet)
- **Front-End**: React + Ethers.js
- **Wallet**: MetaMask
- **Deployment**: Hardhat

## 🚀 Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/syamsulhudauul/web3-todo.git
   cd web3-todo
   ```

2. Install dependencies:
   ```sh
   cd client
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

4. Deploy the smart contract:
   ```sh
   cd smart-contract
   npx hardhat run scripts/deploy.js --network {networkName}
   ```

5. Connect MetaMask to your testnet and interact with the DApp.

## 📜 License
This project is licensed under the MIT License.

