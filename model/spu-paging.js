

import { Http } from "../utils/http.js";
import { Paging } from "../utils/paging.js";

class SpuPaging{
    static getLatestPaging() {
        return new Paging({
            url: `v1/spu/latest`
        }, 0, 5);
    }
}

export {
    SpuPaging
}