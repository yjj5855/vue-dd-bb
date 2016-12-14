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
            if(this.route.path.substr(0,path.length) == path){
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