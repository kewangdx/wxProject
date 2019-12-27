import {
    SkuCode
} from "../models/sku-code.js";
import {
    CellStatus
} from "../../core/enum.js";
class Judger {

    fenceGroup;
    pathDict = [];

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this.initPathDict();
    }

    initPathDict() {
        console.log(this.fenceGroup);
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    judge(cell, x, y) {
        this._changeCellStatus(cell, x, y);
    }

    _changeCellStatus(cell, x, y) {
        if (cell.status === CellStatus.SELECTED) {
            // cell.status = CellStatus.WATTING;
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WATTING;
        } else if (cell.status === CellStatus.WATTING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED;
            // cell.status = CellStatus.SELECTED;
        }
    }
}

export {
    Judger
}