
import { Http } from "../utils/http.js";

export class Paging{

    url;
    start;
    count;
    req;
    locker = false;
    moreData = true;
    accumulator= [];

    constructor(req, start = 0, count = 10){
        this.start = start;
        this.count = count;
        this.req = req;
        this.url = this.req.url;
    }

    async getMoreData(){
        // 判断是否还有更多数据
        if(!this.moreData){
            return;
        }
        // 获取锁，判断锁状态，避免重复发送请求
        // getLocker
        // releaseLocker
        if(!this._getLocker()){
            return;
        }

        // 发送请求
        const data = await this.actualGetData();
        // 恢复锁状态
        this._releaseLocker();
        // 返回数据
        return data;
    }

    async actualGetData(){
        const req = this._getCurrentReq();
        let paging = await Http.request(req);
        if(!paging){
            return null;
        }
        if(paging.total === 0){
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = this._moreData(paging.total_page, paging.page);
        if(this.moreData){
            this.start += this.count;
        }
        this._accumulator(paging.items);
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    // 合并数据
    _accumulator(items){
        this.accumulator = this.accumulator.concat(items);
    }

    _moreData(totalPage, pageNum){
        return pageNum < totalPage - 1;
    }

    _getCurrentReq(){
        let url = this.url;
        const params = `start=${this.start}&count=${this.count}`;
        if(url.includes('?')){
            url += '&' + params;
        }else{
            url += '?' + params;
        }
        this.req.url = url;
        return this.req;
    }

    _getLocker(){
        if(this.locker){
            return false;
        }
        this.locker = true;
        return true;
    }

    _releaseLocker(){
        this.locker = false;
    }

}