<template>
  <div>
    <div class="content">
      <div>
        <!--         <h1>HeHe</h1>
        <h2>LAVAS</h2>
        <h4>[ˈlɑ:vəz]</h4>
 -->
        <ul v-if="list.length>0">
          <li v-for="(item, index) in list" :key="id">
            {{item}}asdfasdf
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

function setState(store) {
  store.dispatch("appShell/appHeader/setAppHeader", {
    show: true,
    title: "Lavas",
    showMenu: true,
    showBack: false,
    showLogo: false,
    actions: [
      {
        icon: "search",
        route: "/search"
      }
    ]
  });
}

export default {
  name: "index",
  data: function() {
    return {
      list: []
    };
  },
  metaInfo: {
    title: "News",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "lavas PWA" },
      {
        name: "description",
        content:
          "基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题"
      }
    ]
  },
  async asyncData({ store, route }) {
    let result = await axios(``);
    // console.log((this.list = result.data));
    this.list = result.data;
    console.log(this.list.length);
    // debugger;
    setState(store);
  },
  activated() {
    setState(this.$store);
  }
};
</script>

<style lang="stylus" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;

  h2 {
    font-size: 46px;
    font-weight: 500;
  }
}
</style>
