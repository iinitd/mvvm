const { JSDOM } = require("jsdom")

const dom = new JSDOM(`<!DOCTYPE html><input id="app" v-model="name">Hello world</input>`);

const document = dom.window.document

module.exports = {
    document: document
}