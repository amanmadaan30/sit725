const express = require('express');
const app = express();
const port = 3000;
const contactController = require('./controllers/contactController');
const contactModel = require('./models/contactModel');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

// Middleware to parse JSON bodies
app.use(express.static('public'));
app.use(express.json());

// socket.io setup
io.on('connection', (socket) => {
  console.log('A client is connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Emit a random number every second
  setInterval(() => {
    let randomNumber = parseInt(Math.random() * 10);
    socket.emit('number', randomNumber);
    console.log('Emitting Number: ' + randomNumber);
  }, 1000);
});

// Initialize MongoDB connection
contactModel.runDBConnection();

// Routes
app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/api/contactUs', contactController.getContacts);
app.post('/api/contactUs', contactController.saveContact);

http.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
