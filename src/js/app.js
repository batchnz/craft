import styles from '../css/app.css';

// App main
const main = async () => {
    // Import our CSS
    //const Styles = await import(/* webpackChunkName: "styles" */ '../css/app.css');
    // Async load the vue module
    const Vue = await import(/* webpackChunkName: "vue" */ 'vue');
    // Create our vue instance
    const vm = new Vue.default({
        el: "#app",
        components: {
            'confetti': () => import(/* webpackChunkName: "confetti" */ '../vue/Confetti.vue'),
        },
        data: {
        },
        methods: {
        },
        mounted() {
        },
    });
};
// Execute async function
main().then( (value) => {
});
