'use strict';

var App = function (jade) {

    jade = jade || require('jade');

    /**
     * Add New Nodes
     */
    require('./nodes');

    /**
     * Overrides Jade Lexer Prototype
     */
    require('./lexer/BladeLexer')(jade);

    /**
     * Overrides Jade Parser Prototype
     */
    require('./parser/BladeParser')(jade);

    /**
     * Overrides Jade Compiler Prototype
     */
    require('./compiler/BladeCompiler')(jade);

};

module.exports = App();
