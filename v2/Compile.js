function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);

    } else {
      console.log('Dom 节点 not find!');
    }
  },
  nodeToFragment: function(el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while(child) {
      //Dom放入 fragment 中
      fragment.appendChild(child)
      child = el.firstChild;
    }
    return fragment;
  },
  compileElement: function(el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function (node) {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;

      if (self.isTextNode(node) && reg.test(text)) { //文本
        self.compileText(node, reg.exec(text)[1]); //(node, 'data属性名')
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node); //递归
      }
    });
  },
  compileText: function (node, exp) {
    var self = this;
    var initText = this.vm[exp];
    this.updateText(node, initText); // 初始化数据到视图。
    new Watcher(this.vm, exp, function(val) { //在这里监听
      self.updateText(node,val);
    });
  },
  updateText: function(node, val) {
    node.textContent = typeof val === 'undefined' ? '' : val;
  },
  isTextNode: function(node) {
    return node.nodeType === 3;
  }

};
