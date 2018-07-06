<template>
  <div class="detail-wrapper">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <article class="detail-content text-xs-center">
          <header class="detail-title text-xs-center">
            Detail {{$route.params.id}}
          </header>
          <a @click="routerClick"> Detail {{Number($route.params.id) + 1}} </a>
          <p>
            Progressive Web Apps are user experiences that have the reach of the web, and are: Reliable - Load instantly and never show the downasaur, even in uncertain network conditions. Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
          </p>
          <p>
            Progressive Web Apps are user experiences that have the reach of the web, and are: Reliable - Load instantly and never show the downasaur, even in uncertain network conditions. Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
          </p>
          <p>
            Progressive Web Apps are user experiences that have the reach of the web, and are: Reliable - Load instantly and never show the downasaur, even in uncertain network conditions. Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
          </p>
          <p>
            Progressive Web Apps are user experiences that have the reach of the web, and are: Reliable - Load instantly and never show the downasaur, even in uncertain network conditions. Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
          </p>
          <p>
            Progressive Web Apps are user experiences that have the reach of the web, and are: Reliable - Load instantly and never show the downasaur, even in uncertain network conditions. Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
          </p>
        </article>
      </v-flex>
    </v-layout
>  </div>
</template>

<script>
import axios from "axios";
import mapState from "vuex";

let state = {
  appHeaderState: {
    show: true,
    title: "Lavas",
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
};

function setState(store) {
  store.dispatch("appShell/appHeader/setAppHeader", state.appHeaderState);
}

export default {
  name: "detailId",
  metaInfo() {
    return {
      title: `Detail ${this.$route.params.id}`,
      titleTemplate: "%s - Lavas",
      meta: [
        { name: "keywords", content: "lavas PWA" },
        {
          name: "description",
          content:
            "基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题"
        }
      ]
    };
  },
  methods: {
    routerClick() {
      let id = this.$route.params.id;
      id = Number(id) + 1;
      console.log("this.$route.params.id", id);
      console.log(this.$route);
      this.$router.push({ name: "detailId", params: { id } });
    }
  },
  async asyncData({ store, route }) {
    console.log(
      'store.getters["detail/weather"]',
      store.getters["detail/weather"]
    );
    await store.dispatch("detail/setWeather", { woeid: 2151849 });
  },
  computed: {
    weather() {
      debugger;
      console.log("fasdfasdf", this.$store.getters["detail/weather"]);
      return this.$store.getters["detail/weather"];
    }
  },
  // created() {
  //   console.dir(this);
  //   debugger;
  //   console.log(
  //     `Weather of Shanghai: ${this.weather.text}, ${this.weather.temp}°F`
  //   );
  // },
  activated() {
    debugger;
    setState(this.$store);
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
