// pages/search/search.js
import { HistoryKeyword } from "../../model/history-keyword.js"
import { Tag } from "../../model/tag.js"
import { Search } from "../../model/search.js"
import { showToast } from "../../utils/ui.js"
const history = new HistoryKeyword();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const historyTags = history.get();
        const hotTags = await Tag.getSearchTags();

        this.setData({
            historyTags,
            hotTags
        });
    },

    async onSearch(event){
        this.setData({
            search: true,
            items:[]
        })
        const keyword = event.detail.value || event.detail.name;
        if(!keyword){
            showToast('请输入关键字');
            return;
        }
        history.save(keyword);
        this.setData({
            historyTags: history.get()
        });

        const paging = Search.search(keyword);
        console.log(paging);
        wx.lin.showLoading({
            color: '#157658',
            type:"flash",
            fullScreen: true
        });
        const data = await paging.getMoreData();
        wx.lin.hideLoading();
        this.bindItems(data);
    },

    bindItems(data){
        if (data.accumulator.length !== 0){
            this.setData({
                items: data.accumulator
            })
        }
    },

    onDeleteHistory(event){
        history.clear();
        this.setData({
            historyTags: []
        });
    },
    
    onCancel(event){
        this.setData({
            search: false
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})