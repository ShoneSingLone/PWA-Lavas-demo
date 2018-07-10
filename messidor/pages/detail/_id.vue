<template>
  <div class="detail-wrapper">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <article class="detail-content">
          <div v-html="blogDetail.content"></div>
        </article>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

let blogDetail = { title: "detail", desc: "desc" };

function setState(store, state) {
  store.dispatch("appShell/appHeader/setAppHeader", state);
}

export default {
  name: "detailId",
  metaInfo() {
    return {
      title: blogDetail.title,
      titleTemplate: "%s-正文",
      meta: [
        { name: "keywords", content: blogDetail.desc },
        {
          name: "description",
          content:
            "基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题"
        }
      ]
    };
  },
  data() {
    return {
      blogDetail
    };
  },
  methods: {
    ...mapActions("appShell/appHeader", ["setAppHeader"])
  },
  async asyncData({ store, route }) {
    blogDetail = await window.myDB.retrieve("blog", route.params.id);
    // await console.log("blogDetail", blogDetail);
    await setState(store, {
      show: true,
      title: blogDetail.title,
      showMenu: false,
      showBack: true,
      showLogo: true,
      actions: [
        {
          icon: "home",
          route: {
            name: "index"
          }
        }
      ]
    });

    // await console.log("_id.vue-asyncData");
  },
  computed: {},
  created() {
    // console.log("_id.vue-created");
    // console.dir(this);
  },
  activated() {
    // console.log("_id.vue-activated");
    this.setAppHeader(this.state.appHeaderState);
  },
  deactivated() {
    // console.log("_id.vue-deactivated");
    this.setAppHeader(this.state.appHeaderState);
  }
};
</script>

<style lang="scss" >
// scoped 对【v-html生成的内容的样式生效】很不友好
.detail-content {
  font-size: 16px;
  line-height: 30px;
  margin-top: 30px;

  p {
    text-align: left;
    text-indent: 2em;
    // outline: 4px solid cyan;
  }
}
</style>
