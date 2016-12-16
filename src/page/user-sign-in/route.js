'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

let Index = Vue.extend({
    template : Tpl,
    components : {

    },
    ready : function(){
        this.callJsApi('biz.navigation.setTitle',{title:'签到'});
    },
    data : ()=>{
        return Value
    },
    methods: {

    },
    computed : {

    },
    route : {

    }
})

export default Index