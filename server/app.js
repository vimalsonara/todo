const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const Todo = require('./models/todo');

const app = express();

require('dotenv').config();

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  Todo.find().then((result) => {
    res.json({ todos: result });
    console.log(result);
  });
});

// app.use(express.json());

// app.use('/todos', todoRoutes);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
