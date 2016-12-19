'use strict'
import env from '../../env'

const bbPlugin = {};

window.getParamByName = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};

bbPlugin.install = function (Vue, option) {
    
    // 设置cookie
    Vue.cookie = function (key, value, options) {
        var days, time, result, decode;

        if (arguments.length > 1 && String(value) !== "[object Object]") {
            // Enforce object
            options = $.extend({}, options)

            if (value === null || value === undefined) options.expires = -1

            if (typeof options.expires === 'number') {
                days = (options.expires * 24 * 60 * 60 * 1000)
                time = options.expires = new Date()

                time.setTime(time.getTime() + days)
            }

            value = String(value)

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : (value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                '; path=/',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''))
        }

        // Key and possibly options given, get cookie
        options = value || {}

        decode = options.raw ? function (s) { return s } : decodeURIComponent

        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
    };

    Vue.prototype.base_path = env.BASE_PATH;

    // 简单封装本地存储
    Vue.prototype.localStorage = {
        getItem : function(key){
            if (typeof localStorage === 'object') {
                try {
                    return JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    alert('请关闭[无痕浏览]模式后再试!');
                }
            }
        },
        setItem : function(key,value){
            if (typeof localStorage === 'object') {
                try {
                    return localStorage.setItem(key,JSON.stringify(value));
                } catch (e) {
                    alert('请关闭[无痕浏览]模式后再试!');
                }
            }
        },
        removeItem : function(key){
            if (typeof localStorage === 'object') {
                try {
                    return localStorage.removeItem(key);
                } catch (e) {
                    alert('请关闭[无痕浏览]模式后再试!');
                }
            }
        },
        getUseSize : function(){
            if (typeof localStorage === 'object') {
                try {
                    return JSON.stringify(localStorage).length;
                } catch (e) {
                    alert('请关闭[无痕浏览]模式后再试!');
                }
            }
        }
    };

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    

};

(function (Plugin) {
    if(typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = Plugin;
    }else{
        if(window.bb){
            window.bb['bbPlugin'] = Plugin;
        }else{
            window.bb = {
                bbPlugin:Plugin
            }
        }
    }
})(bbPlugin);