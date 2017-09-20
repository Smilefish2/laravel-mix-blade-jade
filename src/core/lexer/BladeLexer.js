'use strict';

module.exports = function() {
    var Jade = require('jade');
    var Blade = Jade.Lexer.prototype;


    /**
     * Blade directives
     */
    Blade.bladeDirectives = function () {
        var captures;
        var regexp = /^(@\w+)\b[\t]*(.*|[^\n]+)/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[2]);
            tok.name = captures[1];
            tok.statements = true;

            return tok;
        }
    };


    /**
     * Blade Raw
     */
    Blade.bladeRaw = function () {
        var captures;
        var regexp = /^({{{[^\n]+}}})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            return tok;
        }
    };


    /**
     * Blade Escaped
     */
    Blade.bladeEscaped = function () {
        var captures;
        var regexp = /^({{[^\n]+}})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            return tok;
        }
    };


    /**
     * Blade Unescaped
     */
    Blade.bladeUnescaped = function () {
        var captures;
        var regexp = /^({!![^\n]+!!})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            return tok;
        }
    };


    /**
     * Blade Javascript Framework
     */
    Blade.bladeJavascript = function () {
        var captures;
        var regexp = /^(@{{[^\n]+}})/;
        if (captures = regexp.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('bladeDirectives', captures[0]);

            return tok;
        }
    };


    /**
     * Return the next token object.
     *
     * @return {Object}
     * @api private
     */
    Blade.next = function () {
        return this.deferred()
            || this.blank()
            || this.eos()
            || this.pipelessText()
            || this.yield()
            || this.doctype()
            || this.interpolation()
            || this["case"]()
            || this.when()
            || this["default"]()
            || this["extends"]()
            || this.append()
            || this.prepend()
            || this.block()
            || this.mixinBlock()
            || this.include()
            || this.includeFiltered()
            || this.mixin()
            || this.call()
            || this.conditional()
            || this.each()
            || this["while"]()
            || this.bladeRaw()
            || this.bladeEscaped()
            || this.bladeUnescaped()
            || this.bladeJavascript()
            || this.bladeDirectives()
            || this.tag()
            || this.filter()
            || this.blockCode()
            || this.code()
            || this.id()
            || this.className()
            || this.attrs()
            || this.attributesBlock()
            || this.indent()
            || this.text()
            || this.comment()
            || this.colon()
            || this.dot()
            || this.textFail()
            || this.fail();
    };
};
