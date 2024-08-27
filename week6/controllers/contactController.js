const contactModel = require('../models/contactModel');

function getContacts(req, res) {
    contactModel.getAllContacts((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'Contacts retrieved successfully' });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Failed to retrieve contacts' });
        }
    });
}

function saveContact(req, res) {
    const contactUs = req.body;
    contactModel.postContact(contactUs, (err, result) => {
        if (!err) {
            res.status(201).json({ statusCode: 201, data: result, message: 'Contact saved successfully' });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Failed to save contact' });
        }
    });
}

module.exports = {
    getContacts,
    saveContact
};
