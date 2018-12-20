
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
				console.log('value get = ', val);
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
				return val;
			},
			set: function(newVal) {
				if (val === newVal) return;
				console.log('value change to new = ', newVal);
				val = newVal;
				dep.notify();
			}
		})
	}
};

// var data = {name: 'kelvin'};

// observe(data);

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
Dep.target = null;

function Watcher(vm, exp, cb) {
	this.vm = vm;
	this.exp = exp;
	this.cb = cb;
	this.value = this.get(); //add self to dep
}

Watcher.prototype = {
	update: function() {
		this.run();
	},
	run: function() {
		var value = this.vm.data[this.exp]; //会触发获取
		var oldVal = this.value;
		if (oldVal !== value) {
			this.value = value;
			this.cb.call(this.vm, value, oldVal);
		}
	},
	get:function() {
		Dep.target = this; //缓存自己
		var value = this.vm.data[this.exp]; //执行监听器get函数
		Dep.target = null;
		return value;
	}
}

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
