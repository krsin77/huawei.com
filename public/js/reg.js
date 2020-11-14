import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';

window.onload = function() {
    $('#submit').on('click', function() {

        // 表单验证
        // var reg = {
        //     "username": /^[A-z]\w{5,15}$/,
        //     "password": /^.{6,16}$/,
        //     "email": /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/,
        //     "phone": /^1[3-9]\d{9}$/
        // };

        // var inp = document.querySelectorAll('#myform>input:not([type="submit"])');
        // var pass = document.querySelector('#myform>#pass');
        // var password = document.querySelector('#myform>#password');
        // var submit = document.querySelector('#submit');
        // // console.log(inp);

        // inp.forEach(function(elm) {
        //     if (elm.id == 'pass') return;
        //     elm.oninput = function() {
        //         // reg[this.id] 通过元素id选择正则表达式
        //         if (reg[this.id].test(this.value)) {
        //             this.nextElementSibling.innerHTML = '通过验证';
        //             this.dataset.pass = true;
        //         } else {
        //             this.nextElementSibling.innerHTML = '未通过验证';
        //             this.dataset.pass = false;
        //         }
        //         check();
        //     }
        // });

        // pass.oninput = function() {
        //     if (this.value === password.value) {
        //         this.nextElementSibling.innerHTML = '通过验证';
        //         this.dataset.pass = true;
        //     } else {
        //         this.nextElementSibling.innerHTML = '未通过验证';
        //         this.dataset.pass = false;
        //     }
        //     check();
        // }

        // function check() {
        //     var allPass = document.querySelectorAll('#myform>input[data-pass="true"]');
        //     if (allPass.length === 5) submit.removeAttribute('disabled');
        // }
        let password = $.md5($('[name=password]').val());
        $.ajax({
            type: "post",
            url: "http://localhost:8888/users/reg",
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
                location.href = "http://localhost:8888";
            }
        });
    });
}