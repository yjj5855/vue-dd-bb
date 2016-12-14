
import * as mutations from './mutation-types'

export function getRequestAuthCode({ dispatch, state }, products) {
    let corpId = state.app.ddConfig.corpId;
    dd.runtime.permission.requestAuthCode({
        corpId : corpId,
        onSuccess : function(result) {
            dispatch(mutations.UPDATE_CODE,result.code)

            getUserInfo({ dispatch, state },result.code)

            console.log('获取到了免登陆code=>'+result.code)
        },
        onFail : function(err) {
            dispatch(mutations.UPDATE_CODE,false)
            console.log('获取免登陆code失败')
        }
    });
}

export function getUserInfo({dispatch, state}, code) {

}