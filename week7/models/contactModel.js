const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://s224141207:Aman%407486@cluster0.5shbivq.mongodb.net/";

let collection;

async function runDBConnection() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        collection = client.db("test").collection('contactUs');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed", error);
    }
}

function getAllContacts(callback) {
    collection.find({}).toArray(callback);
}

function postContact(contactUs, callback) {
    collection.insertOne(contactUs, callback);
}

module.exports = {
    runDBConnection,
    getAllContacts,
    postContact
};
