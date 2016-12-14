'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import './style.less'
// import WalletService from './service'

import {config} from '../../../../env'

import Group from 'vux/dist/components/group'
import Cell from 'vux/dist/components/cell'
import Blur from 'vux/dist/components/blur'
import Popup from 'vux/dist/components/popup'
import Qrcode from 'vux/dist/components/qrcode'
import Alert from 'vux/dist/components/alert'

let Index = Vue.extend({
    
    template : Tpl,
    components : {
        Group,
        Cell,
        Blur,
        Popup,
        Qrcode,
        Alert,
    },
    vuex: {
        getters: {
            route: (state) => state.route,
            userInfo: (state) => state.app.user,
        },
    },
    ready : function(){
        this.setTitle({title:'个人'}).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.error(err)
        })
    },
    data : ()=>{
        return {

        }
    },
    events : {
       
    },
    methods: {

    },
    computed : {
        filterAvatar(){
            return this.userInfo.avatar !='' ? this.userInfo.avatar : 'http://img5.imgtn.bdimg.com/it/u=1457102793,1407747410&fm=23&gp=0.jpg'
        }
    },
    route : {
        data : function(transition){
            transition.next()
        }
    }
})

export default Index