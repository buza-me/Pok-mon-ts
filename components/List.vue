<template>
    <div class="container">
        <form>
            <input type="radio" id="one" value="tile" name="layout" v-model="layout">
            <label for="one" :class="{'active': layout === 'tile'}">tile</label>
            <input type="radio" id="two" value="list" name="layout" v-model="layout">
            <label for="two" :class="{'active': layout === 'list'}">list</label>
        </form>
        <ul :class="layout">
           <no-ssr>
                <li v-for="pokemonDataObject in arrayOfPokemonData" :key="pokemonDataObject.id">
                    <figure>
                        <nuxt-link :to="`/pokemons/${pokemonDataObject.name}`" class="image-container">
                            <img :src="pokemonDataObject.sprites.front_default" alt="poke">
                            <img :src="pokemonDataObject.sprites.back_default" alt="poke">
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
           </no-ssr>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class List extends Vue {
    @Prop() arrayOfPokemonData!: any[];

    layout: string ='tile';
}
</script>

<style scoped>
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
        grid-template-columns: 1fr;
    }
    ul.tile {
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
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
        background: #f3f3f3;
        border-radius: 3px;
        backface-visibility: hidden;
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
        text-decoration: underline;
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

