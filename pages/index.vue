<template>
  <div class="page home">
    <img
      class="feature"
      src="~/assets/img/nk-wgraphic.jpg"
      alt="Katianne and Noah during the proposal"
      height="200"
    />
    <h1>
      The Wedding Celebration of <br />
      Katianne Engle &amp; Noah Grubb
    </h1>
    <p class="details">
      October 2, 2021<br />
    </p>
    <address>
      Hidden Oaks Retreat Center<br />
      6558 Hermosa Avenue<br />
      Rancho Cucamonga, CA 91737
    </address>
    <p class="details notice">
      We want to celebrate our marriage with ALL of our closest friends and family. In order to do this safely and responsibly, we have decided to postpone the wedding celebration until October 2nd, 2021.
      <br /><br />
      While we may have postponed the celebration, we will still be getting married this September with a small ceremony amongst our immediate families. If you would like, we welcome wedding gifts now as we prepare for our first home together.
      <br /><br />
      Keep an eye out for a formal "Change the Date" in the mail. We can't wait to celebrate with all of you in 2021!
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Katianne and Noah'
    }
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template: auto / auto;
}

.feature {
  min-width: 320px;
  min-height: 372px;
  max-width: 800px;
  max-height: 600px;
  border-radius: 10%;
  animation: 2s appear;

  @media screen and (max-width: 767px) {
    max-width: 100%;
    padding: 0 .5rem;
  }
}

.details,
address {
  font-size: 2rem;
  text-align: center;
  font-weight: lighter;
  font-family: $sans-serif;
  background-color: rgba(249, 232, 218, 0.7);
  border-radius: 40px;
  padding: 2rem;
  max-width: 80%;
  max-width: 100%;
  margin: 0 auto 1rem;

  @media screen and (max-width: 767px) {
    font-weight: normal;
  }
}

.details {
  max-width: 500px;

  @media screen and (max-width: 767px) {
    font-size: 1.65rem;
  }
}

address {
  font-size: 1.75rem;

  @media screen and (max-width: 767px) {
    font-size: 1.25rem;
  }
}

.notice {
  font-size: 1.25rem;

  @media screen and (max-width: 767px) {
    font-size: 1rem;
  }
}
</style>
