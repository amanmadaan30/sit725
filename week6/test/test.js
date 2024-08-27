import { expect } from "chai";
import axios from 'axios';

describe("Contact Us Tests", function () {
    const url = "http://localhost:3000/api/contactUs";

    it("returns status 201 to check if contact is successfully saved", async function () {
        const contactUs = {
            name: "Aman Madaan",
            email: "aman.madaan@gmail.com",
            phone: "345345464",
            message: "This is a test contact message"
        };

        const response = await axios.post(url, contactUs);
        expect(response.status).to.equal(201);
    });

    it("returns error 500 if data is missing", async function () {
        const incompleteContact = {
            name: "Aman Madaan"
        };

        try {
            await axios.post(url, incompleteContact);
        } catch (error) {
            expect(error.response.status).to.equal(500);
        }
    });

    it("returns the inserted contact data in response", async function () {
        const contactUs = {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            phone: "0987654321",
            message: "Another test message"
        };

        const response = await axios.post(url, contactUs);
        const body = response.data;

        expect(body.data.name).to.equal("Jane Doe");
        expect(body.data.email).to.equal("jane.doe@example.com");
        expect(body.data.phone).to.equal("0987654321");
        expect(body.data.message).to.equal("Another test message");
    });
});


describe("GET Request Tests", function () {
    const url = "http://localhost:3000/api/contactUs";

    it("returns an empty array if no data exists", async function () {
        const response = await axios.get(url);
        const body = response.data;

        expect(response.status).to.equal(200);
        expect(body.data).to.be.an('array').that.is.empty;
    });

    it("returns the correct content type as JSON", async function () {
        const response = await axios.get(url);

        expect(response.headers['content-type']).to.include('application/json');
    });

});
