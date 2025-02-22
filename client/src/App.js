import React from 'react';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ConnectWallet from "./ConnectWallet";
import "./App.css";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // replace with deployed contract address, TODO: access env value
const ABI = [
  "function createTask(string memory _content) public",
  "function toggleComplete(uint256 _id) public",
  "function deleteTask(uint256 _id) public",
  "function taskCount() public view returns (uint256)",
  "function tasks(uint256) public view returns (uint256 id, string memory content, bool completed)"
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadBlockchainData() {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const web3Signer = web3Provider.getSigner();
        const todoContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, web3Signer);

        setProvider(web3Provider);
        setSigner(web3Signer);
        setContract(todoContract);

        const taskCount = await todoContract.taskCount();
        let loadedTasks = [];
        for (let i = 1; i <= taskCount; i++) {
          const task = await todoContract.tasks(i);
          if (task.content) {
            loadedTasks.push(task);
          }
        }
        setTasks(loadedTasks);
      }
    }
    loadBlockchainData();
  }, []);

  const createTask = async () => {
    if (contract && newTask) {
      const tx = await contract.createTask(newTask);
      await tx.wait();
      setTasks([...tasks, { id: tasks.length + 1, content: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = async (id) => {
    const tx = await contract.toggleComplete(id);
    await tx.wait();
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = async (id) => {
    const tx = await contract.deleteTask(id);
    await tx.wait();
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Web3 To-Do List</h1>
      <ConnectWallet />
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={createTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.content}
            </span>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
