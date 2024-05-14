// SettingsDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

const SettingsDashboard = () => {
  const email = useSelector((state) => state.email.email);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (email) => {
    try {
      const response = await axios.post('http://localhost:7036/api/task-data', {
        email: email
      });
      setTasks(response.data); // Assuming response.data is an array of tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(email);
  }, [email]);

  const handleEdit = async (taskId, updatedFields) => {
    try {
      // Update backend to edit task
      console.log(taskId, updatedFields);
      await axios.post(`http://localhost:7036/api/edit-task/${taskId}`, updatedFields);
      
      // Update frontend to reflect changes
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, ...updatedFields };
        } else {
          return task;
        }
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      // Update backend to add task to "deleted" list
      console.log(taskId);
      await axios.post('http://localhost:7036/api/delete-task', {
        taskId: taskId
      });
  
      // Update frontend to remove task from tasks list
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleChangeStatus = async (taskId, status) => {
    try {
      // Update backend to edit task status
      await handleEdit(taskId, { status });
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const handleChangeDueDate = async (taskId, dueDate) => {
    try {
      // Update backend to edit task due date
      await handleEdit(taskId, { dueDate });
    } catch (error) {
      console.error('Error changing due date:', error);
    }
  };
  
  return (
    <div>
      <h2>Settings Dashboard</h2>
      <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <Card style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Project Name: {task.title}
              </Typography>
              <Typography color="textSecondary">Description: {task.description}</Typography>
              <Typography color="textSecondary">Due Date: {task.dueDate}</Typography>
              <Typography color="textSecondary">Status: {task.status}</Typography>
              <TextField
                label="Status"
                defaultValue={task.status}
                onChange={(e) => handleChangeStatus(task._id, e.target.value)}
              />
              <TextField
                label="Due Date"
                defaultValue={task.dueDate}
                onChange={(e) => handleChangeDueDate(task._id, e.target.value)}
              />
              <Button color="secondary" onClick={() => handleDelete(task._id)}>Delete</Button>
            </CardContent>
          </Card>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SettingsDashboard;
