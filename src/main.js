import Q from 'q'
import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import 'vux/dist/vux.css';
import * as vux from 'vux'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import FastClick from 'fastclick'
import {config} from '../env'
import bbPlugin from './lib/vue-bb-plugin'
import ddPlugin from './lib/vue-dd-plugin'
import App from './page/app/index'


let dd = window.dd;
const commit = store.commit || store.dispatch;

Vue.config.debug = true
Vue.config.devtools = true
Vue.component('alert',vux.Alert)
Vue.component('loading',vux.Loading)

let ddConfig = null;
Q.Promise.all([
    getConfig(),
    ddIsReady()
]).then(([data1,data2])=>{
    console.log(data1,data2);
    ddConfig = data1;
    if(data2){
        console.log('dd.ready');
    }
}).catch((err)=>{
    console.log(err);
    if(err && err.errCode == -1){
        //dd.ready 失败
    }else if(err && err.errCode == -2){
        //请求失败
    }
}).finally(()=>{
    initVue().then(()=>{
        console.log('init vue 完成')
        setTimeout(()=>{
            if(ddConfig != null){
                dd.config(config);
                commit('DDCONFIG_SUCCESS', config)
            }else{
                commit('DDCONFIG_ERROR', false);
            }
        },300)

    });
});

function ddIsReady() {
    return Q.Promise((success, error)=>{
        let timeout = setTimeout(()=>{
            error({errCode:-1,msg:'dd.ready初始化超时'});
        },2000)
        dd.ready(function(){
            console.log('初始化钉钉');
            clearTimeout(timeout)
            success(true)
        });
        dd.error(function(err){
            clearTimeout(timeout)
            /**
             {
                message:"错误信息",//message信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
                errorCode:"错误码"
             }
             **/
            console.error('dd error: ' + JSON.stringify(err));
            error({errCode:-1,msg:'dd.error配置信息不对'})
        });
    })
}

function getParamByName(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};


function initVue() {
    return Q.Promise((success, error)=>{

        Vue.use(Router)
        Vue.use(bbPlugin)
        Vue.use(ddPlugin)

        let router = new Router({
            transitionOnLoad: false
        })
        router.map({
            [config.BASE_PATH] : {
                component: function(resolve){
                    require.ensure([], function() {
                        let route = require('./page/home/route').default;
                        resolve(route);
                    },'home')
                },
                subRoutes: {
                    '/': {
                        component: function (resolve) {
                            require.ensure([], function () {
                                let route = require('./page/home/index/route').default;
                                resolve(route);
                            },'index')
                        }
                    },
                    '/member' : {
                        component: function(resolve){
                            require.ensure([], function() {
                                let route = require('./page/home/member/route').default;
                                resolve(route);
                            },'member')
                        }
                    },
                    // '/wenda' : {
                    //     component: function(resolve){
                    //         require.ensure([], function() {
                    //             let route = require('./states/index/wenda/route').default;
                    //             resolve(route);
                    //         },'wenda')
                    //     }
                    // },
                }
            },
            [config.BASE_PATH+'/user/sign_in'] : {
                component: function (resolve) {
                    require.ensure([], function () {
                        let route = require('./page/user-sign-in/route').default;
                        resolve(route);
                    }, 'user-sign-in')
                }
            }
        });
        router.redirect({
            '*': config.BASE_PATH
        });
        let history = window.sessionStorage
        history.clear()
        let historyCount = history.getItem('count') * 1 || 0
        history.setItem('/', 0)

        router.beforeEach(({ to, from, next }) => {
            const toIndex = history.getItem(to.path)
            const fromIndex = history.getItem(from.path)
            if (toIndex) {
                if (toIndex > fromIndex || !fromIndex) {
                    commit('UPDATE_DIRECTION', 'forward')
                } else {
                    commit('UPDATE_DIRECTION', 'reverse')
                }
            } else {
                ++historyCount
                history.setItem('count', historyCount)
                to.path !== '/' && history.setItem(to.path, historyCount)
                commit('UPDATE_DIRECTION', 'forward')
            }
            commit('UPDATE_LOADING', true)
            setTimeout(next, 50)
        })
        router.afterEach(() => {
            commit('UPDATE_LOADING', false)
        })
        sync(store, router)
        router.start(App, '#app')

        FastClick.attach(document.body)

        success()
    })
}

function getConfig() {
    return Q.Promise((success, error)=>{
        axios.get('http://116.236.230.131:55002/auth/getConfig', {
            params: {
                corpid: getParamByName('corpid')||'ding1b56d2f4ba72e91635c2f4657eb6378f',
                appid: getParamByName('appid')||'2545',
                suitekey: getParamByName('suiteKey')||'suiteiyfdj0dfixywzqwg',
                paramUrl: document.URL
            },
            timeout: 2000,
        }).then(function (response) {
            if(response.status == 200 && response.data.code == 200){
                let res = response.data.result;
                let ddConfig = {
                    agentId: res.agentId, // 必填，微应用ID
                    corpId: res.corpId,//必填，企业ID
                    timeStamp: res.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名
                    type:0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                    jsApiList : [
                        'runtime.info',
                        'runtime.permission.requestAuthCode',

                        'biz.alipay.pay',
                        'biz.contact.choose',
                        'biz.contact.complexChoose',
                        'biz.contact.complexPicker',
                        'biz.contact.createGroup',
                        'biz.customContact.choose',
                        'biz.customContact.multipleChoose',
                        'biz.ding.post',
                        'biz.map.locate',
                        'biz.map.view',
                        'biz.util.openLink',
                        'biz.util.open',
                        'biz.util.share',
                        // 'biz.util.ut',
                        'biz.util.uploadImage',
                        'biz.util.previewImage',
                        'biz.util.datepicker',
                        'biz.util.timepicker',
                        'biz.util.datetimepicker',
                        'biz.util.chosen',
                        'biz.util.encrypt',
                        'biz.util.decrypt',
                        'biz.chat.pickConversation',
                        'biz.telephone.call',
                        'biz.navigation.setTitle',
                        'biz.navigation.setIcon',
                        'biz.navigation.close',
                        'biz.navigation.setRight',
                        'biz.navigation.setMenu',
                        'biz.user.get',

                        'ui.progressBar.setColors',

                        'device.base.getInterface',
                        'device.connection.getNetworkType',
                        'device.launcher.checkInstalledApps',
                        'device.launcher.launchApp',
                        'device.notification.confirm',
                        'device.notification.alert',
                        'device.notification.prompt',
                        'device.notification.showPreloader',
                        'device.notification.hidePreloader',
                        'device.notification.toast',
                        'device.notification.actionSheet',
                        'device.notification.modal',
                        'device.geolocation.get',


                    ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                }
                success(ddConfig)
            }else{
                error({errCode:-2,msg:'接口请求失败'})
            }
        }).catch(function (err) {
            error({errCode:-2,msg:'接口请求失败'})
        });
    })

}