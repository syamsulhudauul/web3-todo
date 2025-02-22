// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TodoList {
    uint256 public taskCount;
    
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string content);
    event TaskCompleted(uint256 id, bool completed);
    event TaskDeleted(uint256 id);

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content);
    }

    function toggleComplete(uint256 _id) public {
        Task storage task = tasks[_id];
        task.completed = !task.completed;
        emit TaskCompleted(_id, task.completed);
    }

    function deleteTask(uint256 _id) public {
        delete tasks[_id];
        emit TaskDeleted(_id);
    }
}
