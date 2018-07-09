<template>
  <v-app light>
    <v-content>
      <v-container>
        <v-layout row wrap align-center>
          <v-flex xs12 md6 offset-md3>
            <div v-for="blog in blogList" :key="blog.title">
              <v-card class="my-3" hover>
                <v-card-media class="white--text" height="170px" :src="blog.imgUrl">
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                        <span class="headline">{{ blog.title }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-text>
                  {{ blog.desc }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat class="blue--text" @click="readMore(blog.id)">Read More</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by
            <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

function setState(store) {
  store.dispatch("appShell/appHeader/setAppHeader", {
    show: true,
    title: "News",
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
  data() {
    return {
      title: "Your Logo",
      posts: [
        {
          title: "Fusce ullamcorper tellus",
          content:
            "Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna.",
          imgUrl:
            "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg"
        },
        {
          title: "Donec vitae suscipit lectus, a luctus diam.",
          content:
            "Donec vitae suscipit lectus, a luctus diam. Proin vitae felis gravida, lobortis massa sit amet, efficitur erat. Morbi vel ultrices nisi."
        },
        {
          title: "Vestibulum condimentum quam",
          content:
            "At sagittis sapien vulputate. Vivamus laoreet lacus id magna rutrum dapibus. Donec vel pellentesque arcu. Maecenas mollis odio tempus felis elementum commodo.",
          imgUrl:
            "https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/plane.jpg"
        }
      ]
    };
  },
  metaInfo: {
    title: "News",
    titleTemplate: "%s",
    meta: [
      { name: "keywords", content: "FrontEnd News" },
      {
        name: "description",
        content:
          "基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题"
      }
    ]
  },
  created() {
    // debugger;
    console.log(this.blogList);
  },
  methods: {
    readMore(id) {
      this.$router.push({ name: "detailId", params: { id } });
    }
  },
  computed: {
    blogList: function() {
      return this.$store.getters["blog/list"];
    }
  },
  async asyncData({ store, route }) {
    setState(store);
  },
  activated() {
    debugger;
    console.log(this.$store);
    setState(this.$store);
  },
  deactivated() {
    console.log(this.$store);
    debugger;
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
