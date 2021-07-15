<script>
import SiteNav from '~/components/SiteNav/SiteNav.vue'
import Dots from '~/components/Dots/Dots.vue'
import Spots from '~/components/Spots/Spots.vue'
import Florals from '~/components/Florals/Florals.vue'

export default {
  components: {
    Dots,
    Spots,
    Florals,
    SiteNav
  }
}
</script>

<template>
  <div class="site">
    <div class="page-container">
      <img
        class="caligraphy"
        src="~/assets/img/KatianneAndNoah.png"
        width="500"
        alt="Katianne and Noah"
      />
      <div class="wedding-details">
        <p class="date">October 2, 2021</p>
        <p class="location">Upland, CA</p>
      </div>
      <SiteNav />
      <nuxt />
    </div>
    <Dots class="visual-elements" />
    <Spots class="visual-elements" />
    <Florals class="visual-elements" />
  </div>
</template>

<style lang="scss">
  /* simple browser reset */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  html {
    min-height: 100vh;
    background-color: rgba($peach, .2);
    overflow: hidden;
    font-family: $sans-serif;
    font-size: 16px;
    font-weight: 500;
    word-spacing: 1px;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: $title-text;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: auto;
  }

  .site {
    max-height: 100vh;
    width: 100%;
    overflow: auto;
    overflow-x: hidden;
    padding: 0;
  }

  .page-container {
    max-width: 64rem;
    padding: 5rem 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 768px) {
      padding: 5rem 0rem;
    }
  }

  .caligraphy {
    flex: 0 1 auto;
    padding: 0 1rem 1rem;
    animation: 1s appear;

    &.mini {
      margin-top: 5rem;
    }
  }

  .wedding-details {
    color: #d1e5f6;
    max-width: 90%;
    margin: auto;

    p {
      display: block;
      margin: 0;
      font-size: 2.5rem;
      font-family: $title-text;
      text-align: center;
      line-height: 1.2;
      -webkit-text-stroke: 1px black;
      text-shadow:
        1px 4px 0 #000,
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
    }

    @media screen and (max-width: 767px) {
      max-width: 100%;

      p {
        font-size: 2rem;
      }

      .location {
        font-size: 1.75rem;
      }
    }
  }

  .visual-elements {
    display: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  /** Shared Page Styles  */

  .page {
    min-height: 250px;
    padding-bottom: 3rem;
  }

  .page-content {
    max-width: 40rem;
    background-color: rgba(249, 232, 218, 0.7);
    padding: 1rem;
    margin: 0 1rem;
    border-radius: .25rem;
  }

  h1 {
    margin: 2rem 0;
    color: #d1e5f6;
    font-size: 2.5rem;
    line-height: 1.2;
    -webkit-text-stroke: 1px black;
    text-shadow: 1px 4px 0 #000;
    text-align: center;
  }

  .coming-soon {
    margin-top: 3rem;
    text-align: center;
    font-size: 1.25rem;
    transform: rotate(-5deg);
    background-color: rgba(249, 232, 218, 0.7);
    padding: .5rem;
    border-radius: .25rem;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .site-nav  {
      margin: 0;
      a {
        font-size: 1rem;
      }
    }
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
