import {
    Cell
} from "../models/cell.js";
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