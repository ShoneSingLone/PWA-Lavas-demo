/**
 * @file client entry
 * @author ShoneSingLone(ShoneSingLone@gmail.com)
 */

import Vue from 'vue';
import {
    getMiddlewares,
    execSeries,
    getClientContext
} from '@/.lavas/middleware';
import lavasConfig from '@/.lavas/config';
import {
    createApp
} from './app';
import ProgressBar from '@/components/ProgressBar';
import arrayFindShim from 'array.prototype.find';
import arrayIncludesShim from 'array-includes';
import {
    stringify
} from 'querystring';

import 'es6-promise/auto';
import '@/assets/stylus/main.styl';

// import initData from '../modules/init';
import MyDB from "../modules/common/db";
import Axios from 'axios';
import Marked from 'marked';
import Highlight from 'highlight.js';
import jquery from 'jquery';
// let jquery = window.jquery;

let renderer = new Marked.Renderer();
renderer.headerIdPrefix = 0;
renderer.heading = function (text, level, raw) {
    return '<h' + level + ' id="' + (this.headerIdPrefix++) + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-') + '" class="content">' +
        text +
        '</h' + level + '>\n';
}
renderer.link = function (href, title, text) {
    if (this.options.sanitize) {
        try {
            var prot = decodeURIComponent(unescape(href))
                .replace(/[^\w:]/g, '')
                .toLowerCase();
        } catch (e) {
            return text;
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
            return text;
        }
    }
    if (this.options.baseUrl && !originIndependentUrl.test(href)) {
        href = resolveUrl(this.options.baseUrl, href);
    }
    var out = '<a target="_blank" href="' + href + '"';
    if (title) {
        out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
};


Marked.setOptions({
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        code = Highlight.highlightAuto(code).value;
        return code;
    }
});


//以上是对现实的数据做初始化的一些配置。主要是Markdown的处理


// Apply shim & polyfill.
arrayFindShim.shim();
arrayIncludesShim.shim();

let loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount();
let {
    App,
    router,
    store
} = createApp();
let {
    build: {
        ssr,
        cssExtract
    },
    middleware: middConf = {},
    skeleton: {
        enable: enableSkeleton,
        asyncCSS
    }
} = lavasConfig;
let app;

// Sync with server side state.
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

// Don't let browser restore scroll position.
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

// Add loading component.
document.body.appendChild(loading.$el);

Vue.mixin({
    /**
     * 中继
     * Add an in-component guard which gets called
     * when component is reused in the new route.
     * eg. /detail/1 => /detail/2
     *
     * @param {Object} to to route
     * @param {Object} from from route
     * @param {Function} next next function
     */
    async beforeRouteUpdate(to, from, next) {
        let asyncData = this.$options.asyncData;
        if (asyncData) {
            loading.start();
            asyncData.call(this, {
                store: this.$store,
                route: to
            }).then(() => {
                loading.finish();
                next();
            }).catch(next);
        } else {
            next();
        }
    }
});

/**
 * Add your custom router global guards here.
 * These guards must be added before new App().
 */
// https://github.com/lavas-project/lavas/issues/121
let isInitialRoute = true;
handleMiddlewares();

/**
 * When service-worker handles all navigation requests,
 * the same appshell is always served in which condition data should be fetched in client side.
 * When `empty-appshell` attribute detected on body, we know current html is appshell.
 */
