import styles from "../css/app.css";
const hi = 'hi'
const main = async () => {

  // Async load dependencies
  const {default: Vue} = await import(/* webpackChunkName: "vue" */ "vue");
  const {default: axios} = await import(/* webpackChunkName: "axios" */ "axios");

  return {
    Vue,
    axios
  };
};

// Execute async function
main().then(components => {

  const { Vue, axios } = components;

  // Add a global instance of axios to Vue
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  Vue.prototype.$axios = axios

  // Create our vue instance
  const vm = new Vue({
    el: "#app"
  })
});
