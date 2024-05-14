const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// Define MongoDB connection
mongoose.connect('mongodb+srv://chilukalagayathri:Hyderabad%401@cluster0.eftditi.mongodb.net/task-manager', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
// Define deletedTask schema
const deletedTaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: String,
    priority: String,
    status: String,
    assignedTo: String,
    createdDate: String,
    estimatedTime: String,
    projectName: String,
    email: String
});

const DeletedTask = mongoose.model('DeletedTask', deletedTaskSchema);

// Now you can use DeletedTask model in your code

// Define user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    allowExtraEmails: Boolean,
});
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: String,
    priority: String,
    status: String,
    assignedTo: String,
    createdDate: String,
    estimatedTime: String,
    projectName: String,
    email: String // Add email field to store user's email
});
const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// Define GraphQL schema
const schema = buildSchema(`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        allowExtraEmails: Boolean!
    }
  
    type Task {
        id: ID!
        title: String!
        description: String
        dueDate: String
        priority: String
        status: String
        assignedTo: String
        createdDate: String
        estimatedTime: String
        projectName: String
        userEmail: String # Assuming you want to link tasks to users via email
    }
    
    type Query {
        users: [User]
        tasks: [Task] # New query to fetch tasks
    }
    
    type Mutation {
        signUp(firstName: String!, lastName: String!, email: String!, password: String!, allowExtraEmails: Boolean!): User
        createTask(title: String!, description: String, dueDate: String, priority: String, status: String, assignedTo: String, createdDate: String, estimatedTime: String, projectName: String, userEmail: String): Task
    }
    
`);

// Define resolvers
const root = {
    users: () => User.find(),
    tasks: async ({ email }) => {
        try {
          // Fetch tasks based on the provided email address
          const tasks = await Task.find({ email });
          return tasks;
        } catch (error) {
          throw new Error('Error fetching tasks');
        }
      },

    // Resolver for fetching all tasks
    signUp: async ({ firstName, lastName, email, password, allowExtraEmails }) => {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const newUser = new User({ firstName, lastName, email, password, allowExtraEmails });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    createTask: async ({ title, description, dueDate, priority, status, assignedTo, createdDate, estimatedTime, projectName, userEmail }) => {
        try {
            const newTask = new Task({ title, description, dueDate, priority, status, assignedTo, createdDate, estimatedTime, projectName, email: userEmail });
            await newTask.save();
            return newTask;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};


// Create Express app
const app = express();
app.use(cors()); 
app.use(bodyParser.json());

// Parse URL-encoded bodies for form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Apply middleware for Express GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));
// Define route for creating a task
app.post('/api/createTask', async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = new Task(taskData);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            // If login is successful, return success status
            res.status(200).json({ message: 'Login successful' });
        } else {
            // If login fails, return error status
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/api/task-data', async (req, res) => {
    try {
        
        const { email } = req.body;
        
        const task = await Task.find({ email });
        if (task.length > 0) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'No tasks found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API endpoint for user registration
app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, allowExtraEmails } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ firstName, lastName, email, password, allowExtraEmails });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/delete-task', async (req, res) => {
    console.log('hi');
    const { taskId } = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // Create a new DeletedTask document
        const deletedTask = new DeletedTask({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            status: task.status,
            assignedTo: task.assignedTo,
            createdDate: task.createdDate,
            estimatedTime: task.estimatedTime,
            projectName: task.projectName,
            email: task.email
        });
        await deletedTask.save(); // Save the deleted task
        await Task.findByIdAndDelete(taskId); // Delete the task from Task collection
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/api/edit-task/:id', async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error editing task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Update backend route to fetch deleted tasks
app.post('/api/deleted-tasks', async (req, res) => {
    try {
        const { email } = req.body;
        const deletedTasks = await DeletedTask.find({ email });
        res.status(200).json(deletedTasks);
    } catch (error) {
        console.error('Error fetching deleted tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = 7036;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
