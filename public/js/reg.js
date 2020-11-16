import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';
import { baseUrl } from './library/config.js';

$('#submit').on('click', function() {

    let password = $.md5($('[name=password]').val());
    $.ajax({
        type: "post",
        url: `${baseUrl}/users/reg`,
        data: {
            username: $('[name=username]').val(),
            password: password,
            email: $('[name=email]').val(),
            phone: $('[name=phone]').val(),
            address: $('[name=address]').val(),
        },
        dataType: "json",
        success: function(response) {
            alert('注册成功');
            location.href = `${baseUrl}`;
        }
    });
});