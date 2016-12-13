import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    isLoading: false, //路由加载标志位
    direction: 'forward', //路由动画变量

    title: '', //钉钉顶部标题
    right: '', //钉钉右边的
}
export default new Vuex.Store({
    state,
    mutations: {
        UPDATE_LOADING (state, status) {
            state.isLoading = status
        },
        UPDATE_DIRECTION (state, direction) {
            state.direction = direction
        }
    }
})