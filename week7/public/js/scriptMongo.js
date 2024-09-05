$(document).ready(function() {
    $('.materialboxed').materialbox();

    // Form submission handler
    $('#formSubmit').click((event) => {
        event.preventDefault();
        formSubmitted();
    });

    $('.modal').modal();
    getAllContacts();

    // Socket.io setup to listen for the random number emitted by the server
    let socket = io();
    socket.on('number', (msg) => {
        console.log('Random Number: ' + msg);
        // Display the random number on the page
        $('#randomNumber').text('Random Number: ' + msg);
    });

    console.log('Document ready');
});

function formSubmitted() {
    let formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        message: $('#message').val(),
    };
    postContact(formData);
}

function postContact(contactUs) {
    $.ajax({
        url: '/api/contactUs',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contactUs),
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Contact saved successfully');
            }
        },
        error: (xhr, status, error) => {
            console.error("Error posting contact:", status, error);
            alert('Failed to save contact');
        }
    });
}

function getAllContacts() {
    $.get('/api/contactUs', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}
