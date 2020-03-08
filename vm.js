const { document } = require("./dom")

// var obj = { name: "John" }
// var vm = {} // 当然，你也可以在原对象上进行修改。
// observe(obj, vm)
// new Subscriber(vm, null, "name")
// vm.name = "Tom"
// vm.name = "Joey"

GLOBAL_CURRENT_SUB = null

function observe(obj, vm) {
    Object.keys(obj).forEach(function (key) {
        defineReactive(vm, key, obj[key]);
    });
    return vm
}

function defineReactive(obj, key, val) {
    dep = new Dep() // 我们使用闭包来保存当前属性的依赖方。
    Object.defineProperty(obj, key, {
        get: function () {
            // 这里应该保存所有使用这个属性的人。

            if (GLOBAL_CURRENT_SUB) dep.addSub(GLOBAL_CURRENT_SUB)
            return val
        },
        set: function (newVal) {
            if (newVal === val) return
            val = newVal;
            // 这里应该通知所有使用这个属性的人。
            dep.notify()
        }
    });
}

function Dep() {
    this.subs = []
    this.notify = () => {
        for (let i = 0; i < this.subs.length; i += 1) {
            this.subs[i].update()
        }
    }
    this.addSub = (sub) => {
        this.subs.push(sub)
    }
}

function Subscriber(vm, node, key) {
    GLOBAL_CURRENT_SUB = this
    this.update = update
    this.key = key
    this.node = node
    this.vm = vm
    this.value = vm[key]
    GLOBAL_CURRENT_SUB = null
}

function update() {
    this.value = this.vm[this.key]
    if (this.node) {
        this.node.nodeValue = this.value;
        console.log("node know my new name: " + this.value)
    } else {
        console.log("i know my new name: " + this.value)
    }
}

function compile(vm, el) {
    node = document.getElementById(el)
    console.log(node.nodeValue);
    vModel = node.getAttribute('v-model')
    if (vModel && vm.data[vModel]) {
        new Subscriber(vm.data, node, vModel)
        node.addEventListener('input', function (e) {
            vm.data[vModel] = e.target.value
        }, false);
    }

    // new Subscriber

}

function VM(el, obj) {
    this.el = el
    this.data = observe(obj, {})
    compile(this, el)
}

module.exports = {
    VM: VM
}