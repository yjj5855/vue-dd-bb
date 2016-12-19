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

function callJsApi(method, param = {}) {
    return Q.Promise((success, error)=> {

        if (!window.ability || window.ability < jsapi[method]) {
            console.log('容器版本过低，不支持 ' + method)
            return error({errCode: 404, msg: '容器版本过低，不支持' + method})
        }

        param.onSuccess = function (result) {
            process.env.NODE_ENV !== 'production' && console.log(method, '调用成功，success', result)
            success(result)
        };
        param.onFail = function (result) {
            process.env.NODE_ENV !== 'production' && console.log(method, '调用失败，fail', result)
            error(result)
        };
        getMethod(method)(param);
    })
}


ddPlugin.install = function (Vue, option) {
    var dd = window.dd;

    if(dd){
        Vue.prototype.callJsApi = callJsApi;
        window.callJsApi = callJsApi;
    }else{
        let func = function () {
            console.log('dd没有定义');
        };
        Vue.prototype.callJsApi = func;
        window.callJsApi = func;
        console.error('dd没有定义');
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
