import { Http } from "../utils/http.js";

class Categories{
    
    roots = [];
    subs = [];

    async getALL(){
        const data = await Http.request({
            url: "/v1/category/all"
        });

        this.roots = data.roots;
        this.subs = data.subs;
    }

    getRoots(){
        return this.roots;
    }

    getSubs(parentId){
        return this.subs.filter(sub => sub.parent_id == parentId);
    }

    getRoot(rootId){
        return this.roots.find(r => r.id == rootId);
    }
    

}

export {
    Categories
}