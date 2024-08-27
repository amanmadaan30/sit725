$(document).ready(function(){
    $('.materialboxed').materialbox();

    $('#formSubmit').click((event)=>{
        event.preventDefault(); 
        formSubmitted();
    });

    $('.modal').modal();
    getAllContacts();
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

function getAllContacts(){
    $.get('/api/contactUs', (response)=>{
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}
