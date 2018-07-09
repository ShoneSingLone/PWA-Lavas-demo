const SET_LOGIN = 'setLogin',
    SET_DBSTATE = 'setDBState' //;

export const state = () => {
    return {
        /**
         * 登录状态
         *
         * @type {boolean}
         */
        login: false,
        /**
         * IndexedDB可用状态
         * 表示可以订阅相关的状态
         *
         * @type {boolean}
         */
        isDB_OK: false
    };
};

export const getters = {
    login: state => {
        return state.login;
    },
    isDB_OK: state => {
        return state.isDB_OK;
    }
};

export const mutations = {
    [SET_LOGIN](state, isLogin) {
        state.login = isLogin;
    },
    [SET_DBSTATE](state, isOK) {
        state.login = isOK;
    }
};

export const actions = {
    [SET_LOGIN]({
        commit
    }, isLogin) {
        console.time("common/set_login");
        setTimeout(() => {
            console.timeEnd("common/set_login");
            commit(SET_LOGIN, isLogin);
        }, 500);
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
        commit(SET_LOGIN, login);
    }
};
