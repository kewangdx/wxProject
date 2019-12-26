
import { Matrix } from "../models/matrix.js";
import { Fence } from "../models/fence.js";
class FenceGroup{
    spu;
    skuList = [];
    fences = [];

    constructor(spu){
        this.sup = spu;
        this.skuList = spu.sku_list;

    }

    initFences() {
        const matrix = this._createMatrix(this.skuList);
        const fences = [];
        const AT = matrix.transpose();
        AT.forEach(r => {
            const fence = new Fence(r);
            fence.init();
            fences.push(fence);
        });
        this.fences = fences;
    }

    _createMatrix(skuList){
        const m = [];
        skuList.forEach(sku => {
            m.push(sku.specs);
        });
        return new Matrix(m);
    }
}

export {
    FenceGroup
}