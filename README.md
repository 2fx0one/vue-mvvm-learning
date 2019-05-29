# vue 双向绑定原理
![vue-mvvm](https://github.com/2fx0one/vue-mvvm-learning/blob/master/vue-mvvm.png "vue 双向绑定原理")

# vue 解析器
![vue-mvvm](https://github.com/2fx0one/vue-mvvm-learning/blob/master/vue-compile.png "vue 解析器")

# vue-mvvm-learning
学习vue mvvm框架

## v0版本 单个js文件 和一些测试文件
简单的双向绑定。固定节点替换数据， 没有解析器解析dom节点。

## v1版本 文件模块拆分
简单的双向绑定。固定节点替换数据， 没有解析器解析dom节点。

## v2版本 新增Compile，
1. 实现解析模板{{}}，替换模板数据，初始化视图。
2. 将模板指令对应的节点绑定对应的更新函数。初始化相关订阅器。

## v3版本 Compile 新增 模型 时间 绑定
1. 模型绑定 v-model
2. 事件绑定 v-on:click

学习参考资料：



- [剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)
  
    参考代码：https://github.com/DMQ/mvvm

- [vue的双向绑定原理及实现](https://www.cnblogs.com/canfoo/p/6891868.html)
  
    参考代码: https://github.com/canfoo/self-vue
