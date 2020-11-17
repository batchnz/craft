/* eslint-disable no-unused-vars */
import "#css/app-base.css";
import "#css/app-components.css";
import "#css/app-utilities.css";
/* eslint-enable no-unused-vars */

const main = async () => {
  // Async load dependencies
  const { default: Vue } = await import(/* webpackChunkName: "vue" */ "vue");

  const { default: axios } = await import(
    /* webpackChunkName: "axios" */ "axios"
  );

  return {
    Vue,
    axios,
  };
};

// Execute async function
main().then((components) => {
  const { Vue, axios } = components;

  // Add a global instance of axios to Vue
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  Vue.prototype.$axios = axios;

  /* eslint-disable no-unused-vars */
  const vm = new Vue({
    el: "#app",
    components: {
      HelloWorld: () =>
        import(/* webpackChunkName: "HelloWorld" */ "#vue/HelloWorld.vue"),
    },
    mounted() {
      window.app.emit("vue-mounted");
    },
  });
  /* eslint-enable no-unused-vars */
});
