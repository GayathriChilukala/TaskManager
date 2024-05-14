import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';

const LabelDashboard = () => {
  const email = useSelector((state) => state.email.email);
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

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

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredTasks = filterStatus
    ? tasks.filter(task => task.status === filterStatus)
    : tasks;

  return (
    <div>
      <h2>Label Dashboard</h2>
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          label="Status Filter"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <div>
        {filteredTasks.map((task) => (
          <Card key={task.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Project Name: {task.title}
              </Typography>
              <Typography color="textSecondary">Description: {task.description}</Typography>
              <Typography color="textSecondary">Status: {task.status}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LabelDashboard;
