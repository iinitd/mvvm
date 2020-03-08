const { VM } = require('./vm')
const { document } = require("./dom")



vm = new VM("app", {
    name: "John"
})

// model -> view

vm.data.name = "Tom"
vm.data.name = "Joey"

// view -> model

node = document.getElementById("app")
node.value = 'Chandler'

var event = document.createEvent('Event');
event.initEvent('input', true, true);
node.dispatchEvent(event);