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
        <p class="date">October 24, 2020</p>
        <p class="location">Rancho Cucamonga</p>
      </div>
      <SiteNav />
      <nuxt />
      <!--
      <footer>
        <img
          class="caligraphy mini"
          src="~/assets/img/KatianneAndNoah.png"
          width="200"
          alt="Katianne and Noah"
        />
        <SiteNav />
      </footer>
      -->
    </div>
    <Dots class="visual-elements" />
    <Spots class="visual-elements" />
    <Florals class="visual-elements" />
  </div>
</template>

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

<style lang="scss">
html {
  min-height: 100vh;
  font-family: $sans-serif;
  font-size: 16px;
  font-weight: 500;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: rgba($peach, .2);
  overflow: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
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

.visual-elements {
  display: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.caligraphy {
  flex: 0 1 auto;
  padding: 0 1rem 1rem;
  animation: 1s appear;

  &.mini {
    margin-top: 5rem;
  }
}

.page-container {
  max-width: 64rem;
  padding: 5rem 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wedding-details {
  color: #f7f0eb;

  p {
    display: block;
    margin: 0;
    font-size: 2.5rem;
    font-family: $title-text;
    text-align: center;
    line-height: 1.2;
    -webkit-text-stroke: 1px black;
    text-shadow:
      2px 3px 0 #000,
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 2rem;
    }
  }
}

.page {
  min-height: 250px;
}

.coming-soon {
  margin-top: 3rem;
  text-align: center;
  font-size: 1.25rem;
  transform: rotate(-5deg);
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

h1, h2, h3, h4, h5, h6 {
  font-family: $title-text;
}

h1 {
  margin: 2rem 0;
  color: #f7f0eb;
  font-size: 2.5rem;
  line-height: 1.2;
  -webkit-text-stroke: 1px black;
  text-shadow: 3px 3px 0 #000;
  text-align: center;
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
