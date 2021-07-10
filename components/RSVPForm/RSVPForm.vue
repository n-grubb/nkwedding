<template>
  <form
    name="rsvp"
    class="rsvp"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="8jkxfg"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" value="rsvp" />
    <input type="hidden" name="8jkxfg" value="" />

    <div class="notifications">
      <div
        v-if="success"
        class="notification success"
      >
        <strong>Success:</strong>
        Thank you for responding! Your response was recorded.
      </div>

      <div
        v-if="error"
        class="notification error"
      >
        <strong>Error:</strong>
        There was an error with your submission. Please check your information and try again.
      </div>
    </div>

    <div
      v-if="!success"
      class="form-content"
    >
      <div class="field">
        <label for="guest-name">Full Name:</label>
        <select
          v-model="selectedGuest"
          name="guest-name"
        >
          <option
            v-for="(guest, index) in guestOptions"
            :key="index"
            :value="guest"
          >
            {{ guest }}
          </option>
        </select>
      </div>

      <fieldset
        v-if="selectedParty"
        class="field"
      >
        <legend>You may RSVP for:</legend>
        <div
          v-for="(partyMember, index) in selectedPartyMembers"
          :key="index"
          class="guest"
        >
          <label for="is-attending">{{ partyMember.name }}</label>
          <div class="guest-actions">
            <button
              type="button"
              :aria-pressed="partyMember.response"
              @click="acceptInvitation(partyMember)"
            >
              Accept{{ partyMember.response ? 'ed' : '' }}
            </button>
            <button
              type="button"
              :aria-pressed="partyMember.response === false"
              @click="declineInvitation(partyMember)"
            >
              Decline{{ partyMember.response === false ? 'd' : '' }}
            </button>
          </div>
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
import guestlist from './guestlist.json'
import responses from './rsvps.json'

export default {
  data () {
    return {
      error: false,
      success: false,
      selectedGuest: '',
      responses: { ...responses },
      initialResponses: responses
    }
  },
  computed: {
    guestParties() {
      return guestlist.parties
    },

    guestOptions() {
      return this.guestParties.flatMap(party => party.members)
    },

    selectedParty() {
      return this.selectedGuest
        ? this.guestParties.find(party => party.members.includes(this.selectedGuest))
        : null
    },

    selectedPartyMembers() {
      return this.selectedParty.members
        .map(member => {
          return {
            name: member,
            response: this.getRSVPResponse(member)
          }
        } )
    },

    guestsAttending() {
      return this.responses.attending || []
    },

    guestsNotAttending() {
      return this.responses.notAttending || []
    }
  },
  watch: {
    selectedGuest() {
      // Reset the responses if a new guest is selected.
      this.responses = { ...responses }
    }
  },
  methods: {
    /**
     * Get the RSVP status for a party member.
     * If they have already responded that they plan on attending, return true.
     * If they responded but are not going to be attending, return false.
     * Return null if the member has not responded yet.
     * @param {string} guestName - the name of a guest
     * @returns {boolean} - rsvp response
     */
    getRSVPResponse(guestName) {
      if (this.guestsAttending.includes(guestName)) {
        return true
      } else if (this.guestsNotAttending.includes(guestName)) {
        return false
      } else {
        return null
      }
    },

    acceptInvitation(guest) {
      this.findAndRemoveFromList(guest.name, this.responses.notAttending)
      this.responses.attending = [...this.responses.attending, guest.name]
    },

    declineInvitation(guest) {
      this.findAndRemoveFromList(guest.name, this.responses.attending)
      this.responses.notAttending = [...this.responses.notAttending, guest.name]
    },

    findAndRemoveFromList(guestName, list) {
      const responseIndex = list.findIndex(guest => guest === guestName)
      if (responseIndex > -1) {
        list.splice(responseIndex, 1)
      }
    },

    handleSubmit() {
      const newResponses = this.getNewResponses()

      console.log('new responses', newResponses)

      const submissions = newResponses.map(guest => {
        const formData = new FormData(document.querySelector('form.rsvp'));
        formData.append('form-name', 'rsvp')
        formData.append('guest-name', guest.name)
        formData.append('response', guest.response ? 'Yes' : 'No' )

        return fetch('/', {
          method: 'post',
          body: formData
        })
          .then(response => {
            console.log(response)
            if (!response.ok) {
              throw new Error(`${response.status} Error: ${response.statusText}`)
            }
          })
      })

      Promise.all(submissions)
        .then(() => {
          console.log('Submissions completed successfully');
          this.error = false
          this.success = true
          this.selectedGuest = ''
          // update json / db
        })
        .catch(error => {
          this.error = true
          throw new Error('There was a problem with one or more of your responses.', error)
        });
    },

    getNewResponses() {
      console.log('Original responses', this.initialResponses)
      const newRSVPs = this.guestsAttending
        .filter(guest => this.initialResponses.attending && !this.initialResponses.attending.includes(guest))
        .map(guest => ({ name: guest, response: true }))
      const newNos = this.guestsNotAttending
        .filter(guest => this.initialResponses.attending && !this.initialResponses?.notAttending.includes(guest))
        .map(guest => ({ name: guest, response: false }))

      return newRSVPs.concat(newNos)
    }
  }
}
</script>

<style lang="scss" scoped>
form.rsvp {
  width: 100%;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 2px 5px 2px rgba(0,0,0,.15);
  border-radius: 4px;
}

.notification {
  padding: .5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px 2px rgba(0,0,0,.15);
  font-size: .875rem;

  &.success {
    margin: 3rem 0;
    border-color: $light-green;
    background: rgba($light-green, .25);

    strong {
      color: $light-green;
    }
  }

  &.error {
    border-color: $red;
    background: rgba($red, .25);

    strong {
      color: $red;
    }
  }
}

.field {
  width: 100%;
  margin-bottom: 2rem;
  display: grid;
  grid-template: auto auto / 1fr;
}

button[type="submit"] {
  width: 100%;
  padding: .5rem;
  box-shadow: 0 2px 5px 2px rgba(0,0,0,.15);
}

fieldset {
  display: grid;
  grid-template: auto / 1fr;
}

.guest {
  width: 100%;
  padding: .5rem;
  border: 1px solid rgba(0,0,0,.15);
  margin-bottom: .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.guest label {
  display: block;
  padding: .5rem;
}

.guest button {
  padding: .5rem .75rem;
  border: 1px solid $peach;
  border-radius: 4px;
  background-color: transparent;
  color: black;

  &[aria-pressed='true'] {
    background-color: $peach;
    color: white;
  }
}
</style>
