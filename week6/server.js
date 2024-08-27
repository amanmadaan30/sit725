import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Workaround for __dirname and __filename in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes and logic as per your existing setup
app.post('/api/contactUs', (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(500).json({ error: 'Missing fields' });
    }

    // Simulate saving to a database
    const savedContact = { name, email, phone, message };

    return res.status(201).json({ data: savedContact });
});

app.get('/api/contactUs', (req, res) => {
    // Simulate fetching from a database
    const contacts = []; // You can replace this with actual data

    res.status(200).json({ data: contacts });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
