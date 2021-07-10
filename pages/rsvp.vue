<template>
  <div class="page rsvp">
    <h1>RSVP</h1>
    <div class="page-content">
      <div class="instructions">
        <p>Please enter your full name to find your invitation.</p>
        <p class="subtext">
          If you are also responding for a guest or family members, you will be able to RSVP for your entire group.
        </p>
      </div>
      <RSVPForm />
    </div>
  </div>
</template>

<script>
import RSVPForm from '~/components/RSVPForm/RSVPForm.vue'

export default {
  head() {
    return {
      title: 'Katianne and Noah | RSVP'
    }
  },
  components: {
    RSVPForm
  }
}
</script>

<style lang="scss">
.rsvp {
  .page-content {
    background-color: rgba(249, 232, 218, 0.7);
  }

  .instructions {
    padding: 2rem 1rem;
  }

  p {
    font-weight: 500;
    font-size: 1.25rem;
  }

  .subtext {
    margin-top: .5rem;
    font-size: 1rem;
  }
}
</style>
