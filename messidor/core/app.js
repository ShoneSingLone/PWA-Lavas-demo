/**
 * @file entry
 * @author ShoneSingLone(ShoneSingLone@gmail.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import {
    createRouter
} from '@/.lavas/router';
import {
    createStore
} from '@/.lavas/store';
import AppComponent from './App.vue';
import {
    Vuetify,
    VApp,
    VBtn,
    VIcon,
    VGrid //{ VContainer, VContent, VFlex, VLayout, VSpacer }
} from 'vuetify';
// import Vuetify from 'vuetify';

Vue.use(Meta); //对header信息title meta进行修改

// Vue.use(Vuetify);
// 按需加载
Vue.use(Vuetify, {
    components: {
        VApp,
        VBtn,
        VIcon,
        ...VGrid
    }
});

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {
        App,
        router,
        store
    };
}

if (module.hot) {
    module.hot.accept();
}
