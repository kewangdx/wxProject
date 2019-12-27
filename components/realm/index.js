// components/realm/index.js

import { FenceGroup } from "../models/fence-group.js";
import { Judger } from "../models/judger.js";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object
    },

    observers: {
        'spu':function(spu){
            if(!spu){
                return;
            }
            const fenceGroup = new FenceGroup(spu);
            fenceGroup.initFences();
            const judger = new Judger(fenceGroup);
            this.data.judger = judger;
            this.bindInitData(fenceGroup);
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(fenceGroup){
            this.setData({
                fences: fenceGroup.fences
            })
        },

        onCellTap(event){
            
            const cell = event.detail.cell;
            const judger = this.data.judger;
            judger.judge(cell);
            judger.fenceGroup.initFences();
            this.bindInitData(judger.fenceGroup);
        }

    }
})
