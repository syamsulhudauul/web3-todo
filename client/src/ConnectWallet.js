import React from 'react';
import { useState } from "react";
import { ethers } from "ethers";

function ConnectWallet() {
  const [account, setAccount] = useState("");

  async function connect() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Connected:", address);
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  }

  return (
    <div>
      <button onClick={connect}>Connect MetaMask</button>
      {account && <p>Connected: {account}</p>}
    </div>
  );
}

export default ConnectWallet;
