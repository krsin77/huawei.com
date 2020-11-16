import './library/jquery.js';
import cookie from './library/cookie.js';
import { baseUrl } from './library/config.js';

(function() {

    let shop = cookie.get('shop');

    console.log(shop);
    if (shop) { // 有cookie数据才发请求
        shop = JSON.parse(shop);

        let idList = shop.map(elm => elm.id).join();

        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                let template = '';
                // console.log(res);
                let total = '';

                let carTop = '';



                res.forEach((elm, i) => {
                    // 现在遍历数据时是按照数据库查询得到的结果遍历
                    // cookie中存放的数据 的顺序  和 查询结果的顺序不同
                    // 需要让cookie中的id和查询结果的id 一一对应
                    // 索引不同
                    let arr = shop.filter(val => val.id === elm.id);
                    console.log(arr);

                    let picture = JSON.parse(elm.picture);
                    let color = JSON.parse(elm.pcolor);

                    carTop = `<label for="">
                                <input type="checkbox" class="check">
                                全选
                            </label>
                            <ul class="clearfix">
                                <li>商品</li>
                                <li>单价</li>
                                <li>数量</li>
                                <li>小计</li>
                                <li>操作</li>
                            </ul>
                        `;

                    template += `
                            <div class="pro-box clearfix">
                                <label for="">
                                    <input type="checkbox" class="check" checked>
                                </label>
                                <div class="car-pro">
                                    <a href="" class="pro-img">
                                        <img src="../${picture[0].src}" alt="">
                                    </a>
                                    <ul class="clearfix">
                                        <li>
                                            <a href="">${elm.title}</a>
                                            <p>${color[0].color} 官方标配</p>
                                        </li>
                                        <li>
                                            ￥${(elm.price).toFixed(2)}
                                        </li>
                                        <li class="num-btn">
                                        <input type="number" value="${arr[0].num}" min="1" max="${elm.num}">
                                        </li>
                                        <li class="price-total">
                                            ￥${(elm.price*arr[0].num).toFixed(2)}
                                        </li>
                                        <li>
                                            <div id="remove">删除</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            `;

                    total = `
                        <span>￥&nbsp;&nbsp; ${(elm.price*arr[0].num).toFixed(2)}</span>
                        `;

                });

                //渲染
                $('form').append(template);
                $('.pay-price>p').append(total);
                $('.car-top').append(carTop);

                $('#remove').on('click', function() {
                    cookie.remove('shop');
                    location.reload();
                })

                $('.check:first').on('click', function() {
                    if (this.checked == true) {
                        $('.check').attr("checked", "checked");
                    } else {
                        $('.check').removeAttr("checked");
                    }
                });
                $('.check:last').on('click', function() {
                    if (this.checked == true) {
                        $('.check').attr("checked", "checked");
                    } else {
                        $('.check').removeAttr("checked");
                    }
                });

            }
        });
    }




})();