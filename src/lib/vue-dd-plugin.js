'use strict'
import Q from 'q'
import jsapi from './ddApiConfig'
const ddPlugin = {};

var getMethod = function(method, ns) {
    var arr = method.split('.');
    var namespace = ns || dd;
    for (var i = 0, k = arr.length; i < k; i++) {
        if (i === k - 1) {
            return namespace[arr[i]];
        }
        if (typeof namespace[arr[i]] == 'undefined') {
            namespace[arr[i]] = {};
        }
        namespace = namespace[arr[i]];
    }
};

ddPlugin.install = function (Vue, option) {
    var dd = window.dd;

    if(dd){

        Vue.prototype.callJsApi = function (method, param = {}) {
            return Q.Promise((success, error)=>{
                if(!window.ability || window.ability < jsapi[method]){
                    console.warn('容器版本过低，不支持 '+ method)
                    return error({errCode: 404, msg: '容器版本过低，不支持'+method})
                }

                param.onSuccess = function(result) {
                    console.log(method, '调用成功，success', result)
                    success(result)
                };
                param.onFail = function(result) {
                    console.log(method, '调用失败，fail', result)
                    error(result)
                };
                getMethod(method)(param);
            })

        }

        Vue.prototype.setTitle = function (data) {
            return Q.Promise(function (success, error) {
                if(!window.ability || window.ability < jsapi['biz.navigation.setTitle']){
                    console.warn('容器版本过低，不支持 biz.navigation.setTitle')
                    return error({errCode: 404, msg: '容器版本过低，不支持该api'})
                }
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
        Vue.prototype.setRightText = function (data = { show: false }) {
            return Q.Promise(function (success, error) {
                if(!window.ability || window.ability < jsapi['biz.navigation.setRight']){
                    console.warn('容器版本过低，不支持 biz.navigation.setRight')
                    return error({errCode: 404, msg: '容器版本过低，不支持该api'})
                }
                dd.biz.navigation.setRight({
                    show: data.show,//控制按钮显示， true 显示， false 隐藏， 默认true
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
        Vue.prototype.getRequestOperateAuthCode = function (corpId, agentId) {
            return Q.Promise(function (success, error) {
                if(!window.ability || window.ability < jsapi['runtime.permission.requestOperateAuthCode']){
                    console.warn('容器版本过低，不支持 runtime.permission.requestOperateAuthCode')
                    return error({errCode: 404, msg: '容器版本过低，不支持该api'})
                }
                dd.runtime.permission.requestOperateAuthCode({
                    corpId: corpId,
                    agentId: agentId,
                    onSuccess: function(result) {
                        /*{
                                 code: 'hYLK98jkf0m' //string authCode
                             }*/
                        success(result)
                    },
                    onFail : function(err) { error(err) }

                })
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
