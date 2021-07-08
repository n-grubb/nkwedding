<template>
  <div class="page rsvp">
    <h1>RSVP</h1>
    <div class="page-content">

      <form name="contact" method="POST" data-netlify="true">
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

    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Katianne and Noah | RSVP'
    }
  }
}
</script>
