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
                <p>Pokémons per page</p>
            </div>
            <p class="current-page-message">page {{currentPage}} of {{pageCount}}</p>
        </div>
        <ul class="pagination">
            <li @click="selectPage(1); updatePageList(1)" class="pagination-nav-button">first</li>
            <li @click="selectPage(currentPage - 1); updatePageList(currentPage)" class="pagination-nav-button">prev.</li>
            <li 
                @click="selectPage(pageNumber); updatePageList(pageNumber)" 
                v-for="pageNumber in pageList" 
                :key="pageNumber"
                :class="{'active': pageNumber === currentPage}"
            >
                {{pageNumber}}
            </li>
            <li @click="selectPage(currentPage + 1); updatePageList(currentPage)" class="pagination-nav-button">next</li>
            <li @click="selectPage(pageCount); updatePageList(pageCount)" class="pagination-nav-button">last</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { Getter, Mutation } from 'vuex-class';

    @Component
    export default class Pagination extends Vue {

        pagesToDisplayCount: number = 5;
        pageList: number[] = [];
        displayDropDown: boolean = false;

        @Getter('pagination/url') url
        @Getter('pagination/pageCount') pageCount
        @Getter('pagination/currentPage') currentPage
        @Getter('pagination/limit') limit
        @Getter('pagination/offset') offset

        @Mutation('pagination/setOffset') setOffset
        @Mutation('pagination/setLimit') setLimit
        @Mutation('pagination/updateUrl') updateUrl

        @Watch('limit')
        onLimitChange(): void {
            this.updatePagination(this.currentPage);
        }

        selectLimit({ target }): void {
            const newLimit: number = +target.dataset.value;
            if (this.offset < newLimit) this.setOffset(0);
            if (this.offset > newLimit) this.setOffset(Math.floor(this.offset! / newLimit!) * newLimit);
            if (this.offset == newLimit) this.setOffset(newLimit);
            this.setLimit(newLimit);
            this.updateUrl();
        }

        selectPage(number: number): void {
            if (number < 1 || number > this.pageCount || isNaN(number)) {
                return;
            };
            this.setOffset(--number * this.limit);
            this.updateUrl();
            console.log(this.url)
        }

        updatePageList(number: number): void {
            if (number < 1 || number > this.pageCount) {
                return;
            }
            const currentBlockOfPages: number = Math.ceil(number / this.pagesToDisplayCount);
            let pageListOffset: number = currentBlockOfPages * this.pagesToDisplayCount - this.pagesToDisplayCount;

            if (pageListOffset + this.pagesToDisplayCount > this.pageCount) {
                pageListOffset -= (pageListOffset + this.pagesToDisplayCount) - this.pageCount;
            }
            this.pageList = [];
            for (let i = pageListOffset + 1; i <= pageListOffset + this.pagesToDisplayCount && i <= this.pageCount; i++) {
                this.pageList.push(i);
            };
        }

        updatePagination(number): void {
            this.selectPage(number);
            this.updatePageList(number);
        }

        mounted(): void {
            Vue.nextTick()
            .then( () => {
                this.updatePagination(this.currentPage);
            })
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
</style>
