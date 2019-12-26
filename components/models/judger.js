
import { SkuCode } from "../models/sku-code.js";

class Judger{

    fenceGroup;
    pathDict = [];

    constructor(fenceGroup){
        this.fenceGroup = fenceGroup;
        this.initPathDict();
    }

    initPathDict(){
        console.log(this.fenceGroup);
        this.fenceGroup.sup.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
        console.log(this.pathDict);
    }
}

export {
    Judger
}