const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const Todo = require('./models/todo');

const app = express();

app.use(cors());

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

app.use(express.json());

app.use('/', todoRoutes);

app.listen(process.env.PORT, () => {
  console.log('listening on port 3000');
});
