const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const usersRouter = require('./router/users');
const productRouter = require('./router/product');

let conf = {
    port: 8888,
    host: 'localhost'
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use('/users', usersRouter);
app.use('/product', productRouter);

app.listen(conf.port, conf.host, () => {
    console.log(`server is running on http://${conf.host}:${conf.port}`);
})