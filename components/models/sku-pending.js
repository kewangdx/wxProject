import {
    Cell
} from "../models/cell.js";
import {
    Joiner
} from "../../utils/joiner.js";
class SkuPending{

    pending = [];
    size;

    constructor(size){
        this.size = size
        
    }

    init(sku){
        this.size = sku.specs.length;
        for(let i = 0; i< sku.specs.length; i++){
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }
        
    }

    isIntact(){
        if(this.size !== this.pending.length){
            return false;
        }
        for(let i = 0; i < this.size; i++){
            if(this._isEmptyPart(i)){
                return false;
            }
        }
        return true;
    }

    getSkuCode(){
        const joiner = new Joiner('#');
        this.pending.forEach(cell =>{
            const cellCode = cell.getCellCode();
            joiner.join(cellCode);
        });
        return joiner.getStr();
    }

    /**
     * 获取当前已选择规格值
     */
    getCurrentSpecValues(){
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null;
        });
        return values;
    }

    /**
     * 获取为选择规格值
     */
    getMissingSpecKeysIndex(){
        const keysIndex = [];
        for(let i = 0; i < this.size; i++){
            if(!this.pending[i]){
                keysIndex.push(i);
            }
        }
        return keysIndex;
    }

    _isEmptyPart(index){
        return this.pending[index] ? false : true;
    }

    insertCell(cell, x){
        this.pending[x] = cell;
    }

    removeCell(x){
        this.pending[x] = null;
    }

    findSelectedCellByX(x){
        return this.pending[x];
    }
}

export {
    SkuPending
}