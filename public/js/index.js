import './library/jquery.js';
import './library/jquery.lazyload.min.js';
import { baseUrl } from './library/config.js';


(function() {
    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getProducts`,
        dataType: "json",
        success: function(res) {
            // 获得数据后进行字符串拼接
            let tempLi = '';
            res.forEach((elm, i) => {

                let picture = JSON.parse(elm.picture);
                console.log(picture);

                tempLi += `<li>
                        <a href="./html/product.html?id=${elm.id}">
                            <div class="pic">
                                <img src="${picture[0].src}" alt="">
                            </div>
                            <div class="txt">
                                <p>${elm.name}</p>
                                <em>${elm.speak}</em>
                                <b>￥${elm.price}</b>
                            </div>
                        </a>
                    </li>`;
            });

            $('.hot-list').append(tempLi);
        }
    });
})();