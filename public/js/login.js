import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';
import { baseUrl } from './library/config.js';

$('#submit').on('click', function() {
    let password = $.md5($('[name=password]').val());

    $.ajax({
        type: "post",
        url: `${baseUrl}/users/login`,
        data: {
            username: $('[name=username]').val(),
            password: password
        },
        dataType: "json",
        success: function(response) {
            console.log(response);
            location.href = `${baseUrl}`;
        }
    });
});