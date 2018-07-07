// import Lockr from 'lockr';
// import Dexie from 'dexie';
import Axios from 'axios';
import MyDB from "../modules/common/db";

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
    }
};


export const mutations = {
    [SET_BLOG](state, contents) {
        state.list = contents;
    }
};




function getBlogFromRemote() {
    return new Promise((resolve, reject) => {
        // 更新数据
        Axios(
            "https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues"
        ).then(result => {
            console.timeEnd("blog/SET_BLOG");
            if (result && result.data) {
                resolve(result.data);
            } else {
                throw new Error(result);
            }
        }).catch(error => {
            reject(error);
        });

    })
}

function getBlogFromIndexedDB() {
    return new Promise((resolve, reject) => {
        try {
            let blogs = [];
            console.log("getBlogFromIndexedDB")
            // 检查indexedDB是否可用 
            if (isIndexedDBOK()) {
                // 可用就直接已存储结果
                let mainDB;
                let myDB = new MyDB("news", 1);
                myDB.openDB()
                    .then(db => {
                        mainDB = db;
                        if (mainDB.objectStoreNames.contains("blog")) {
                            // 已存在则直接获取
                            resolve(myDB.getAll(["blog"]));
                        } else {
                            //新建表，并且第一次访问则肯定需要从仓库获取数据
                            let blogOStore = mainDB.createObjectStore("blog", {
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
                    }).catch(error => {
                        console.log(error);
                    })
            } else {
                /* 
                                // 不可用就拉取信息
                                getBlogFromRemote().then(contents => {
                                    resolve(contents);
                                })
                             */
            };
            // 如果没有就需要直接将获取的内容返回
        } catch (error) {
            reject(error);
        }
    })
}
/**
 * 将收到的数据处理成符合要求的结构 
 * 
 * @param {any} db  MyDB
 * @param {any} contents 
 */
function whateverToData(db, contents) {
    contents.forEach((value, index, array) => {
        db.update(["blog"], {
            imgUrl: "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg",
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
        // 从IndexedDB中取出数据
        getBlogFromIndexedDB().then(localDAta => {
            commit(SET_BLOG, localDAta);
        });
        //无论如何都要更新
        /* 
         getBlogFromRemote().then(contents => {
             console.log(contents);
             contents = whateverToData(myDB, contents);
             resolve(contents);
         }).catch(error => {
             console.log(error);
         });
          */
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
