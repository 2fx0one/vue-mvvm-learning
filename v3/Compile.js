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

     if (self.isElementNode(node)) {
        self.compile(node); //编译指令相关
      } else if (self.isTextNode(node) && reg.test(text)) { //文本
        self.compileText(node, reg.exec(text)[1]); //(node, 'data属性名')
      } 


      //包含子节点，递归
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node); //递归
      }
    });
  },

  compile: function(node) {
    var self = this;
    var nodeAttrs = node.attributes;
    Array.prototype.forEach.call(nodeAttrs, function(attr) {
      var attrName = attr.name; //v-model
      if (attrName.indexOf('v-') == 0) { //v-model
        var exp = attr.value;
        var dir = attrName.substring(2); //model
        self.compileModel(node, self.vm, exp, dir); //绑定
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

  compileModel: function(node, vm, exp, dir) {
    var self = this;
    var val = this.vm[exp];
    this.updateModel(node, val);
    new Watcher(this.vm, exp, function(val){
      self.updateModel(node, val);
    });

    node.addEventListener('input', function(e){
      var newVal = e.target.value;
      if (val === newVal) {
        return;
      } 

      self.vm[exp] = newVal;
      val = newVal;

    });
  },


  updateText: function(node, val) {
    node.textContent = typeof val === 'undefined' ? '' : val;
  },
  updateModel:function(node, val, oldVal) {
    node.value = typeof val == 'ndefined' ? '' : val;
  },
  
  isElementNode: function(node) {
    return node.nodeType === 1;
  },

  isTextNode: function(node) {
    return node.nodeType === 3;
  }

};
