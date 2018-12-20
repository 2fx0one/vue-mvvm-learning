// 订阅器 收集所有订阅者
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    console.log(this.subs);
    this.subs.forEach(function(sub){
      sub.update();
    });
  }
}
Dep.target = null; //指向订阅者 waticher
