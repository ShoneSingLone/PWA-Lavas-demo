<!-- login.vue -->
<template>
  <div>
    <router-link to="/">
      <h2>LAVAS</h2>
    </router-link>
    <button @click="login">点击{{tips}}</button>
    <div class="tips">
      {{loginState}}
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    login() {
      // 如果未登录，设置登录成功
      let vueLogin = this,
        isLogin = this.$store.state.common.login,
        toggle = isLogin ? false : true;
      // 修改 store 中的登录状态为 true
      vueLogin.$store.dispatch("common/setLogin", toggle).then(result => {
        /* 
        let message = isLogin ? "tips：登录成功" : "tips：未登录";
        vueLogin.tips = message;
       */
      });
      // 如果登录显示已登录
    }
  },
  computed: {
    tips: function() {
      return this.$store.getters["common/login"] ? "LOGOUT" : "LOGIN";
    },
    loginState: function() {
      return this.$store.getters["common/login"];
    }
  }
};
</script>

<style lang="stylus" scoped>
h2 {
  margin-top: 70%;
  font-size: 46px;
  font-weight: 500;
  cursor: pointer;
}

button {
  width: 100px;
  height: 45px;
  border: solid 1px #ccc;
  background: #eee;
  cursor: pointer;
}

.tips {
  margin-top: 10px;
  color: #666;
  font-size: 12px;
}
</style>