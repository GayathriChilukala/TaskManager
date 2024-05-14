import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import 'react-vis/dist/style.css';
import { useSelector } from 'react-redux';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ReportsDashboard = () => {
  const email = useSelector((state) => state.email.email);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:7036/api/task-data', { email });
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]);

  // Extract task counts from taskData
  const taskCounts = taskData.reduce((acc, task) => {
    const status = task.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the bar chart
  const data = [
    { x: 'To Do', y: taskCounts['To Do'] || 0 },
    { x: 'In Progress', y: taskCounts['In Progress'] || 0 },
    { x: 'Completed', y: taskCounts['Completed'] || 0 }
  ];

  // Function to convert data to HTML table
  const generateHTMLTable = () => {
    return (
      <table id="taskDataTable">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map(task => (
            <tr key={task._id}>
              <td>{task.projectName}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Reports Dashboard</h2>
      <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
      <ReactHTMLTableToExcel
        id="excelButton"
        className="download-table-xls-button"
        table="taskDataTable"
        filename="task_data"
        sheet="task_data"
        buttonText="Download Task Data as Excel"
        style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
      />
      {generateHTMLTable()}
    </div>
  );
};

export default ReportsDashboard;
