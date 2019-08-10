<template>
    <div class="container">
        <pagination
            :itemCount="itemCount"
            :currentPage="page"
            :offset="offset"
            :limit="limit"
        ></pagination>
        <list :array-of-pokemon-data="arrayOfPokemonData"></list>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Pagination from '@/components/Pagination.vue';
import List from '@/components/List.vue';

@Component({
    components: {
        Pagination,
        List,
    },
})

export default class MainPage extends Vue {

    arrayOfPokemonData: any[] = [];
    itemCount: number | null = null;
    baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

    @Watch('url')
    handleUrlChanges() {
        this.fetchArrayOfPokemonData(this.url);
        localStorage.setItem('limit', `${this.limit}`);
        localStorage.setItem('page', `${this.page}`);
    }

    async beforeMount() {

        const { count } = await fetch(this.url)
            .then(response => response.json())
            .catch(console.error);
        this.itemCount = count;

        if (!this.limit || !this.page) {

            let limitFromStorage,
                pageFromStorage;
            
            limitFromStorage = localStorage.getItem('limit') ? +localStorage.getItem('limit')! : null;
            pageFromStorage = localStorage.getItem('page') ? +localStorage.getItem('page')! : null;

            this.$router.push({
                path: '/',
                query: {
                    limit: `${this.limit || limitFromStorage || 10}`,
                    page: `${this.page || pageFromStorage || 1}`,
                },
            });

        } else if (
            this.page > this.itemCount! / this.limit ||
            this.page < 1 ||
            this.limit % 10 !== 0 ||
            this.limit < 10 ||
            this.limit > 30
        ) {
            this.$router.push('/error');
        };
    }

    async mounted() {
        this.fetchArrayOfPokemonData(this.url);
    }
    
    async fetchArrayOfPokemonData(url: string): Promise<any> {
        
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        });

        let { results } = await fetch(url)
            .then(response => response.json())
            .catch(console.error);

        results = results.map((item) => fetch(item.url)
            .then(response => response.json())
            .catch(console.error));

        this.arrayOfPokemonData = await Promise.all(results);

        this.$nuxt.$loading.finish();
    }

    get url(): string {
        return `${this.baseUrl}?offset=${this.offset}&limit=${this.limit}`;
    }

    get offset(): number {
        return this.limit! * this.page! - this.limit!;
    }

    get limit(): number | undefined {
        return this.$route.query.limit ? +this.$route.query.limit : undefined;
    }

    get page(): number | undefined {
        return this.$route.query.page ? +this.$route.query.page : undefined;
    }
}
</script>