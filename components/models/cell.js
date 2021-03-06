
import { CellStatus } from "../../core/enum.js";
class Cell{

    title;
    id;
    status = CellStatus.WATTING;
    spec;
    skuImg;

    constructor(spec){
        this.title = spec.value;
        this.id = spec.value_id;
        this.spec = spec;
    }

    getCellCode(){
        return this.spec.key_id + '-' + this.spec.value_id;
    }
}

export {
    Cell
}