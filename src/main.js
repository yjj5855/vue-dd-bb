import Q from 'q'
import axios from 'axios'
import axiosConfig from './lib/axiosConfig'
import Vue from 'vue'
import Router from 'vue-router'
import 'vux/dist/vux.css'
import * as vux from 'vux'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import FastClick from 'fastclick'
import env from '../env'
import bbPlugin from './lib/vue-bb-plugin'
import ddPlugin from './lib/vue-dd-plugin'
import Raven from 'raven-js'
import { sentry_url, logException } from './lib/ravenConfig'
import App from './page/app/index'

//全局配置axios
for(let key in axiosConfig){
    axios.defaults[key] = axiosConfig[key];
}

//配置运行时错误收集
Raven.config(sentry_url, {
    tag: {
        git_commit: 'v0.0.1',
    }
}).install();

let dd = window.dd;
const commit = store.commit || store.dispatch;

console.log(process.env.NODE_ENV)
Vue.config.debug = process.env.NODE_ENV !== 'production';
Vue.config.devtools = process.env.NODE_ENV !== 'production';

Vue.component('alert',vux.Alert)
Vue.component('loading',vux.Loading)
Vue.component('group',vux.Group)
Vue.component('cell',vux.Cell)
Vue.component('x-input',vux.XInput)
Vue.component('x-button',vux.XButton)
Vue.component('flexbox',vux.Flexbox)
Vue.component('flexbox-item',vux.FlexboxItem)

let ddConfig = null;

getConfig()
    .then((data)=>{
        ddConfig = data;
        dd.config(ddConfig);
    })
    // .then(ddIsReady)
    // .then(initVue)
    // .then(()=>{
    //     document.querySelector('#init-loading').remove();
    //     console.log('init vue 完成')
    //     setTimeout(()=>{
    //         if(ddConfig != null){
    //             commit('DDCONFIG_SUCCESS', ddConfig)
    //         }else{
    //             commit('DDCONFIG_ERROR', false);
    //         }
    //     },300)
    // })
    .catch((err)=>{
        alert(JSON.stringify(err));
    })
    .finally(()=>{
        //开发环境
        initVue()
            .then(()=>{
                document.querySelector('#init-loading').remove();
                console.log('init vue 完成')
                setTimeout(()=>{
                    if(ddConfig != null){
                        commit('DDCONFIG_SUCCESS', ddConfig)
                    }else{
                        commit('DDCONFIG_ERROR', false);
                    }
                },300)
            })
    })

let params = {
    corpid: getParamByName('corpid')||'ding1b56d2f4ba72e91635c2f4657eb6378f',
    appid: getParamByName('appid')||'2545',
    suitekey: getParamByName('suiteKey')||'suiteiyfdj0dfixywzqwg',
    paramUrl: document.URL
}

function getConfig() {
    return Q.Promise((success, error)=>{
        axios.get('/auth/getConfig', {
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
                        'runtime.permission.requestOperateAuthCode', //反馈式操作临时授权码

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
                        'biz.util.ut',
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
                        'biz.navigation.setLeft',
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
                logException(new Error('config接口请求失败'), this)
            }
        }).catch(function (err) {
            error({errCode:-2,msg:'接口请求失败'})
            logException(new Error('config接口请求失败'), err)
        });
    })

}

function ddIsReady() {
    return Q.Promise((success, error)=>{
        let timeout = setTimeout(()=>{
            error({errCode:-1,msg:'dd.ready初始化超时'});
            logException(new Error('dd.ready初始化超时'), params)
        },2000)
        dd.ready(function(){
            console.log('初始化钉钉');
            clearTimeout(timeout)

            //设置返回按钮
            dd.biz.navigation.setLeft({
                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                showIcon: true,//是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
                text: '返回',//控制显示文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    //如果control为true，则onSuccess将在发生按钮点击事件被回调
                    console.log('点击了返回按钮');
                    window.history.back();
                },
                onFail : function(err) {}
            });
            //获取容器信息
            dd.runtime.info({
                onSuccess: function(result) {
                    window.ability = parseInt(result.ability.replace(/\./g,''));
                    console.log('容器版本为'+window.ability)
                },
                onFail : function(err) {}
            })

            success(true)
        });
        dd.error(function(err){
            clearTimeout(timeout)
            error({errCode:-1,msg:'dd.error配置信息不对'})
            logException(new Error('dd.error配置信息不对'),err)
        });
    })
}

function initVue() {
    return Q.Promise((success, error)=>{

        Vue.use(Router)
        Vue.use(bbPlugin)
        Vue.use(ddPlugin)

        let router = new Router({
            transitionOnLoad: false
        })
        router.map({
            [env.BASE_PATH] : {
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
                    // '/banbu' : {
                    //     component: function(resolve){
                    //         require.ensure([], function() {
                    //             let route = require('./states/index/wenda/route').default;
                    //             resolve(route);
                    //         },'wenda')
                    //     }
                    // },
                }
            },
            [env.BASE_PATH+'/user/sign_in'] : {
                component: function (resolve) {
                    require.ensure([], function () {
                        let route = require('./page/user-sign-in/route').default;
                        resolve(route);
                    }, 'user-sign-in')
                }
            },
            [env.BASE_PATH+'/user/bind'] : {
                component: function (resolve) {
                    require.ensure([], function () {
                        let route = require('./page/user-bind-mobile/route').default;
                        resolve(route);
                    }, 'user-bind-mobile')
                }
            }
        });
        router.redirect({
            '*': env.BASE_PATH
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


            setTimeout(()=>{
                try {
                    //设置右侧按钮
                    dd.biz.navigation.setRight({
                        show: false,//控制按钮显示， true 显示， false 隐藏， 默认true
                    });
                }catch (err){
                    console.error(err);
                }

                next();
            }, 10)
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

