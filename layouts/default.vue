<template>
    <div id="layout">
        <header>
            <h1><nuxt-link to="/">PokéPedia</nuxt-link></h1>
            <form @submit.prevent="search()">
                <input type="text" v-model="name" placeholder="pokemon name...">
                <input type="submit" value="search!" >
            </form>
        </header>
        <main>
            <nuxt/>
        </main>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MainLayout extends Vue {
    
    name: string = '';

    search(): void {
        if (this.name.length) {
            this.$router.push({ path: `/pokemons/${this.name.toLowerCase()}` });
        }
        this.name = '';
    };
    mounted() {
        window.onbeforeunload = () => {
            localStorage.removeItem('limit');
            localStorage.removeItem('page');
        }
    }
}
</script>


<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style-type: none;
        text-decoration: none;
    }
    html {
        font-size: 16px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: #424242;
    }
    body {
        background-image: linear-gradient(to left bottom, #1c9dff, #4376d4, #4d50a7, #4a2b79, #3e004c);
        min-height: 100vh;
    }
    main {
        padding: 0 2rem;
    }
    header {
        background-image: linear-gradient(to top, #fd4727, #fe5436, #fe6144, #fe6c52, #fd775f);
        padding: 1rem 0;
        text-align: center;
    }
    header h1 a {
        color: #fff45c;
        font-size: 2.5rem;
        transition: .15s;
        text-shadow: 0px 0px 5px #2b2b2b;
        font-family: 'Carter One', cursive;
    }
    header h1 a:hover {
        color: #ffce2f;
    }
    input {
        padding: .5rem 1rem;
        border: none;
        border-radius: 3px;
        font-size: 1rem;
    }
    input[type="submit"] {
        padding: .5rem 1rem;
        border: none;
        border-radius: 3px;
        font-size: 1rem;
        background: rgba(255, 255, 255, .7);
        color: inherit;
        transition: .15s;
    }
    input[type="submit"]:hover {
        background: rgba(255, 255, 255, .9);
    }
    @media screen and (max-width: 600px) {
        main {
            padding: .5rem;
        }
        html {
            font-size: 15px;
        }
    }
</style>