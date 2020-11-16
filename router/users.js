const express = require('express');
const conn = require('../dao/conn');
const crypto = require('crypto');

const router = express.Router(); // 获得路由对象

router.route('/reg')
    .post((req, res, next) => {
        // 判断用户名是否存在
        let searchUser = `select * from users where user_name='${req.body.username}'`;

        conn.query(searchUser, (err, results) => {
            if (err) console.log(err);
            if (results.length) {
                res.json({ msg: '用户名已存在', username: req.body.username, error: 1 });
            } else {
                let md5 = crypto.createHash('md5'); // 创建一个哈希加密
                let passResult = md5.update(req.body.password).digest('hex'); // 加密内容获得16进制结果
                let sql = `insert into users(user_name, user_password,user_email, user_phone, user_address) 
                        values('${req.body.username}','${passResult}','${req.body.email}','${req.body.phone}','${req.body.address}')`;

                conn.query(sql, (err, result) => {
                    if (err) console.log(err);
                    if (result.insertId) {
                        res.cookie('username', req.body.username);
                        res.cookie('isLogined', true);
                        res.json({
                            msg: "注册成功",
                            username: req.body.username,
                            error: 0
                        });
                    }
                });
            }
        });
    });

router.route('/login')
    .post((req, res, next) => {
        let searchUser = `select * from users where user_name='${req.body.username}'`;
        let password = `select * from users where user_password='${req.body.password}'`;
        conn.query(searchUser, (err, resultUser) => {
            if (err) throw err;
            if (resultUser.length) {
                conn.query(password, (err, resultPassword) => {
                    if (err) console.log(err);
                    if (resultPassword.length) {
                        res.json({
                            'msg': '登录成功'
                        })
                    } else {
                        res.json({
                            'msg': '密码错误'
                        })
                    }
                })
            } else {
                res.json({
                    'msg': '用户名或者密码错误'
                })
            }
        })
    })

module.exports = router; // 路由导出