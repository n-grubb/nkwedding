<template>
  <div class="page home">
    <img
      class="feature"
      src="~/assets/img/nk.jpg"
      alt="Katianne and Noah during the proposal"
      height="200"
    />
    <h1>
      The Wedding of <br />
      Katianne Engle & Noah Grubb
    </h1>
    <p class="details">
      Saturday, October 24th<br />
      4:00 pm - 9:00 pm<br />
    </p>
    <address>
      Hidden Oaks Retreat Center<br />
      6558 Hermosa Avenue<br />
      Rancho Cucamonga, CA 91737
    </address>
    <p class="details notice">
      While we are optmistic to have a weddding unaffected by coranavirus, we would be foolish not to have a backup plan. We will be making a formal decision on <strong>August 1</strong> and any changes to the event will be posted here.
    </p>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template: auto / auto;
}

.feature {
  // border: 2px solid black;
  max-width: 800px;
  border-radius: 11%;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
}

.details,
address {
  font-size: 2rem;
  text-align: center;
  font-weight: lighter;
  font-family: $sans-serif;
  background-color: rgba(249, 232, 218, 0.58);
  border-radius: 40px;
  padding: 2rem;
  max-width: 80%;
  margin: 0 auto 1rem;
}

address {
  font-size: 1.75rem;
}

.notice {
  font-size: 1.25rem;
}
</style>
