'use strict';

var Jade  = require('jade');
var Node  = Jade.nodes.Node;
// var Block = Jade.nodes.Block;

var Directives = module.exports = function Directives(name, value, statements) {
    this.name = name;
    this.statements = statements || false;
    this.val = value || '';
};

Directives.prototype = Object.create(Node.prototype);
Directives.prototype.constructor = Directives;

Directives.prototype.type = 'Directives';
