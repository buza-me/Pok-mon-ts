<template>
    <div class="container">
        <div class="limit-picker">
            <div class="dropdown-block">
                <div class="dropdown" @click="displayDropDown = !displayDropDown">
                    {{limit}}
                    <ul @click="selectLimit($event)" v-show="displayDropDown">
                        <li data-value='10'>10</li>
                        <li data-value='20'>20</li>
                        <li data-value='30'>30</li>
                    </ul>
                </div>
                <p>Pokémons at page</p>
            </div>
            <p class="current-page-message">page {{currentPage}} of {{pageCount}}</p>
        </div>
        <ul class="pagination">
            <li @click="selectPage(1)" class="pagination-nav-button">first</li>
            <li @click="selectPage(currentPage - 1)" class="pagination-nav-button">prev.</li>
            <li 
                @click="selectPage(pageNumber)" 
                v-for="pageNumber in pageList" 
                :key="pageNumber"
                :class="{'active': pageNumber === currentPage}"
            >
                {{pageNumber}}
            </li>
            <li @click="selectPage(currentPage + 1)" class="pagination-nav-button">next</li>
            <li @click="selectPage(pageCount)" class="pagination-nav-button">last</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch, Prop, Provide } from 'vue-property-decorator';
    import { Getter, Mutation } from 'vuex-class';
import { start } from 'repl';

    @Component
    export default class Pagination extends Vue {

        countOfPagesToDisplay: number = 5;
        firstOfPagesToDisplay:number = 1;
        pageList: number[] = [];
        displayDropDown: boolean = false;
        newPage: number | undefined;

        @Prop() currentPage!: number;
        @Prop() itemCount!: number;
        @Prop() offset!: number;
        @Prop() limit!: number;

        @Watch('currentPage')
        updatePageList(): void {

            if (!this.pageList.length) {
                for (let i = 1; i <= this.countOfPagesToDisplay; i++) {
                    this.pageList.push(i);
                };
                return;
            };

            const lastNumberInPageList = this.pageList[this.pageList.length - 1];
            const firstNumberInPageList = this.pageList[0];

            if (this.currentPage === lastNumberInPageList || this.currentPage === firstNumberInPageList) {
                return;
            }
            if (this.currentPage > lastNumberInPageList) {
                this.firstOfPagesToDisplay = Math.floor(this.currentPage / this.countOfPagesToDisplay) * this.countOfPagesToDisplay + 1;
            }
            if (this.currentPage < firstNumberInPageList) {
                this.firstOfPagesToDisplay = Math.floor(this.currentPage / this.countOfPagesToDisplay) * this.countOfPagesToDisplay + 1 - this.countOfPagesToDisplay;
            }
            if (this.firstOfPagesToDisplay <= 0) {
                this.firstOfPagesToDisplay = 1;
            }

            this.pageList = [];
            for (let i = this.firstOfPagesToDisplay; i < this.firstOfPagesToDisplay + this.countOfPagesToDisplay; i++) {
                if (i > this.pageCount) {
                    continue;
                };
                this.pageList.push(i);
            }
        }

        selectLimit({ target }): void {

            const newLimit: number = +target.dataset.value;
            if (this.offset < newLimit) this.newPage = 1;
            if (this.offset == newLimit) this.newPage = 2;
            if (this.offset > newLimit) this.newPage = Math.floor(this.offset! / newLimit!) + 1;

            this.$router.push(`/?limit=${newLimit}&page=${this.newPage}`);
        }

        selectPage(newPage: number): void {
            if (newPage < 1 || newPage > this.pageCount || isNaN(newPage)) {
                return;
            };
            this.$router.push(`/?limit=${this.limit}&page=${newPage}`);
        }

        get pageCount(): number {
            return Math.ceil(this.itemCount! / this.limit!);
        }

        mounted() {
            this.updatePageList();
        }
    }
</script>

<style scoped>
    .container {
        padding-top: 1rem;
        padding-bottom: .5rem;
        display: grid;
        grid-row-gap: .5rem;
    }
    .pagination {
        display: grid;
        grid-auto-flow: column;
        justify-content: end;
        grid-gap: .25rem .25rem;
    }
    .pagination li {
        background: rgba(255, 255, 255, .4);
        display: inline-block;
        padding: .25rem 1rem;
        border-radius: 3px;
        cursor: pointer;
        transition: .15s;
    }
    .pagination li:hover {
        background: rgba(255, 255, 255, .6);
    }
    .pagination li.active {
        background: rgba(255, 255, 255, .7);
    }
    .limit-picker {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: end;
        grid-gap: .25rem .25rem;
    }
    .dropdown-block {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: .5rem;
        background: rgba(255, 255, 255, .5);
        padding: .25rem;
        padding-right: .5rem;
        border-radius: 3px;
        align-items: center;
    }
    .dropdown {
        padding: .25rem 1rem;
        background: rgba(255, 255, 255, .7);
        border-radius: 3px;
        position: relative;
        cursor: pointer;
        transition: .15s;
    }
    .dropdown:hover {
        background: rgba(255, 255, 255, .9);
    }
    .dropdown ul {
        background: #ffffff;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        border-radius: 3px;
    }
    .dropdown ul li {
        text-align: center;
        padding: .25rem 0;
        border-radius: 3px;
        cursor: pointer;
        transition: .15s;
    }
    .dropdown ul li:hover {
        background: #ebebeb;
    }
    .current-page-message {
        display: grid;
        align-content: center;
        background: rgba(255, 255, 255, .4);
        padding: .25rem 1rem;
        border-radius: 3px;
    }
    @media screen and (max-width: 600px) {
        .pagination {
            grid-template-rows: auto auto;
            grid-template-columns: repeat(10, 1fr);
            grid-auto-flow: row;
            justify-content: center;
        }
        .pagination li {
            padding: .4rem .25rem;
            text-align: center;
            grid-column: span 2;
        }
        .pagination-nav-button {
            grid-column: span 2;
            grid-row: 2 / 3;
        }
        .pagination-nav-button:first-child {
            grid-column: 2 / 4;
        }
        .limit-picker {
            justify-content: center;
        }
        .current-page-message {
            padding: .25rem;
            border-radius: 3px;
        }
    }
    @media screen and (max-width: 340px) {
        .dropdown-block {
            grid-column-gap: .25rem;
            padding: .15rem;
        }
    }
</style>