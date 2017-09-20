'use strict';

module.exports = function() {
    var Jade = require('jade');
    var Blade = Jade.Compiler.prototype;

    /**
     * Visit Directives
     */
    Blade.visitDirectives = function (tag) {
        if (tag.statements) {
            this.compileStatements(tag);
        } else {
            if (this.pp) this.prettyIndent(1, true);
            this.buffer(tag.val);
        }
    };


    /**
     * Compile Blade statements that start with "@".
     * @param {object} tag
     */
    Blade.compileStatements = function (tag) {
        var self = this;
        var bufferTag = function () {
            self.buffer(tag.name + tag.val);
        };

        if (tag.name === "@extends") {
            bufferTag();
        } else {
            if (this.pp) this.prettyIndent(1, true);
            bufferTag();
        }

        if (tag.block) {
            this.indents++;
            if (!tag.buffer) this.buf.push('{');
            this.visit(tag.block);
            if (!tag.buffer) this.buf.push('}');
            this.indents--;
        }
    };


    /**
     * Comment
     * @param {object} comment
     */
    Blade.visitComment = function(comment) {
        var val = comment.val.trim();
        if (this.pp) this.prettyIndent(1, true);

        if (comment.buffer) {
            val = `<!-- ${val} -->`;
        } else {
            val = `{{-- ${val} --}}`;
        }

        this.buffer(val);
    };


    /**
     * Block Comment
     * @param {object} comment
     */
    Blade.visitBlockComment = function(comment) {
        var self = this;
        var line = comment.block.nodes.length;

        if (this.pp) this.prettyIndent(1, true);

        var bufferComment = function (open, close) {
            self.indents++;
            self.buffer(open);
            if (self.pp) self.prettyIndent(1, line == 1);
            self.visit(comment.block);
            if (self.pp) self.prettyIndent(0, true);
            self.buffer(close);
            self.indents--;
        };

        if (comment.buffer) {
            bufferComment('<!--', '-->');
        }
        else {
            bufferComment('{{--', '--}}');
        }
    };
};
