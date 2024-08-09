const express = require('express');
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://s224141207:Aman%407486@cluster0.5shbivq.mongodb.net/"

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

async function runDBConnection() {
  try {
      await client.connect();
      collection = client.db("test").collection('contactUs');
      console.log("Connected to mongo db");
  } catch(ex) {
      console.error("Mongo db connection failed",ex);
  }
}

app.get('/', function (req,res) {
  res.render('index.html');
});

// GET endpoint to add two numbers
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 && num2) {
    const sum = parseFloat(num1) + parseFloat(num2);
    res.json({ result: sum });
  } else {
    res.status(400).json({ error: 'Please provide num1 and num2 query parameters' });
  }
});

app.get('/api/contactUs', (req,res) => {
  getAllContacts((err,result)=>{
      if (!err) {
          res.json({statusCode:200, data:result, message:'get list of contacts successful'});
      }
  });
});

app.post('/api/contactUs', (req,res)=>{
  console.log("POST request received at /api/contactUs");
  let contactUs = req.body;
  console.log("Received contactUs data:", contactUs);
  postContact(contactUs, (err, result) => {
      if (!err) {
          res.json({statusCode:201, data:result, message:'success'});
      } else {
        console.error("Failed to save contact:", err);
        res.status(500).json({ statusCode: 500, message: 'Failed to save contact' });
    }
  });
});

// function postContact(contactUs,callback) {
//   collection.insertOne(contactUs,callback);
// }

function postContact(contactUs) {
  collection.insertOne(contactUs, (err, result) => {
      if (err) {
          console.error("Error inserting contact into MongoDB:", err);
          return;
      }
      console.log("Contact inserted into MongoDB:", result.ops[0]);  // Log the inserted document
  });
}


function getAllContacts(callback){
  collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
  console.log('express server started');
  runDBConnection();
});

// POST endpoint to add two numbers
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (num1 !== undefined && num2 !== undefined) {
    const sum = parseFloat(num1) + parseFloat(num2);
    res.json({ result: sum });
  } else {
    res.status(400).json({ error: 'Please provide num1 and num2 in the body' });
  }
});
