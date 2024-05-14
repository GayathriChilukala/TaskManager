import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux'; 

const TaskDashboard = () => {
  // State for managing tasks
  const email = useSelector((state) => state.email.email);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
    assignedTo: '',
    createdDate: '',
    estimatedTime: '',
    projectName: ''
  });

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Function to handle form submission for creating a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7036/api/createTask', {
        ...taskData,
        email: email
      });
      console.log(response.data); // Log response from backend
      // Reset form fields
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        status: '',
        assignedTo: '',
        createdDate: '',
        estimatedTime: '',
        projectName: ''
      });
      // Fetch tasks after creating a new one
      fetchTasks(email);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const fetchTasks = async (email) => {
    try {
      console.log(email);
      const response = await axios.post('http://localhost:7036/api/task-data', {
        email: email
      });
      setTasks(response.data); // Assuming response.data is an array of tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks(email);
  }, [email]);

  return (
    <div>
      <h2>Tasks</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create Task</Button>
      {tasks.map((task) => (
        <Card key={task.id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {task.title}
            </Typography>
            <Typography color="textSecondary">{task.description}</Typography>
            <Typography color="textSecondary">Due Date: {task.dueDate}</Typography>
            <Typography color="textSecondary">Priority: {task.priority}</Typography>
            <Typography color="textSecondary">Status: {task.status}</Typography>
            <Typography color="textSecondary">Assigned To: {task.assignedTo}</Typography>
            <Typography color="textSecondary">Created Date: {task.createdDate}</Typography>
            <Typography color="textSecondary">Estimated Time: {task.estimatedTime}</Typography>
            <Typography color="textSecondary">Project Name: {task.projectName}</Typography>
          </CardContent>
        </Card>
      ))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Name"
              fullWidth
              name="title"
              value={taskData.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={taskData.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Due Date"
              type="date"
              fullWidth
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Priority"
              select
              fullWidth
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              {['High', 'Medium', 'Low'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Status"
              select
              fullWidth
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              {['To Do', 'In Progress', 'Completed'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Assigned To"
              fullWidth
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Created Date"
              type="date"
              fullWidth
              name="createdDate"
              value={taskData.createdDate}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Estimated Time"
              fullWidth
              name="estimatedTime"
              value={taskData.estimatedTime}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Project Name"
              fullWidth
              name="projectName"
              value={taskData.projectName}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default TaskDashboard;
