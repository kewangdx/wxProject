/**
 * banner 对象
 */
import { Http } from "../utils/http.js";

export class Banner {
    static locationB = 'b-1';
    static locationG = 'b-2';

    static async getHomeLocationB(){
        return await Http.request({
            url: `/v1/banner/name/${Banner.locationB}`
        });
    }

    static async getHomeLocationG() {
        return await Http.request({
            url: `/v1/banner/name/${Banner.locationG}`
        });
    }
}