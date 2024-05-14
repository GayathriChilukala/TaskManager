import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';

const ReminderDashboard = () => {
  const email = useSelector((state) => state.email.email);
  const [tasks, setTasks] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState('');

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

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tenDaysFromNow = new Date();
  tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);

  const filteredTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    switch (selectedDateRange) {
      case 'today':
        return isSameDay(dueDate, today);
      case 'tomorrow':
        return isSameDay(dueDate, tomorrow);
      case 'tenDays':
        return dueDate >= today && dueDate <= tenDaysFromNow;
      default:
        return true; // Show all tasks if no date range is selected
    }
  });

  return (
    <div>
      <h2>Reminder Dashboard</h2>
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Date Range</InputLabel>
        <Select
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          label="Date Range"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="tomorrow">Tomorrow</MenuItem>
          <MenuItem value="tenDays">Next 10 Days</MenuItem>
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
              <Typography color="textSecondary">Due Date: {task.dueDate}</Typography>
              <Typography color="textSecondary">Status: {task.status}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReminderDashboard;
