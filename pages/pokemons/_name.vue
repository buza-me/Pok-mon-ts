<template>
    <div class="container">
        <div class="card">
            <div class="figure-container">
                <figure>
                    <div class="image-container">
                        <img :src="pokemonDataObject.sprites.front_default" alt="poke">
                        <img :src="pokemonDataObject.sprites.back_default" alt="poke">
                    </div>
                    <caption>
                        <span>{{pokemonDataObject.name}}</span>
                    </caption>
                </figure>
                <nuxt-link to="/">Go to main page</nuxt-link>
            </div>
            <div class="stats">
                <ul>
                    <li>
                        <p>stats:</p>
                        <ul class="sublist">
                            <li v-for="statsObject in pokemonDataObject.stats" :key="statsObject.stat.name">
                                <p>{{statsObject.stat.name}}: {{statsObject.base_stat}}</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>types:</p>
                        <ul class="sublist">
                            <li v-for="typesObject in pokemonDataObject.types" :key="typesObject.type.name">
                                {{typesObject.type.name}}, slot {{typesObject.slot}}
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>abilities:</p>
                        <ul class="sublist">
                            <li v-for="abilityObject in abilities" :key="abilityObject.name">
                                <p>{{abilityObject.name}}:</p>
                                <ul class="sublist">
                                    <li v-for="effectObject in abilityObject.effect_entries" :key="effectObject.effect" class="no-bullet">
                                        {{effectObject.effect}}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>base experience: {{pokemonDataObject.base_experience}}</p>
                    </li>
                    <li>
                        <p>height: {{pokemonDataObject.height}}</p>
                    </li>
                    <li>
                        <p>order: {{pokemonDataObject.order}}</p>
                    </li>
                    <li>
                        <p>weight: {{pokemonDataObject.weight}}</p>
                    </li>  
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component({
        async asyncData({ params: { name } }): Promise<any> {
            const pokemonDataObject = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => response.json()).catch(console.error);
            let abilities = pokemonDataObject.abilities.map(({ ability }) => fetch(ability.url).then(response => response.json()).catch(console.error));
            abilities = await Promise.all(abilities);
            return {
                pokemonDataObject,
                abilities,
            }
        },
    })

    export default class PokemonPage extends Vue {

    }
</script>

<style scoped>
    .container {
        padding-top: 4rem;
        display: grid;
        place-content: center center;
    }
    .card {
        background: rgba(255, 255, 255, .5);
        border-radius: 3px;
        display: grid;
        grid-template-columns: 1fr;
        justify-content: start;
        max-width: 35vw;
    }
    .figure-container {
        display: grid;
        place-content: center center;
        padding: 1rem 0;
        position: relative;
        background: rgba(255, 255, 255, .3);
    }
    figure {
        background: rgba(255, 255, 255, .5);
        padding: 1rem;
        border-radius: 3px;
        display: grid;
        justify-content: center;
        align-content: start;
        position: relative;
        perspective: 1000px;
        min-height: 6rem;
        min-width: 9rem;
    }
    caption {
        font-weight: 600;
        text-transform: capitalize;
    }
    .image-container {
        min-height: 6rem;
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
        border-radius: 3px;
        backface-visibility: hidden;
    }
    img:last-child {
        transform: translate(-50%, -50%) rotateY(180deg);
    }
    .stats {
        padding: 2rem;
        position: relative;
        min-width: 10rem;
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 3rem;
    }
    a {
        color: #ffffff;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(-110%);
        display: block;
        background: rgba(255, 255, 255, .3);
        border-radius: 3px;
        padding: .25rem 1rem;
        text-transform: none;
        font-weight: 600;
    }
    a:hover {
        background: rgba(255, 255, 255, .5);
    }
    li {
        list-style-type: none;
        font-weight: 600;
    }
    .sublist {
        padding-left: 1.25rem;
    }
    .no-bullet {
        list-style-type: none;
        position: relative;
    }
    .no-bullet::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        border-radius: 50%;
        height: 100%;
        background: #5e5e5e;
        transform: translateX(-1rem);

    }
    @media screen and (max-width: 1605px) {
        .card {
            max-width: 45vw;
        }
    }
    @media screen and (max-width: 1405px) {
        .card {
            max-width: 50vw;
        }
    }
    @media screen and (max-width: 1205px) {
        .card {
            max-width: 60vw;
        }
    }
    @media screen and (max-width: 1050px) {
        .card {
            max-width: 70vw;
        }
    }
    @media screen and (max-width: 805px) {
        .card {
            max-width: 80vw;
        }
    }
    @media screen and (max-width: 600px) {
        .stats {
            padding: 1rem 0rem;
            padding: 1rem;
            grid-column-gap: 1.5rem;
            font-size: .8rem;
        }
        .container {
            place-items: center center;
        }
        .card {
            max-width: 90vw;
        }
        .stats {
            grid-template-columns: 1fr;
        }
        .stats ul:last-child {
            grid-row: 1 / 2;
        }
    }
</style>