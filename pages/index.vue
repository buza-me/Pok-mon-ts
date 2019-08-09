<template>
    <div class="container">
        <pagination></pagination>
        <list :array-of-pokemon-data="arrayOfPokemonData"></list>
    </div>
</template>

<script lang="ts">
import { Getter, Action, namespace } from 'vuex-class';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Pagination from '@/components/Pagination.vue';
import List from '@/components/List.vue';

@Component({
    components: {
        Pagination,
        List,
    },
    async fetch({ store }): Promise<any> {
        store.commit('pagination/setOffset', 0);
        store.commit('pagination/setLimit', 10);
        store.commit('pagination/updateUrl');
        
        let {count, results} = await fetch(store.getters['pagination/url']).then(response => response.json()).catch(console.error);
        results = results.map(item => fetch(item.url).then(response => response.json()).catch(console.error));

        store.commit('pagination/setItemCount', count);
        store.commit('data/setArrayOfPokemonData', await Promise.all(results));
    }
})

export default class MainPage extends Vue {
    
    @Getter('pagination/url') url
    @Getter('data/arrayOfPokemonData') arrayOfPokemonData
    @Action('data/fetchArrayOfPokemonData') fetchArrayOfPokemonData
    
    @Watch('url')
    async onUrlChange(): Promise<any> {
        await this.fetchArrayOfPokemonData(this.url);
    }
}
</script>

<style scoped>
    
</style>

