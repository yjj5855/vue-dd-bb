'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

import store from '../../vuex/store'

import Tabbar from 'vux/dist/components/tabbar'
import TabbarItem from 'vux/dist/components/tabbar-item'

let Index = Vue.extend({
    template : Tpl,
    components : {
        Tabbar,
        TabbarItem
    },
    store: store,
    vuex: {
        getters: {
            route: (state) => state.route,
            isLoading: (state) => state.app.isLoading,
            direction: (state) => state.app.direction
        }
    },
    data : ()=>{
        return Value
    },
    methods: {
        selected(path){
            let realPath = ''
            let index = this.route.path.indexOf('?');
            if(index > 0){
                realPath = this.route.path.substr(0,index)
            }else{
                realPath = this.route.path
            }
            if(realPath == path){
                return true
            }else{
                return false
            }
        }
    },
    computed : {
    }
})

export default Index