let usingAppshell = document.body.hasAttribute('empty-appshell');
if (!usingAppshell && ssr) {
    app = new App();
    // In SSR client, fetching & mounting should be put in onReady callback.
    router.onReady(() => {
        /**
         * Add after router is ready because we should
         * avoid double-fetch the data already fetched in entry-server.
         */
        handleAsyncData();
        app.$mount('#app');
    });
} else {
    /**
     * Use async CSS in SPA to render skeleton faster.
     * https://github.com/lavas-project/lavas/issues/73
     *
     * You can disable this feature by set`skeleton.asyncCSS = false` in lavas.config.js.
     */
    let enableAsyncCSS = enableSkeleton && asyncCSS && cssExtract;
    window.mountLavas = () => {

        // https://huangxuan.me/2017/07/12/upgrading-eleme-to-pwa/#fast-skeleton-painting-with-settimeout-hack
        setTimeout(() => {
            let appRoot = document.querySelector('#app');
            if (appRoot) {
                appRoot.innerHTML = '';
            }
            // debugger;
            (async () => {
                //没有IndexedDB另说，暂时不管
                if (window.indexedDB) {
                    try {
                        //打开IndexedDB
                        let myDB = new MyDB("news", 1);
                        let db = await myDB.openDB();
                        let isFirst = false; //blog是否已经初始化数据
                        if (!db.objectStoreNames.contains("blog")) {
                            isFirst = true;
                            //新建表，并且第一次访问则肯定需要从仓库获取数据
                            let blogOStore = db.createObjectStore("blog", {
                                "keyPath": "id"
                            });
                            // 索引
                            blogOStore.createIndex("id", "id", {
                                unique: true
                            });
                            blogOStore.createIndex("updated_at", "updated_at", {
                                unique: false
                            });
                        }
                        //以上完成本地IndexedDB的检测与设置，则可设置indexedDB的state
                        app.$store.commit("common/setDBState", true);
                        if (!isFirst) {
                            app.$mount('#app');
                        }
                        let contents = await Axios("https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues");

                        if (contents && contents.data) {
                            contents = contents.data;
                        }

                        contents.forEach((value, index, array) => {
                            let method = isFirst ? "create" : "update",
                                content = Marked(value.body),
                                // html = jquery(content).html(),
                                text = jquery(content).text(),
                                desc = text.length > 120 ? text.substring(0, 120) + "..." : text;
                            myDB[method](["blog"], {
                                imgUrl: "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg",
                                desc,
                                content,
                                ...value
                            });
                        });
                        if (isFirst) {
                            app.$mount('#app');
                        }
                        // let contents = await myDB.getAll(["blog"]);
                        // if (!(contents && contents.length > 0)) {}
                    } catch (error) {
                        console.log(error);
                    }
                }
            })();
        }, 0 * 1000);
    };

    // Fetch data in client side.
    handleAsyncData();
    app = new App();


    // if style is ready, start mounting immediately
    if (ssr || !enableAsyncCSS ||
        (enableAsyncCSS && window.STYLE_READY)) {
        window.mountLavas();
    }
}

function handleMiddlewares() {
    router.beforeEach(async (to, from, next) => {
        // Avoid loop redirect with next(path)
        if (!isInitialRoute && to.path === from.path) {
            return next();
        }
        isInitialRoute = false;

        let matchedComponents = router.getMatchedComponents(to);

        // all + client + components middlewares
        let middlewareNames = [
            ...(middConf.all || []),
            ...(middConf.client || []),
            ...matchedComponents
            .filter(({
                middleware
            }) => !!middleware)
            .reduce((arr, {
                middleware
            }) => arr.concat(middleware), [])
        ];

        // get all the middlewares defined by user
        const middlewares = await getMiddlewares(middlewareNames);

        let unknowMiddleware = middlewareNames.find(name => typeof middlewares[name] !== 'function');
        if (unknowMiddleware) {
            throw new Error(`Unknown middleware ${unknowMiddleware}`);
        }

        let nextCalled = false;
        const nextRedirect = opts => {
            if (loading.finish) {
                loading.finish();
            }
            if (nextCalled) {
                return;
            }
            nextCalled = true;

            if (opts.external) {
                opts.query = stringify(opts.query);
                opts.path = opts.path + (opts.query ? '?' + opts.query : '');

                window.location.replace(opts.path);
                return next();
            }
            next(opts);
        };

        // create a new context for middleware, contains store, route etc.
        let contextInMiddleware = getClientContext({
            to,
            from,
            store,
            next: nextRedirect
        }, app);

        let matchedMiddlewares = middlewareNames.map(name => middlewares[name]);
        await execSeries(matchedMiddlewares, contextInMiddleware);

        if (!nextCalled) {
            next();
        }
    });
}

function handleAsyncData() {
    router.beforeResolve((to, from, next) => {
        let matched = router.getMatchedComponents(to);
        let prevMatched = router.getMatchedComponents(from);

        // [a, b]
        // [a, b, c, d]
        // => [c, d]
        let diffed = false;
        let activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));

        if (!activated.length) {
            return next();
        }

        loading.start();

        Promise.all(
                activated
                /**
                 * asyncData gets called in two conditions:
                 * 1. non keep-alive component everytime
                 * 2. keep-alive component only at first time(detected by asyncDataFetched flag)
                 */
                .filter(c => c.asyncData && (!c.asyncDataFetched || !to.meta.keepAlive))
                .map(async c => {
                    await c.asyncData({
                        store,
                        route: to
                    });
                    c.asyncDataFetched = true;
                })
            )
            .then(() => {
                loading.finish();
                next();
            })
            .catch(next);
    });
}
