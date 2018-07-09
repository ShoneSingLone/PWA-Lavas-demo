export default function MyDB(dbname, version) {
    this.db = false;
    this.dbname = dbname;
    this.version = version;
}

/**
 * 
 * 
 * 
 */

function isIndexedDBOK() {
    return ("indexedDB" in window);
}

/**
 * 
 * @param tables 默认是数组，以后可能会考虑多个表的操作
 * @param filed 
 * @param value 
 */
MyDB.prototype.create = function (table, value) {
    let self = this;
    return new Promise((resolve, reject) => {
        console.log(("create"));
        //获取事务
        //默认为全部对象存储，事务类型为read
        let transaction = self.db.transaction([table], "readwrite");
        //请求objectStore,!! 目前就是一个
        let store = transaction.objectStore(table);
        //添加数据
        let request = store.add(value);
        request.onerror = function (e) {
            console.log("Error", e.target.error.name);
            //某个类型的错误处理器
            reject(e.target.error.name);
        }
        request.onsuccess = function (e) {
            resolve(e);
            console.log("Woot! Did it");
        }
    })
}
/**
 * 
 * @param {*} table 
 * @param {*} key 
 */
MyDB.prototype.retrieve = function (table, key) {
    let self = this;
    return new Promise((resolve, reject) => {
        let transaction = self.db.transaction([table], "readonly");
        let store = transaction.objectStore(table);
        let request = store.get(key);
        request.onsuccess = function (e) {
            let result = e.target.result;
            resolve(result);
        }
        request.onerror = function (e) {
            console.log("Error");
            reject(e);
        }
    })
}

/**
 * 
 * @param {*} table
 * @param {*} value 
 */

MyDB.prototype.update = function (table, value) {
    // put的时候如果带有keyPath就会更新，如果是add 已经存在的就会报错
    let self = this;
    return new Promise((resolve, reject) => {
        console.log("update");
        //获取事务
        //默认为全部对象存储，事务类型为read
        let transaction = self.db.transaction([table], "readwrite");
        //请求objectStore,!! 目前就是一个
        let store = transaction.objectStore(table);
        //添加数据
        let request = store.put(value);
        request.onerror = function (e) {
            console.log("Error", e.target.error.name);
            //某个类型的错误处理器
            reject(e.target.error.name);
        }
        request.onsuccess = function (e) {
            resolve(e);
        }
    })

}

MyDB.prototype.delete = function () {}
/**
 * 
 * @param {*} tableName 将查之表之名
 */
MyDB.prototype.getAll = function (tableName) {
    let self = this;
    return new Promise((resolve, reject) => {
        try {
            let contents = [];
            let transaction = self.db.transaction([tableName], "readonly");
            let table = transaction.objectStore(tableName);
            let cursor = table.openCursor();
            cursor.onsuccess = function (e) {
                let cursor = e.target.result;
                if (cursor) {
                    contents.push(cursor.value);
                    cursor.continue();
                }
            }
            transaction.oncomplete = function () {
                resolve(contents);
            }
        } catch (error) {
            reject(error);

        }
    });
}

MyDB.prototype.openDB = function () {
    let self = this;
    return new Promise((resolve, reject) => {
        let openRequest = indexedDB.open(self.dbname, self.version);

        openRequest.onupgradeneeded = function (e) {
            resolve(self.db = e.target.result);

        }

        openRequest.onsuccess = function (e) {
            console.log("openDB　onsuccess");
            resolve(self.db = e.target.result);

        }
        openRequest.onerror = function (error) {
            debugger;
            console.log("openDB　onerror");
            reject(error);
        }
    });
}
