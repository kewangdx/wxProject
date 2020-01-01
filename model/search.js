import { Http } from "../utils/http";
import { Paging } from "../utils/paging.js"

class Search{

    static search(q){
        return new Paging({
            url: `v1/search?q=${q}`
        })
    }

}

export {
    Search
}