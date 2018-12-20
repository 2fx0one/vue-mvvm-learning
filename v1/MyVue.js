function MyVue(data, el, exp) {
  var self = this;
  this.data = data;

  Object.keys(data).forEach(function(key){
    self.proxyKeys(key);
  })


  el.innerHTML = this.data[exp]; //初始化模板数据

  //监听数据
  observe(data);

  new Watcher(this, exp, function(value){
    el.innerHTML = value;
  });
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
