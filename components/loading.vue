<template>
    <div class="loader-container" v-show="loading">
        <div class="loader-active-element">
            <div class="loader-active-sub-element"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class Loader extends Vue {

        loading: boolean = false;

        start() {
            this.loading = true;
        }
        finish() {
            this.loading= false;
        }
    }

</script>

<style scoped>
    .loader-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, .6);
        z-index: 3;
        display: grid;
        place-content: center center;
    }
    .loader-active-element {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, .8);
        box-shadow: 0 0 1rem rgba(0, 0, 0, .8);
        animation-name: move-horizontal;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        display: grid;
        place-content: center center;
    }
    .loader-active-sub-element {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, .8);
        box-shadow: 0 0 1rem rgba(0, 0, 0, .8);
        animation-name: move-diagonal;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in;
    }
    @keyframes move-horizontal {
        0% {transform: translateX(-200%)}
        50% {transform: translateX(200%)}
        100% {transform: translateX(-200%)}
    }
    @keyframes move-diagonal {
        0% {transform: translate(-300%, -100%)}
        50% {transform: translate(300%, 100%)}
        100% {transform: translate(-300%, -100%)}
    }
</style>