import {
    UPDATE_LOADING,
    UPDATE_DIRECTION,
    DDCONFIG_SUCCESS,
    DDCONFIG_ERROR,
    UPDATE_CODE
} from '../mutation-types'

const state = {
    isLoading: false, //路由加载标志位
    direction: 'forward', //路由动画变量

    ddConfig: null,
    ddConfigStatus: null,
    code: null,
}

const mutations = {
    [UPDATE_LOADING] (state, status) {
        state.isLoading = status
    },
    [UPDATE_DIRECTION] (state, direction) {
        state.direction = direction
    },
    [DDCONFIG_SUCCESS] (state, config) {
        state.ddConfigStatus = true;
        state.ddConfig = config;
    },
    [DDCONFIG_ERROR] (state, config) {
        state.ddConfigStatus = false;
        state.ddConfig = null;
    },
    [UPDATE_CODE] (state, code) {
        state.code = code
    }
}

export default {
    state,
    mutations
}