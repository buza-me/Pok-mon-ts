<template>
    <div class="container">
        <h2>Wrong request!</h2>
        <h3>Shame on you!</h3>
        <nuxt-link to="/">go back!</nuxt-link>
    </div>
</template>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
        text-align: center;
        background: rgba(255, 255, 255, .4);
        padding: 2rem;
        margin-top: 2rem;
        border-radius: 3px;
        display: grid;
        grid-row-gap: 1rem;
    }
    .container a {
        color: #ffffff;
        text-decoration: underline;
    }
</style>
