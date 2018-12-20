function MyVue(option) {
  var self = this;
  this.vm = this;
  this.data = option.data;

  Object.keys(option.data).forEach(function(key){
    self.proxyKeys(key);
  })



  //监听数据
  observe(this.data);

  //用编译器动态绑定节点
  new Compile(option.el, this.vm);

  // el.innerHTML = this.data[exp]; //初始化模板数据

  // new Watcher(this, exp, function(value){
  //   el.innerHTML = value;
  // });
  return this;
}
MyVue.prototype = {
  proxyKeys: function(key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumrable: false,
      configurable: true,
      get: function proxyGetter() {
        return this.data[key];
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal;
      }

    })
  }
}

console.log("my vue completed!");
