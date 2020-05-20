<template>
  <nav class="site-nav">
    <nuxt-link to="/">Details</nuxt-link>
    <nuxt-link to="/travel-guide">Travel Guide</nuxt-link>
    <nuxt-link to="/registry">Registry</nuxt-link>
    <nuxt-link to="/rsvp">RSVP</nuxt-link>
  </nav>
</template>

<style lang="scss">
  .site-nav {
    margin: 2em 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    max-width: 100%;
    width: 100%;
    max-width: 600px;

    a {
      font-size: 1.5rem;
      color: black;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: normal;

      &:active,
      &:visited {
        color: black;
      }

      &:hover {
        color: $dark-green;
      }
    }
  }
</style>
