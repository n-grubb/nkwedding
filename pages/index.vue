<template>
  <div class="page home">
    <img
      class="feature"
      src="~/assets/img/engagement-photo.jpg"
      alt="An engagement photo of Katianne and Noah"
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
      1450 Newman St.<br />
      Upland, CA 91784
    </address>
    <p class="details notice">
      Although we married last year, we were unable to celebrate with all of our friends and extended family. We are thrilled to finally invite you to our long overdue wedding celebration!
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
  max-height: 640px;
  border-radius: 2%;
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  clip-path: inset(50%);
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
}
</style>
