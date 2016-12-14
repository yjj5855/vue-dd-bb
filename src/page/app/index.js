'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

import store from '../../vuex/store'
import {getRequestAuthCode} from '../../vuex/actions'

let Index = Vue.extend({
    template : Tpl,
    store: store,
    vuex: {
        getters: {
            route: (state) => state.route,
            isLoading: (state) => state.app.isLoading,
            direction: (state) => state.app.direction,
            ddConfig: (state) => state.app.ddConfig,
            ddConfigStatus: (state) => state.app.ddConfigStatus,
            code: (state) => state.app.code,
            userInfo: (state) => state.app.user,
        },
        actions: {
            getRequestAuthCode
        }
    },
    watch: {
        ddConfigStatus: function (val, oldVal) {
            if(val === true){
                this.getRequestAuthCode(this.ddConfig.corpId);
            }
        },
        userInfo: function (val, oldVal) {
            if(val && val.mobile == ''){
                this.$router.go(this.base_path+'/user/bind')
            }
        }
    },
    ready : function(){
        console.log('APP ready 应该只执行一次');
    },
    data : ()=>{
        return Value
    },
    methods: {

    },
    computed : {
        showConfigErrorDialog(){
            return this.ddConfigStatus === false;
        },
        showCodeErrorDialog(){
            return this.code === false;
        }
    }
})

export default Index