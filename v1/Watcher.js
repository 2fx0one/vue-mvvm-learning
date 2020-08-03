//Watcher
function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.get(); //add self to dep
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.vm.data[this.exp]; //会触发获取
    var oldVal = this.value;
    if (oldVal !== value) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function () {
    Dep.target = this; //缓存自己
    var value = this.vm.data[this.exp]; //执行监听器get函数
    Dep.target = null;
    return value;
  }
}
