import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';

window.onload = function() {
    $('#submit').on('click', function() {

        $.ajax({
            type: "post",
            url: "http://localhost:8888/users/login",
            data: {
                username: $('[name=username]').val(),
                password: $('[name=password]').val()
            },
            dataType: "json",
            success: function(response) {
                console.log('登录成功');
                location.href = "http://localhost:8888";
            }
        });
    });
}