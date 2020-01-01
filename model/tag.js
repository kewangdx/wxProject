
import { Http } from "../utils/http.js";
class Tag{

    static getSearchTags(){
        return Http.request({
            url: "v1/tag/type/1"
        });
    }
}

export {
    Tag
}