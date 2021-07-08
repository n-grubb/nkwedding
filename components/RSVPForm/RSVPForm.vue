<template>
  <form
    name="rsvp"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="8jkxfg"
  >
    <input type="hidden" name="form-name" value="rsvp" />
    <input type="hidden" name="8jkxfg" value="" />

    <div class="field">
      <label for="guest-guest">Name:</label>
      <input type="text" name="guest-name" id="guest-name" value="" placeholder="The _____ family" />
    </div>

    <div class="field">
      <label for="num-of-guests">Number in Party:</label>
      <input type="number" name="num-of-guests" id="num-of-guests" increment="1" min="1" max="8" value="1" />
    </div>

    <button type="submit">Submit</button>
  </form>

</template>
<script>
export default {
  name: "QAForm",
  methods: {
    updatePanelist (ev) {
      this.currentPanelist = ev.target.value
    }
  },
  data () {
    return {
      panelists: ['Evan You', 'Chris Fritz'],
      currentPanelist: 'Evan You'
    }
  }
}
</script>

<style>

</style>
