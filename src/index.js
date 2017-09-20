/*
 |--------------------------------------------------------------------------
 | Welcome to laravel-mix-blade-jade!
 |--------------------------------------------------------------------------
 */
const _ = require('lodash');
const glob = require('glob');
const path = require('path');
const Verify = require('laravel-mix/src/Verify');

const config = require('./config');
const MixJadeTask = require('./tasks/MixJadeTask');


/**
 *  main entrance
 *
 * @param src
 * @param output
 * @param pluginOptions
 * @returns {jade}
 */
var jade = function (src, output, pluginOptions = {}) {
    let options = _.merge(config, pluginOptions);
    Config.merge({
        pug: options
    });

    Verify.dependency('jade', ['jade'], true);

    let files = glob.sync(path.join(src, options.search), {ignore: options.ignore});
    let task = new MixJadeTask({ src, output, options, files });

    Mix.addTask(task);

    return this;
}

module.exports = jade;