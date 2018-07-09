// import Lockr from 'lockr';
// import Dexie from 'dexie';
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




const SET_BLOG = 'setBlog';
const GET_BLOG = 'getBlog';

export const state = () => {
    return {
        /**
         * 登录状态
         *
         * @type {array}
         */
        list: []
    };
};

export const getters = {
    hasBlog: state => {
        return state.hasBlog;
    },
    list: state => {
        return state.list
    },
    article: (state) => (id) => {
        let result;
        if (!(state.list && state.list.length > 0)) {


        }
        result = state.list.find(blog => id === blog.id);
        return result;
    }
};


export const mutations = {
    [SET_BLOG](state, contents) {
        state.list = contents;
    }
};





/**
 * 将收到的数据处理成符合要求的结构 
 * 
 * @param {any} myDB  MyDB
 * @param {any} contents 
 */
function updateIndexedDBData(myDB, table, contents, isfirst) {
    console.log("window.jquery", window.jquery);

    contents.forEach((value, index, array) => {
        let method = isfirst ? "create" : "update",
            content = Marked(value.body),
            // html = jquery(content).html(),
            text = jquery(content).text(),
            desc = text.length > 120 ? text.substring(0, 120) + "..." : text;
        myDB[method]([table], {
            imgUrl: "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg",
            desc,
            content,
            ...value
        });
    });
}

/**
 * 
 * 
 * 
 */
function isIndexedDBOK() {
    return ("indexedDB" in window);
}

function setBlogIntoIndexedDB(contents) {
    console.log("setBlogIntoIndexedDB");
    //这一段可以改成Rx：当IndexedDB数据变化自动更新state（挖坑）
    // commit(SET_BLOG, result.data);
}

export const actions = {
    [SET_BLOG]({
        commit
    }) {
        console.time("blog/SET_BLOG");

        let blogs = [];
        // 检查indexedDB是否可用 
        if (isIndexedDBOK()) {
            // 可用就直接已存储结果
            let myDB = new MyDB("news", 1);
            myDB.openDB()
                .then(db => {
                    if (db.objectStoreNames.contains("blog")) {
                        // 从IndexedDB中取出数据
                        myDB.getAll(["blog"])
                            .then(localDAta => {
                                commit(SET_BLOG, localDAta);
                            });
                    } else {
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
                    return getBlogFromRemote();
                }).then(contents => {
                    //无论如何都要更新
                    updateIndexedDBData(myDB, "blog", contents);
                    myDB.getAll(["blog"])
                        .then(localDAta => {
                            commit(SET_BLOG, localDAta);
                        });

                }).catch(error => {
                    console.log(error);
                });
        }
    },
    // 该方法主要供服务端接口验证使用
    async validLogin({
        commit
    }) {

        // 可以给服务端发请求，验证用户的登录状态，此处模拟未登录
        let login = await new Promise(resolve => {
            setTimeout(() => {
                resolve(false);
            }, 1000);
        });

        // 并设置 store 中的登录状态
        commit(SET_BLOG, login);
    }
};
