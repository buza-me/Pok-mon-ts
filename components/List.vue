<template>
    <div class="container">
        <form>
            <input type="radio" id="one" value="tile" name="layout" v-model="layout">
            <label for="one" :class="{'active': layout === 'tile'}">tile</label>
            <input type="radio" id="two" value="list" name="layout" v-model="layout">
            <label for="two" :class="{'active': layout === 'list'}">list</label>
        </form>
        <ul :class="layout">
            <li v-for="pokemonDataObject in arrayOfPokemonData" :key="pokemonDataObject.id">
                <figure>
                    <nuxt-link :to="`/pokemons/${pokemonDataObject.name}`" class="image-container">
                        <img 
                            :src="pokemonDataObject.sprites.front_default" 
                            alt="poke" 
                            @error="pokemonDataObject.sprites.back_default = null"
                            v-if="pokemonDataObject.sprites.back_default"
                        >
                        <img 
                            :src="pokemonDataObject.sprites.back_default" 
                            alt="poke" 
                            @error="pokemonDataObject.sprites.back_default = null"
                            v-if="pokemonDataObject.sprites.back_default"
                        >
                        <img 
                            src="~/assets/images/pokeball.png" 
                            alt="poke" 
                            v-if="!pokemonDataObject.sprites.back_default"
                        >
                        <img 
                            src="~/assets/images/pokeball.png" 
                            alt="poke" 
                            v-if="!pokemonDataObject.sprites.back_default"
                        >
                    </nuxt-link>
                    <caption>
                        <span>{{pokemonDataObject.name}}</span>
                        <nuxt-link :to="`/pokemons/${pokemonDataObject.name}`">see more info</nuxt-link>
                    </caption>
                </figure>
                <dl>
                    <dt>base experience:</dt>
                        <dd>{{pokemonDataObject.base_experience}}</dd>
                    <dt>height:</dt>
                        <dd>{{pokemonDataObject.height}}</dd>
                    <dt>weight:</dt>
                        <dd>{{pokemonDataObject.weight}}</dd>
                    <dt>order:</dt>
                        <dd>{{pokemonDataObject.order}}</dd>
                </dl>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class List extends Vue {

    @Prop() arrayOfPokemonData!: any[];

    layout: string | null = 'tile';

    beforeMount() {
        if (window) {
            this.layout = localStorage.getItem('layout') ? localStorage.getItem('layout') : 'tile';
        }
    }

    beforeDestroy() {
        localStorage.setItem('layout', this.layout!);
    }
}
</script>

<style scoped>
    .loader-active-element {
        width: 1rem;
        height: 1rem;
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
        width: .5rem;
        height: .5rem;
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
    form {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: end;
        grid-column-gap: .25rem;
    }
    input {
        display: none;
    }
    label {
        font-size: 1.2rem;
        display: inline-block;
        padding: .5rem 1.5rem;
        border-radius: 3px;
        background: rgba(255, 255, 255, .4);
        cursor: pointer;
        transition: .15s;
    }
    label:hover {
        background: rgba(255, 255, 255, .6);
    }
    label.active {
        background: rgba(255, 255, 255, .7);
    }
    ul {
        padding: 1rem 0;
        display: grid;
        grid-gap: 1rem 1rem;
    }
    ul.list {
        grid-template-columns: auto;
        justify-content: center;
    }
    ul.tile {
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
    li {
        background: rgba(255, 255, 255, .5);
        border-radius: 3px;
        display: grid;
        grid-template-columns: auto auto;
        justify-content: start;
    }
    figure {
        background: rgba(255, 255, 255, .3);
        padding: 1rem;
        border-radius: 3px;
        perspective: 1000px;
    }
    .image-container {
        min-height: 6rem;
        min-width: 6rem;
        position: relative;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }
    figure:hover .image-container {
        transform: rotateY(180deg);
    }
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        background: rgba(255, 255, 255, .5);
        border-radius: 3px;
        backface-visibility: hidden;
        max-width: 96px;
    }
    img:last-child {
        transform: translate(-50%, -50%) rotateY(180deg);
    }
    caption {
        text-align: center;
        display: grid;
        grid-template-areas: 1fr;
        grid-gap: .5rem .5rem;
        word-break: break-all;
        text-transform: capitalize;
    }
    caption a {
        color: #ffffff;
        text-transform: none;
        font-weight: 600;
        font-size: .8rem;
    }
    caption span {
        text-transform: capitalize;
        font-weight: 600;
        color: #555555
    }
    dl {
        padding: 1rem;
    }
    dt {
        font-weight: 600;
    }
    ul.list li {
        grid-template-columns: 15rem auto;
        justify-content: center;
        padding: 0 1rem 0 0;
    }
    ul.list figure {
        display: grid;
        grid-template-columns: auto auto;
    }
    ul.list caption {
        align-content: center;
    }
    ul.list dl {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 2rem;
        grid-row-gap: .5rem;
        align-content: center;
    }
    ul.list dd {
        grid-row: 2 / 3;
    }
    ul.tile li {
        grid-template-columns: 9rem auto;
    }
    ul.tile figure {
        display: grid;
        justify-items: center;
    }
    @media screen and (max-width: 600px) {
        form {
            display: none;
        }
        ul.list {
            grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        }
        ul.list li {
            background: rgba(255, 255, 255, .5);
            border-radius: 3px;
            display: grid;
            grid-template-columns: auto auto;
            justify-content: start;
        }
        ul.list figure {
            background: rgba(255, 255, 255, .3);
            padding: 1rem;
            border-radius: 3px;
            perspective: 1000px;
        }
        ul.list caption {
            text-align: center;
            display: grid;
            grid-template-areas: 1fr;
            grid-gap: .5rem .5rem;
            word-break: break-all;
            text-transform: capitalize;
        }
        ul.list dl {
            padding: 1rem;
        }
    }
</style>

