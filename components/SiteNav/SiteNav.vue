<template>
  <nav class="site-nav">
    <nuxt-link to="/">Details</nuxt-link>
    <nuxt-link to="/travel-guide">Travel Guide</nuxt-link>
    <nuxt-link to="/registry">Registry</nuxt-link>
  </nav>
</template>

<style lang="scss">
  .site-nav {
    margin: 2rem 0 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    max-width: 100%;
    width: 100%;
    max-width: 600px;

    @media screen and (max-width: 768px) {
      background-color: rgba(249, 232, 218, 0.7);
      border-radius: 5px;
      padding: .5rem 0;
    }

    a {
      font-size: 1.5rem;
      color: black;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: normal;

      @media screen and (max-width: 768px) {
        font-size: 1.2rem;
      }

      &:active,
      &:visited {
        color: black;
      }

      &:hover {
        color: #E6B0A2;
      }
    }
  }
</style>
