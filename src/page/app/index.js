'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

import store from '../../vuex/store'

let Index = Vue.extend({

    template : Tpl,
    store: store,
    vuex: {
        getters: {
            route: (state) => state.route,
            isLoading: (state) => state.isLoading,
            direction: (state) => state.direction
        }
    },
    ready : function(){ //做浏览器判断 和 兼容

    },
    data : ()=>{
        return {
            routerTransition: {
                forward: 'slideRL',
                back: 'slideLR'
            }
        }
    },
    methods: {

    },
    computed : {

    },
    route : {
        data : function(transition){
            transition.next();
        }
    }
})

export default Index