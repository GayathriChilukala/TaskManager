import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const TrashDashboard = () => {
  const email = useSelector((state) => state.email.email);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const fetchDeletedTasks = async () => {
    try {
      const response = await axios.post('http://localhost:7036/api/deleted-tasks', {
        email: email
      });
      setDeletedTasks(response.data); // Assuming response.data is an array of deleted tasks
    } catch (error) {
      console.error('Error fetching deleted tasks:', error);
    }
  };

  useEffect(() => {
    fetchDeletedTasks();
  }, [email]);

  return (
    <div>
      <h2>Trash Dashboard</h2>
      <div>
        <h3>Deleted Tasks</h3>
        {deletedTasks.map((task) => (
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

export default TrashDashboard;
