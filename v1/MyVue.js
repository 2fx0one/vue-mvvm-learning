function MyVue(option) {
  var self = this;
  this.data = option.data;

  Object.keys(this.data).forEach(function (key) {
    self.proxyKeys(key);
  })

  var el = document.querySelector(option.el);

  el.innerHTML = this.data[option.exp]; //初始化模板数据

  //监听数据
  observe(this.data);

  new Watcher(this, option.exp, function (value) {
    // console.log(arguments);
    // console.log(value);
    // console.log(oldVal);
    el.innerHTML = value;
  });
  return this;
}

MyVue.prototype = {
  proxyKeys: function (key) {
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
    });
  }
}

console.log("my vue completed!");
