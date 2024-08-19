// server.js
const express = require('express');
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const contactController = require('./controllers/contactController');
const contactModel = require('./models/contactModel');

// Middleware to parse JSON bodies
app.use(express.static('public'));
app.use(express.json());

// Initialize MongoDB connection
contactModel.runDBConnection();

// Routes
app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/api/contactUs', contactController.getContacts);
app.post('/api/contactUs', contactController.saveContact);

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
