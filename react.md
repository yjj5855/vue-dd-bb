# 前端框架调研

## react和vue的对比

### [深入理解React、Redux](http://www.jianshu.com/p/0e42799be566)

### [Vue 和 React 的使用场景和深度有何不同？](https://www.zhihu.com/question/31585377)

### [Vue文档中比较React](https://vuefe.cn/v2/guide/comparison.html)

## 文档

### react

#### [react技术栈](https://github.com/ruanyf/jstraining/blob/master/docs/react.md)
#### [react-redux](https://github.com/camsong/redux-in-chinese)
#### [学redux视频](https://learnredux.com/)
#### [如何用React+Redux+ImmutableJS进行SPA开发](http://yunlaiwu.github.io/blog/2016/12/01/react+redux+immutablejs/)


### vue
#### [vue1.0官方文档](https://github.com/vuejs/vuex/tree/1.0/docs/zh-cn)
#### [vue-router1.0](https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn)
#### [vuex1.0文档](https://github.com/vuejs/vuex/tree/1.0/docs/zh-cn)

### UI组件库

#### react

1. [salt-ui](http://g.alicdn.com/dingding/open-demo/0.0.7/index.html?spm=a219a.7629140.0.0.QDstOg#/?_k=tz0pj9)
钉钉推荐的ui库 ,但是只支持[react0.14.3](https://github.com/saltjs/salt-ui/wiki/gettingstarted?spm=a219a.7629140.0.0.rf9N9E)版本 
意味着可能要学2套api(react的版本更新api变动的风险较高)，或者只使用这一个版本的react。

2. [蚂蚁金服开源UI](http://mobile.ant.design/kitchen-sink/)
只有和阿里业务有关的一些UI 组件数量一般，在钉钉APP里打开tabbar有点问题

3. [weui react版](https://weui.github.io/react-weui/#/?_k=c3aqg5)
0.4版本组件较少， 1.0版本还在测试阶段，

#### vue

1. [weui vue版](http://vux.li/)
组件丰富，文档齐全，demo也很多

2. [weui vue版](http://demo.getvum.com/)
国内大牛开源的一个UI框架，作者写过sui,msui,light7这些针对移动端的ui框架，比较成熟。


### 结论

#### react
整个生态比较大，基本组件都能找到（但相应的学习成本就更大）
对前端团队整体实力要求较高，适合开发大型项目，只有使用它的整个生态才能发挥出react的威力

#### vue
开箱即用，符合传统web开发的思想，和微信小程序开发模式基本相同

### 各种开发选型

1. 纯web开发（中小型项目）
vue更容易上手，开发更高效

2. 纯web开发（大型多人合作项目）
react更适合做

3. 原生APP开发(js为主)
react native 是最好选择

4. 混合应用开发
2者都可以开发，vue更简单一些