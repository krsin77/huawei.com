import './library/jquery.js';
// import './library/Z.js';
import { baseUrl } from './library/config.js';
import cookie from './library/cookie.js';

(function() {
    let id = location.search.split('=')[1]; // 获得商品id

    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getItem`,
        data: { id: id },
        dataType: "json",
        success: function(res) {
            res = res[0];
            let picture = JSON.parse(res.picture);

            let details = JSON.parse(res.details);

            let color = JSON.parse(res.pcolor);
            console.log(color);

            let line = `
            <a href="">首页</a>&nbsp;&gt;&nbsp;<a href="">热销单品</a>&nbsp;&gt;&nbsp;<a href="">${res.name}系列</a>&nbsp;&gt;&nbsp;<a href="">${res.title}</a>
            `;

            let template = `
            <div class="pro-left">
                <div class="pro-img small">
                    <img src="../${picture[1].src}" alt="">  
                    <div class="movebox hide"></div>
                </div>
                <div class="big hide">
                    <img src="../${picture[1].src}" alt="" class="bigpic">
                </div>
            </div>
            <div class="pro-right">
                <div class="pro-card">
                    <div class="card-top">
                        <h1>${res.title}</h1>
                        <a href="">${res.subtitle}</a>
                    </div>
                    <div class="card-price">
                        <div class="card-p">
                            <span>价&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <em>¥&nbsp;&nbsp;${res.price}</em>
                        </div>
                        <div class="card-s">
                            <div class="s-left">
                                <span>促&nbsp;&nbsp;&nbsp;&nbsp;销&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <div class="s-right">
                                <div style="margin-bottom: 20px;"><em>商品赠券</em><span>${res.ticket}</span></div>
                                <div><em>赠送积分</em><span>${res.present}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-explain">
                        <div style="margin-bottom: 20px;"><span>服务说明</span><em>已满48元已免运费 由华为商城负责发货，并提供售后服务</em></div>
                        <div style="margin-bottom: 5px;"><span>商品编码</span><em>2601010234001</em></div>
                    </div>
                    <div class="des">
                        <div class="des-color">
                            <span>选择颜色</span>
                            <div class="des-phone">
                                <ul class="colorred clearfix ">
                                    <li class="">
                                        <a href="javascript:"><img src="../${color[0].src}" alt=""><span>${color[0].color}</span></a>
                                    </li>
                                    <li>
                                        <a href="javascript:"><img src="../${color[1].src}" alt=""><span>${color[1].color}</span></a>
                                    </li>
                                    <li>
                                        <a href="javascript:"><img src="../${color[2].src}" alt=""><span>${color[2].color}</span></a>
                                    </li>
                                    <li>
                                        <a href="javascript:"><img src="../${color[3].src}" alt=""><span>${color[3].color}</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="des-set">
                            <span>选择套餐</span>
                            <div class="des-s">
                                <ul class="clearfix">
                                    <li>
                                        <a href=""><span>官方标配</span></a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="des-edition">
                            <span>库&nbsp;存&nbsp;量</span>
                            <em>${res.num}</em>
                        </div>

                    </div>
                </div>
                <div class="pro-buy clearfix">
                    <div class="buy-num left">
                        <input type="number" min="1" max="${res.num}" id="num" value="1">
                    </div>
                    <div class="pro-pay left">
                        <div class="pay-car left" id="additem">加入购物车</div>
                        <div class="pay-mon left" id="additem">立即下单</div>
                    </div>
                </div>
            </div>
            `;

            let tempDetails = `
            <img src="../${details[0].src}" alt="">
            <img src="../${details[1].src}" alt="">
            <img src="../${details[2].src}" alt="">
            <img src="../${details[3].src}" alt="">
            `;

            // 渲染页面
            $('.line>.container').append(line);
            $('.product>.container').append(template).find('#additem').on('click', function() {
                addItem(res.id, $('#num').val());
                alert('添加购物车成功！');
            });
            $('.detail-main').append(tempDetails);

            $('.colorred>li').on('click', function() {
                $(this).addClass('red').siblings().removeClass('red');
            })

            //放大镜
            $(function() {
                let movebox = $('.movebox'),
                    bigpic = $('.bigpic'),
                    small = $('.small'),
                    big = $('.big');

                // 鼠标悬浮
                small.on('mouseover', function() {

                    movebox.addClass('show');
                    big.addClass('show');

                    // movebox计算大小
                    movebox.css({
                        width: (small.width() * big.width() / bigpic.width()) + 'px',
                        height: (small.height() * big.height() / bigpic.height()) + 'px'
                    });


                    //movebox
                    small.on('mousemove', function(ev) {
                        let top = ev.pageY - small.offset().top - movebox.height() / 2;
                        let left = ev.pageX - small.offset().left - movebox.width() / 2;


                        //比例计算
                        let ratio = bigpic.width() / small.width(); // 比例需要大于1

                        // 管理边界
                        if (top <= 0) {
                            top = 0;
                        } else if (top >= small.height() - movebox.height()) {
                            top = small.height() - movebox.height() - 2;
                        }

                        if (left <= 0) {
                            left = 0;
                        } else if (left >= small.width() - movebox.width()) {
                            left = small.width() - movebox.width() - 2;
                        }

                        // 设置定位
                        movebox.css({
                            top: top + 'px',
                            left: left + 'px'
                        });

                        // 移动大图
                        bigpic.css({
                            top: ratio * -top + 'px',
                            left: ratio * -left + 'px'
                        });
                    });
                });


                // 鼠标离开事件
                small.on('mouseout', function() {
                    movebox.removeClass('show');
                    big.removeClass('show');
                });
            })
        }
    });

    function addItem(id, num) {
        console.log(id, num);
        let shop = cookie.get('shop'); // 从cookie中获得shop数据

        let product = {
            id: id,
            num: num
        }

        if (shop) { // 判断是否存有购物车数据
            shop = JSON.parse(shop); // 将取出的cookie数据转成对象

            // 判断cookie中的购物车数据 是否已存在本条数据的id
            // 如果本条数据的id已存在 修改数量
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(el => {
                    el.id === id ? el.num = num : null;
                });
            } else {
                shop.push(product);
            }

        } else { // cookie中不存在shop数据
            shop = []; // 设置一个数组
            shop.push(product); // 将当前商品存入数组
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }



})();