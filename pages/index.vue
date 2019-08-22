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
    async asyncData({ query: { limit, page } }): Promise<any> {
        const { count } = await fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(response => response.json())
            .catch(console.log);
        return {
            itemCount: count,
            initialLimit: limit || 10,
            initialPage: page || 1,
        }
    }
})

export default class MainPage extends Vue {

    arrayOfPokemonData: any[] = [];
    itemCount?: number;
    baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
    initialLimit?: number;
    initialPage?: number;

    get url(): string {
        return `${this.baseUrl}?offset=${this.offset}&limit=${this.limit || this.initialLimit}`;
    }

    get offset(): number {
        return this.limit! * this.page! - this.limit!;
    }

    get limit(): number {
        return +this.$route.query.limit;
    }

    get page(): number {
        return +this.$route.query.page;
    }
    
    @Watch('url')
    handleUrlChanges() {
        if (!this.limit || !this.page) return;
        this.fetchArrayOfPokemonData(this.url);
    }

    @Watch('limit')
    hendleLimitChanges() {
        localStorage.setItem('limit', `${this.limit}`);
    }

    @Watch('page')
    handlePageChanges() {
        localStorage.setItem('page', `${this.page}`);
    }

    beforeMount() {

        if (!this.limit || !this.page) {
            
            this.initialLimit = localStorage.getItem('limit') ? +localStorage.getItem('limit')! : this.initialLimit;
            this.initialPage = localStorage.getItem('page') ? +localStorage.getItem('page')! : this.initialPage;

            this.$router.replace({
                path: '/',
                query: {
                    limit: `${this.initialLimit}`,
                    page: `${this.initialPage}`,
                },
            });

        } else if (
            this.initialPage! > Math.ceil(this.itemCount! / this.initialLimit!) ||
            this.initialPage! < 1 ||
            this.initialLimit! % 10 !== 0 ||
            this.initialLimit! < 10 ||
            this.initialLimit! > 30
        ) {
            this.$router.replace('/error');
        };
    }

    mounted() {
        if (!this.limit || !this.page) return;
        this.fetchArrayOfPokemonData(this.url);
    }

    async fetchArrayOfPokemonData(url: string): Promise<any> {
        
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        });

        try {
            let { results } = await fetch(url)
                .then(response => response.json());

            results = results.map( (item) => 
                fetch(item.url)
                .then(response => response.json())
            );
            this.arrayOfPokemonData = await Promise.all(results);

        } catch (error) {
            console.log(error);
        };
        
        this.$nuxt.$loading.finish();
    }
}
</script>