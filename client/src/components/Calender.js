import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarDashboard = () => {
  const email = useSelector((state) => state.email.email);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const getTasksForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Convert date to ISO string format
    return tasks.filter(task => task.dueDate === formattedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0]; // Convert date to ISO string format
    const isDueDate = tasks.some(task => task.dueDate === formattedDate);
    return isDueDate && <div className="green-dot" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Calendar Dashboard</h2>
      <style>
        {`
          .green-dot {
            background-color: green;
            color: white;
            border-radius: 50%;
            width: 10px;
            height: 10px;
          }
        `}
      </style>
      <Calendar
  onChange={handleDateChange}
  value={selectedDate}
  tileContent={tileContent}
  style={{
    margin: 'auto',
    alignSelf: 'center',
  }}
/>

      <h3>Tasks for {selectedDate.toDateString()}</h3>
      {getTasksForDate(selectedDate).map((task) => (
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
  );
};

export default CalendarDashboard;
