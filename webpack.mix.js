let mix = require('laravel-mix')
let tailwindcss = require('tailwindcss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('dist')

mix.disableSuccessNotifications()

mix.options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.config.js')],
})

mix.sass('src/css/popup.scss', 'dist/css')
    .sass('src/css/options.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/popup.js', 'dist/js')
    .js('src/js/options.js', 'dist/js')
    .vue()
    .copy('src/popup.html', 'dist/')
    .copy('src/options.html', 'dist/')
    .copyDirectory('src/images', 'dist/images')
    .copyDirectory('src/_locales', 'dist/_locales')
    .copy('src/manifest.json', 'dist/')
//.purgeCss();

if (!mix.inProduction) {
    mix.sourceMaps()
}
