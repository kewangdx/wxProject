/**
 * Spu 商品控制
 */
import { Http } from "../utils/http.js";
class Spu{
    /**
     * 获取spu商品详情
     */
    static async getDetail(id) {
        return Http.request({
            url: `v1/spu/id/${id}/detail`
        });
    }
}

export {
    Spu
}
