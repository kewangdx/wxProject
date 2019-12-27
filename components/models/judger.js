
import { SkuCode } from "../models/sku-code.js";
import { CellStatus } from "../../core/enum.js";
class Judger{

    fenceGroup;
    pathDict = [];

    constructor(fenceGroup){
        this.fenceGroup = fenceGroup;
        this.initPathDict();
    }

    initPathDict(){
        console.log(this.fenceGroup);
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
        console.log(this.pathDict);
    }

    judge(cell){
        this._changeCellStatus(cell); 
    }

    _changeCellStatus(cell){
        console.log(cell);
        if (cell.status === CellStatus.SELECTED){
            cell.status = CellStatus.WATTING;
        }else if (cell.status === CellStatus.WATTING){
            cell.status = CellStatus.SELECTED;
        }
    }
}

export {
    Judger
}