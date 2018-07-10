/**
 * @file lavas config
 * @author ShoneSingLone(ShoneSingLone@gmail.com)
 */

'use strict';
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'messidor');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    build: {
        ssr: false,
        path: BUILD_PATH,
        publicPath: "/messidor/",
        ssrCopy: isDev ? [] : [{
                src: 'server.prod.js'
            },
            {
                src: 'package.json'
            }
        ],
        extend(config, {
            type,
            env
        }) {
            // 在客户端和服务端同时生效，等同于 type === 'client' || type === 'server'
            if (type === 'base') {
                let webpackRules = config.module.rules;
                webpackRules.push({
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS
                    ]
                });
            }
        },
        plugins: {
            base: [
                /* 
                new CopyWebpackPlugin([{
                    from: path.resolve(__dirname, './dist'),
                    to: path.resolve(__dirname, '../../ShoneSingLone.github.io/messidor'),
                    toType: 'dir'
                    // ignore: ['.*']
                }]),
                */
                new WebpackShellPlugin({
                    onBuildStart: ['pwd && echo "onBuildStart"'],
                    onBuildEnd: ['pwd && echo "onBuildEnd"'],
                    onBuildExit: ['cp -Rf ./messidor/ ../../ShoneSingLone.github.io/']
                    // onBuildEnd: ['rm -rf ../../ShoneSingLone.github.io/messidor/ && mv  ./dist/ ../../ShoneSingLone.github.io/messidor/']
                })
            ],
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
        // bundleAnalyzerReport: true,
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
        client: ['must-have-db'] // 仅浏览器端执行
        // client: ['login-client'] // 仅浏览器端执行
    },
    serviceWorker: {
        swSrc: path.join(__dirname, 'core/service-worker.js'),
        swDest: path.join(BUILD_PATH, 'service-worker.js'),
        // swPath: '/custom_path/', // specify custom serveice worker file's path, default is publicPath
        globDirectory: BUILD_PATH,
        globPatterns: [
            '**/*.{html,js,css,eot,svg,ttf,woff,jpg,png}'
        ],
        globIgnores: [
            'sw-register.js',
            '**/*.map'
        ],
        appshellUrl: '/messidor',
        dontCacheBustUrlsMatching: /\.\w{8}\./
    }
};
