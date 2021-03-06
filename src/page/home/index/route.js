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
        this.callJsApi('biz.navigation.setTitle',{title:'首页'});
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