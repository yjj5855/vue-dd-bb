'use strict'
import {config} from '../../env'

const bbPlugin = {};
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

    Vue.prototype.base_path = config.BASE_PATH;

    // 返回上一页
    Vue.prototype.goBack = function(_this){
        //打赏页面是重新开页面的 所以直接返回
        if(_this.$router._currentRoute.path.match('/pay/')){
            window.history.back();
            return;
        }
        var path;
        try{
            path = _this.$router._currentTransition.from.path;
            if(path){
                if(path.match('member') && !$.localStorage.getItem('webapp_userInfo')){
                    _this.$router.replace(config.BASE_PATH)
                }else{
                    window.history.back();
                }
            }else{
                _this.$router.replace(config.BASE_PATH)
            }
        }catch (e){
            console.log(e)
            _this.$router.replace(config.BASE_PATH)
        }
    };

    // 前往路由页面
    Vue.prototype.goRoute = function(route,_this,is_replace){
        if(!$.localStorage.getItem('webapp_userInfo') &&
            (route.match('member') || route.match('chat') || route.match('pay') || route.match('/tucao/publish') )
        ) {
            _this.goLoginPage(_this,route)
        }else{
            if(is_replace){
                _this.$router.replace(config.BASE_PATH+route);
            }else{
                _this.$router.go(config.BASE_PATH+route);
            }
        }
    };


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

    //保存和删除用户信息
    Vue.prototype.saveUserInfo = function(data){
        if(data){
            $.localStorage.setItem('webapp_userInfo',data);
            Vue.prototype.$myInfo = $.localStorage.getItem('webapp_userInfo');
        }else{
            $.localStorage.removeItem('webapp_userInfo');
        }
        if(data && data.car && data.car.type_id > 0){
            var myCar = {
                brand_id : data.car.brand_id,
                brand_name : data.car.brand_name,
                series_id : data.car.series_id,
                series_name : data.car.series_name,
                type_id :  data.car.type_id,
                type_name : data.car.type_name,
            }
            $.localStorage.setItem('myCar',myCar);
        }else{
            $.localStorage.removeItem('myCar');
        }
    }

    // if($.localStorage.getItem('webapp_userInfo')){
    //     Vue.prototype.$myInfo = $.localStorage.getItem('webapp_userInfo');
    // }

    //全局ajax设置
    // $.ajaxSettings.timeout = 20e3;
    // $.ajaxSettings.beforeSend = function(xhr,settings){
    //     if(!(settings.url.match(/\?/))){
    //         settings.url += '?'
    //     }else{
    //         settings.url += '&'
    //     }
    //     settings.url += $.param({
    //         access_token : $.localStorage.getItem('access_token')
    //     });
    //     settings.url += ('&'+$.param({
    //         version : config.version,
    //         channel : config.channel,
    //         device  : config.device
    //     }));
    //     //post请求转为json格式
    //     if(settings.type == 'POST'){
    //         if(settings.cmData){
    //             settings.data = JSON.stringify(settings.cmData);
    //             xhr.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01')
    //             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //         }
    //     }
    // }
    // $.ajaxSettings.complete = function(xhr, status){
    //     //console.log('status=',status)
    //     if(status == 'abort'){
    //         $.toast('请求失败');
    //     }else if(status == 'timeout'){
    //         $.toast('请求超时');
    //     }else if(status == 'error'){
    //         try {
    //             var error = JSON.parse(xhr.responseText);
    //             $.toast(error.message);
    //         }catch(e){
    //             $.toast('服务器错误');
    //         }
    //     }
    // };

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