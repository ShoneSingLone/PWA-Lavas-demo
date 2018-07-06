/**
 * @file lavas config
 * @author ShoneSingLone(ShoneSingLone@gmail.com)
 */

'use strict';
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    build: {
        ssr: false,
        path: BUILD_PATH,
        publicPath: "/",
        ssrCopy: isDev ? [] : [{
                src: 'server.prod.js'
            },
            {
                src: 'package.json'
            }
        ],
        plugins: {
            // base: [
            //     new CopyWebpackPlugin([{
            //         from: path.resolve(__dirname, './static'),
            //         to: path.resolve(__dirname, './abc'),
            //         // ignore: ['.*']
            //     }])
            // ],
            client: [],
            server: []
        },
        /**
         * alias for webpack
         *
         * @type {Object.<string, Object>}
         */
        alias: {
            server: {
                'iscroll/build/iscroll-lite$': path.join(__dirname, 'core/iscroll-ssr.js')
            }
        },
        /**
         * node externals
         *
         * @type {Array.<string|RegExp>}
         */
        nodeExternalsWhitelist: [
            /iscroll/
        ],
        bundleAnalyzerReport: true,
        babel: {
            plugins: [
                "transform-runtime", ["transform-imports",
                    {
                        "vuetify": {
                            "transform": "vuetify/es5/components/${member}",
                            "preventFullImport": true
                        }
                    }
                ]
            ]
        }
    },
    router: {
        mode: 'hash',
        // mode: 'history',
        base: '/',
        pageTransition: {
            type: 'slide',
            transitionClass: 'slide'
        }
    },
    middleware: {
        all: [], // 前后端均执行
        server: [], // 仅服务器端执行
        client: ['login-client'] // 仅浏览器端执行
    },
    serviceWorker: {
        swSrc: path.join(__dirname, 'core/service-worker.js'),
        swDest: path.join(BUILD_PATH, 'service-worker.js'),
        // swPath: '/custom_path/', // specify custom serveice worker file's path, default is publicPath
        globDirectory: BUILD_PATH,
        globPatterns: [
            '**/*.{html,js,css,eot,svg,ttf,woff}'
        ],
        globIgnores: [
            'sw-register.js',
            '**/*.map'
        ],
        appshellUrl: '/appshell',
        dontCacheBustUrlsMatching: /\.\w{8}\./
    }
};
