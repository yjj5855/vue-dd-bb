'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

import store from '../../vuex/store'

import Tabbar from 'vux/dist/components/tabbar'
import TabbarItem from 'vux/dist/components/tabbar-item'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    components : {
        Tabbar,
        TabbarItem
    },
    store: store,
    vuex: {
        getters: {
            route: (state) => state.app.route,
            isLoading: (state) => state.app.isLoading,
            direction: (state) => state.app.direction
        }
    },
    ready : function(){ //做浏览器判断 和 兼容

    },
    data : ()=>{
        return Value
    },
    methods: {
        selected(path){
            if(this.$route.path == path){
                return true
            }else{
                return false
            }
        }
    },
    computed : {
        getMyCityName(){
            if(!this.myCity || this.myCity.city_name == ''){
                return '上海'
            }
            return this.myCity.city_name;
        }
    },
    route : {
        data : function(transition){
            transition.next();
        }
    }
})

export default Index