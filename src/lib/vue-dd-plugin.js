'use strict'
import Q from 'q'

const ddPlugin = {};
ddPlugin.install = function (Vue, option) {
    var dd = window.dd;

    if(dd){
        Vue.prototype.getRequestAuthCode = function (data) {
            return Q.Promise(function (success, error) {
                dd.runtime.permission.requestAuthCode({
                    corpId : data.corpId,
                    onSuccess : function(result) {
                        success(result)
                    },
                    onFail : function(err) {
                        error(err)
                    }
                });
            })
        }
        Vue.prototype.setTitle = function (data) {
            return Q.Promise(function (success, error) {
                dd.biz.navigation.setTitle({
                    title : data.title,//控制标题文本，空字符串表示显示默认文本
                    onSuccess : function(result) {
                        success(result)
                    },
                    onFail : function(err) {
                        error(err)
                    }
                });
            })
        }
        Vue.prototype.setRightText = function (data) {
            return Q.Promise(function (success, error) {
                dd.biz.navigation.setRight({
                    show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                    control: data.control?data.control:false,//是否控制点击事件，true 控制，false 不控制， 默认false
                    text: data.text||'发送',//控制显示文本，空字符串表示显示默认文本
                    onSuccess : function(result) {
                        //如果control为true，则onSuccess将在发生按钮点击事件被回调
                        /*
                         {}
                         */
                        success(result)
                    },
                    onFail : function(err) { error(err) }
                });
            })
        }


    }else{
        console.error('dd没有定义')
    }
};

(function (Plugin) {
    if(typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = Plugin;
    }else{
        if(window.bb){
            window.bb['ddPlugin'] = Plugin;
        }else{
            window.bb = {
                ddPlugin:Plugin
            }
        }
    }
})(ddPlugin);
