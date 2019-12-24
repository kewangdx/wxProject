// 业务对象
// theme \ banner \ spu \ sku \ address \ user \
/**
 * theme 对象
 * 
 * 位置 首页 - 01
 */

import {Http} from "../utils/http.js";
export class Theme{
    static locationA = 't-1';
    static locationE = 't-2';
    static locationF = 't-3';
    static locationH = 't-4';

    themes = [];

    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`;
        this.themes = await Http.request({
            url: "v1/theme/by/names",
            data: {
                names
            }
        });
    }

    getHomeLocationA(){
        return this.themes.find(t => t.name === Theme.locationA);
    }

    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE);
    }

    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF);
    }

    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH);
    }

    getHomeLocationESpu(name) {
        return this.getThemeSpuByName(Theme.locationE);
    }
    
    getThemeSpuByName(name){
        return Http.request({
            url: `/v1/theme/name/${name}/with_spu`
        });
    }
}