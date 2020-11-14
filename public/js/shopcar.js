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



                res.forEach((elm, i) => {
                    // 现在遍历数据时是按照数据库查询得到的结果遍历
                    // cookie中存放的数据 的顺序  和 查询结果的顺序不同
                    // 需要让cookie中的id和查询结果的id 一一对应
                    // 索引不同
                    let arr = shop.filter(val => val.id === elm.id);
                    console.log(arr);

                    let picture = JSON.parse(elm.picture);
                    let color = JSON.parse(elm.pcolor);

                    template += `
                    <div class="pro-box clearfix">
                    <label for="">
                        <input type="checkbox">
                    </label>
                    <div class="car-pro">
                        <a href="" class="pro-img">
                            <img src="../${picture[0].src}" alt="">
                        </a>
                        <ul class="clearfix">
                            <li>
                                <a href="">${elm.title}</a>
                                <p>${color[0].color} 8GB+256GB 官方标配</p>
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
                                <a href="">删除</a>
                            </li>
                        </ul>
                    </div>
                </div>
                    `;

                    total = `
                    <span>￥&nbsp;&nbsp; ${(elm.price*arr[0].num).toFixed(2)}</span>
                `;
                });


                $('form').append(template);
                $('.pay-price>p').append(total);

            }
        });
    }

})();