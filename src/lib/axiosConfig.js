import { logException } from './ravenConfig'
import env from '../../env'

const config = {

    // 请求方法同上
    method: 'get', // default
    // 基础url前缀
    baseURL: env.API_HOST,


    transformRequest: [function (data) {
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）

        return data;
    }],

    transformResponse: [function (response) {
        // 这里提前处理返回的数据
        let res = null;
        try {
            res = JSON.parse(response)
        }catch (err){
            logException(new Error('接口返回不是一个对象'), res)
        }
        if(typeof res == 'object'){
            switch(res.status){
                case 200:

                    break;

                default:
                    logException(new Error(res.status+' 错误'), res)
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