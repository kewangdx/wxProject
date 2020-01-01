import { Http } from "../utils/http.js";

class SaleExplain{

    static async getFixed(){
        const explains = await Http.request({
            url: `v1/sale_explain/fixed`
        });
        return explains.map(e => {
            return e.text;
        });
    }
}

export {
    SaleExplain
}