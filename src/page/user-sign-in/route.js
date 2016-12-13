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
        console.log('ready')
        this.setTitle({title:'签到'}).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.error(err)
        })
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