import { logException } from './ravenConfig'
import env from '../../env'

const config = {

    // 请求方法同上
    method: 'get', // default
    // 基础url前缀
    baseURL: env.API_HOST,


    transformRequest: [function (data) {
        // 这里可以在发送请求之前对请求数据做处理

        return data;
    }],

    transformResponse: [function (response) {
        // 这里提前处理返回的数据
        let res = null;
        try {
            res = JSON.parse(response)
        }catch (err){
            logException(new Error('接口返回不是一个对象'), err)
        }
        if(typeof res == 'object'){
            res.code = parseInt(res.status||res.code);
            switch(res.code){
                case 200:

                    break;

                default:
                    logException(new Error(res.status||res.code+' 错误'), res)
                    break;
            }
        }

        return response;
    }],

    // 请求头信息
    // headers: {'X-Requested-With': 'XMLHttpRequest'},

    //parameter参数
    // params: {
    //     ID: 12345
    // },

    //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
    data: {

    },

    //设置超时时间
    timeout: 5000,
    //返回数据类型
    // responseType: 'json', // default

}

export default config;