const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint to add two numbers
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 && num2) {
    const sum = parseFloat(num1) + parseFloat(num2);
    res.json({ result: sum });
  } else {
    res.status(400).json({ error: 'Please provide num1 and num2' });
  }
});

// POST endpoint to add two numbers
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (num1 !== undefined && num2 !== undefined) {
    const sum = parseFloat(num1) + parseFloat(num2);
    res.json({ result: sum });
  } else {
    res.status(400).json({ error: 'Please provide num1 and num2 in the space provided' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
