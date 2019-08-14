<template>
    <div class="container">
        <pagination
            :itemCount="itemCount"
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
            .catch(console.error);
        return {
            itemCount: count,
            limit: limit || 10,
            page: page || 1,
        }
    }
})

export default class MainPage extends Vue {

    arrayOfPokemonData: any[] = [];
    itemCount?: number;
    baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
    limit?: number;
    page?: number;

    @Watch('url')
    handleUrlChanges() {
        this.fetchArrayOfPokemonData(this.url);
        localStorage.setItem('limit', `${this.limit}`);
        localStorage.setItem('page', `${this.page}`);
    }

    beforeMount() {

        if (!this.$route.query.limit || !this.$route.query.page) {
            
            this.limit = localStorage.getItem('limit') ? +localStorage.getItem('limit')! : this.limit;
            this.page = localStorage.getItem('page') ? +localStorage.getItem('page')! : this.page;

            this.$router.push({
                path: '/',
                query: {
                    limit: `${this.limit}`,
                    page: `${this.page}`,
                },
            });

        } else if (
            this.page! > Math.ceil(this.itemCount! / this.limit!) ||
            this.page! < 1 ||
            this.limit! % 10 !== 0 ||
            this.limit! < 10 ||
            this.limit! > 30
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
        return `${this.baseUrl}?offset=${this.offset}&limit=${this.$route.query.limit || this.limit}`;
    }

    get offset(): number {
        return +this.$route.query.limit! * +this.$route.query.page! - +this.$route.query.limit!;
    }
}
</script>