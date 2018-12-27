function MyVue(option) {
  var self = this;
  this.vm = this;
  this.data = option.data;

  Object.keys(this.data).forEach(function(key){
    self.proxyKeys(key);
  })


  //监听数据
  observe(this.data);

  //用编译器动态绑定节点
  new Compile(option.el, this);

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
