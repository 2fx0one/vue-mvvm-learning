function observe(data) {
  if (!data || typeof data !== 'object' ) {
    return;
  }
  return new Observer(data);
}

function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function(data) {
    var self = this;
    Object.keys(data).forEach(function(key){
      self.defineReactive(data, key, data[key]);
    })
  },

  defineReactive:function (data, key, val) {
    var dep = new Dep();
    observe(val); //监听子属性
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        if (Dep.target) {
          console.log('劫持[GET]方法 ', val);
          dep.addSub(Dep.target); //watcher
        }
        return val;
      },
      set: function(newVal) {
        if (val === newVal) return;
        console.log('劫持[SET]方法', newVal);
        val = newVal;
        dep.notify();
      }
    })
  }
};

// 订阅器 收集所有订阅者
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    // console.log(this.subs);
    this.subs.forEach(function(sub){
      sub.update();
    });
  }
}
Dep.target = null;
