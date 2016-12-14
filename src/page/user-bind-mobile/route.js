'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

let Index = Vue.extend({
    template : Tpl,
    ready : function(){
        this.setTitle({title:'员工绑定'});
    },
    data : ()=>{
        return Value
    },
    methods: {
        sendSms(){

            this.sms_number = 60;
            let interval = setInterval(()=>{
                this.sms_number --;
                if(this.sms_number == 0){
                    clearInterval(interval)
                }
            },1e3)

        },
        bindPhone(){

        }
    },
    computed : {
        sms_text(){
            if(this.sms_number == 0){
                return '获取验证码'
            }else{
                return this.sms_number + '秒后再次获取'
            }
        }
    }
})

export default Index