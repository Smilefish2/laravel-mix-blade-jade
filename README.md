# laravel-mix-blade-jade
Create laravel blade views using jade

## Install

``` bash
$ npm install --save-dev laravel-mix-blade-jade
```

``` js
// webpack.mix.js

let mix = require('laravel-mix');

mix.setPublicPath('dist');
mix.jade = require('laravel-mix-blade-jade');

/**
 * Blade Views
 */
mix.jade('src/views', 'public/views');

// ...
```

## Usage

``` js
// index.jade

doctype html
html
    head
        title @yield('title')
    body
        @include("partials.foo-bar", ['key' => 'val'])

        @section('sidebar')
            sidebar.master
                p This is the master sidebar.
        @stop

        .container: .row
            @yield('content')
```

``` html
<!-- index.blade.php -->

<!DOCTYPE html>
<html>
    <head>
        <title>@yield('title')</title>
    </head>
    <body>
        @include("partials.foo-bar", ['key' => 'val'])
        @section('sidebar')
            <sidebar class="master">
                <p>This is the master sidebar.</p>
            </sidebar>
        @stop
        <div class="container">
            <div class="row">
                @yield('content')
            </div>
        </div>
    </body>
</html>
```

## Official Documentations

- Documentation for Mix can be found on the [Laravel website](http://laravel.com/docs/mix).
- Documentation for Pug can be found on the [Pug website](http://pugjs.org).
- Documentation for Mix repositories can be found on the [Github](https://github.com/JeffreyWay/laravel-mix)


## Thanks

- [bladejs-core](https://github.com/iguntur/bladejs-core) - API for this src/core module
- [laravel-mix-pug](https://github.com/matejsvajger/laravel-mix-pug) - API for this src/tasks module
- [laravel-blade-jade](https://github.com/iguntur/laravel-blade-jade) - API for this README.md

## License

MIT @ [JMJ](http://escapeplan.me)