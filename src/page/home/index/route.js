'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
// import './style.less'

import Scroller from 'vux/dist/components/scroller'
import Flexbox from 'vux/dist/components/flexbox'
import FlexboxItem from 'vux/dist/components/flexbox-item'
import XImg from 'vux/dist/components/x-img'
import Alert from 'vux/dist/components/alert'
import Swiper from 'vux/dist/components/swiper'
import SwiperItem from 'vux/dist/components/swiper-item'

let Index = Vue.extend({
    template : Tpl,
    components : {
        Scroller,
        Flexbox,
        FlexboxItem,
        XImg,
        Alert,
        Swiper,
        SwiperItem,
    },
    ready : function(){ //做浏览器判断 和 兼容
        this.setTitle({title:'首页'}).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.error(err)
        })
    },
    data : ()=>{
        return Value
    },
    methods: {
        success: function(e, t) {
            // console.log("success load", e);
            var n = t.parentNode.querySelector("span");
            t.parentNode.removeChild(n);
            if(e == this.list[0]){
                $(t).on('click',()=>{
                    this.goRoute('/yuyue',this)
                })
            }
        },
        error: function(e, t, n) {
            // console.log("error load", n, e);
            var a = t.parentNode.querySelector("span");
            a.innerText = "加载失败"
        },
        toast(){
            appRoot.toast('其他地区正在开通')
        }
    },
    computed : {
        
    },
    route : {
        data : function({next}){
            next();
        },
        activate : function({next}){
            next();
        },
        canDeactivate : function({next}){
            next();
        },
        deactivate: function({next}){
            next();
        }

    }
})

export default Index