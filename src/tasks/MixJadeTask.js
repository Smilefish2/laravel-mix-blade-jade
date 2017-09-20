const Task = require('laravel-mix/src/tasks/Task');
const File = require('laravel-mix/src/File');
const FileCollection = require('laravel-mix/src/FileCollection');

const notifier = require('node-notifier');
const mkdirp = require('mkdirp');
const glob = require('glob');
const path = require('path');
const jade  = require('jade');
const fs   = require('fs');

const blade = require('../core');

class MixJadeTask extends Task {
    /**
     * Run the jade compiler.
     */
    run() {

        let {src, output, options, files} = this.data;

        this.src = src;
        this.dest = output;
        this.config = options;
        this.templates = files;

        this.files = new FileCollection(
            glob.sync(path.join(src, options.search), {ignore: '**/node_modules/**/*'})
        );

        //Preprare destination assets
        this.assets = files.map(asset => this.prepareAssets(asset));

        this.compile();
    }
    /**
     * Compiles a collection of jade templates.
     *
     */
    compile() {

        this.templates.forEach((template, index) => this.compileTemplate(template, index));

        return this;
    }

    /**
     * Compiles a single jade template
     *
     * @param {string} src Path to the jade source file
     * @param {number} index
     */
    compileTemplate(src, index) {
        let file = new File(src);
        let output = this.assets[index];

        try {

            let template = jade.compileFile(file.path(), { pretty: this.config.pretty });
            let html = template();

            if (!fs.existsSync(output.base())) {
                mkdirp.sync(output.base());
            }

            fs.writeFileSync(output.path(), html);

            this.onSuccess();

        } catch (e) {
            this.onFail(e.name + ': ' + e.message);
        }
    }

    /**
     * Recompile on change when using watch
     *
     * @param {string} updatedFile
     */
    onChange(updatedFile) {
        this.compile();
    }


    /**
     * Handle successful compilation.
     *
     * @param {string} output
     */
    onSuccess(output) {
        if (Config.notifications.onSuccess) {
            notifier.notify({
                title: 'Laravel Mix',
                message: 'Jade Compilation Successful',
                contentImage: 'node_modules/laravel-mix-blade-jade/src/logo.png'
            });
        }
    }


    /**
     * Handle failed compilation.
     *
     * @param {string} output
     */
    onFail(output) {
        console.log("\n");
        console.log('Jade Compilation Failed!');
        console.log();
        console.log(output);

        if (Mix.isUsing('notifications')) {
            notifier.notify({
                title: 'Laravel Mix',
                subtitle: 'Jade Compilation Failed',
                message: output,
                contentImage: 'node_modules/laravel-mix-blade-jade/src/logo.png'
            });
        }
    }

    prepareAssets(src) {
        let file = new File(src);
        let folder = file.filePath.replace(this.src, '').replace(file.name(), '');
        let output = path.join(this.dest, folder, file.nameWithoutExtension() + '.blade.php');
        let asset = new File(output);
        Mix.addAsset(asset);
        return asset;
    }
}

module.exports = MixJadeTask;