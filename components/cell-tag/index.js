// components/cell-tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event){
            // 父组件向子组件传参 properties
            // 子组件向父组件传参 需要用到事件
            this.triggerEvent('cellTap', {
                cell: this.properties.cell
            },{
                bubbles: true,
                composed: true
            });
        }
    }
})
