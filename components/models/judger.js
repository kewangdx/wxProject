import {
    SkuCode
} from "../models/sku-code.js";
import {
    CellStatus
} from "../../core/enum.js";
import {
    SkuPending
} from "../models/sku-pending.js";
import {
    Joiner
} from "../../utils/joiner.js";
class Judger {

    fenceGroup;
    pathDict = [];
    skuPending;

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this.initPathDict();
        this._initSkuPending();
        
    }
    isSkuIntact(){
        return this.skuPending.isIntact();
    }
    initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    judge(cell, x, y, isInit) {
        if(!isInit){
            this._changeCurrentCellStatus(cell, x, y);
        }
        this.fenceGroup.eachCell((cell,x,y) => {
            const path = this._findPotentialPath(cell, x, y);
            if (!path){
                return 
            }
            const isIn = this._isInDict(path);
            if(isIn){
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WATTING);
            }else{
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN);
            }
        });
    }

    getDeterminateSku(){
        const code = this.skuPending.getSkuCode();
        const sku = this.fenceGroup.getSku(code);
        return sku;
    }

    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues();
    }

    getMissingKeys(){
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex();
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title;
        })
    }

    _isInDict(path){
        return this.pathDict.includes(path);
    }

    _findPotentialPath(cell, x, y){
        const joiner = new Joiner('#');
        for(let i = 0; i < this.fenceGroup.fences.length; i++){
            const selected = this.skuPending.findSelectedCellByX(i);
            if (x === i) {
                if (selected && cell.id === selected.id) {
                    return;
                }
                const cellCode = this._getCellCode(cell);
                joiner.join(cellCode);
            } else {
                if(selected){
                    const selectedCellCode = this._getCellCode(selected);
                    joiner.join(selectedCellCode);
                }
            }
        }
        return joiner.getStr();
    }

    _getCellCode(cell) {
        return cell.spec.key_id + '-' + cell.spec.value_id;
    }

    _initSkuPending(){
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength);
        const defaultSku = this.fenceGroup.getDefaultSku();
        if(!defaultSku){
            return;
        }
        this.skuPending.init(defaultSku);
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED);
        })
        this.judge(null, null, null, true);
    }
    
    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WATTING);
            this.skuPending.removeCell(x);
        } else if (cell.status === CellStatus.WATTING) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
            this.skuPending.insertCell(cell, x); 
        }
    }
}

export {
    Judger
}