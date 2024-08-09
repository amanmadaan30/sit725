const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text">'+item.description+'</p>'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    console.log("Form Submitted"); // Debugging line
    let formData = {
    name: $('#name').val(),
    email: $('#email').val(),
    phone: $('#phone').val(),
    message: $('#message').val(),
    };

    console.log("Form Data:", formData); // Debugging line
    postContact(formData);
}

function postContact(contactUs) {
    $.ajax({
        url: '/api/contactUs',
        type: 'POST',
        contentType: 'application/json',  // Ensure the data is being sent as JSON
        data: JSON.stringify(contactUs),  // Convert the form data to a JSON string
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
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    
    $('#formSubmit').click((event)=>{
        event.preventDefault(); // Prevents the default form submission behavior
        formSubmitted();
    });

    $('.modal').modal();
    getAllContacts();
});
