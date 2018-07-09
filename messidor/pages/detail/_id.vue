<template>
  <div class="detail-wrapper">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <article class="detail-content text-xs-center" v-if="article">
          <div v-html="article.content"></div>
        </article>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "detailId",
  metaInfo() {
    this.article = this.$route.params.blog;
    if (!this.article) {
      this.article = this.$store.getters["blog/article"](this.$route.params.id);
    }
    return {
      title: this.article.title,
      titleTemplate: "%s-正文",
      meta: [
        { name: "keywords", content: this.article.desc },
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
      article: "",
      state: {
        appHeaderState: {
          show: true,
          title: "detail",
          showMenu: true,
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
        }
      }
    };
  },
  methods: {
    ...mapActions("appShell/appHeader", ["setAppHeader"])
  },
  async asyncData({ store, route }) {
    // await store.dispatch("detail/setWeather", { woeid: 2151849 });
  },
  computed: {},
  created() {
    console.dir(this);
    this.setAppHeader(this.state.appHeaderState);
  },
  activated() {
    debugge;
    this.setAppHeader(this.state.appHeaderState);
  },
  deactivated() {
    debugge;
    this.setAppHeader(this.state.appHeaderState);
  }
};
</script>

<style lang="stylus" scoped>
.detail-content {
  font-size: 16px;
  line-height: 30px;
  margin-top: 30px;

  .detail-title {
    margin-bottom: 20px;
    padding: 10px 0;
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
