<script>
export default {
  data () {
    return {
      loading: true,
      guests: [],
      searchString: '',
      searchResults: [],
      showSearchResults: false,
      selectedGuest: null,
      newResponses: [],
      error: false,
      success: false
    }
  },
  computed: {
    guestOptions() {
      // Removes +1's
      return this.guests
        .filter(guest => !guest.name.includes('Guest'))
        .sort((a, b) => a.name.localeCompare(b.name) )
    },

    families() {
      return new Set(this.guests.map(guest => guest.family))
    },

    selectedFamily() {
      return this.selectedGuest ? this.selectedGuest.family : null
    },

    selectedGuestFamilyMembers() {
      if (this.selectedFamily) {
        return this.guests.filter(guest => guest.family === this.selectedFamily)
      }
      return []
    }
  },

  async mounted() {
    try {
      const response = await fetch('/.netlify/functions/get-guests/')
      if (response.ok) {
        const fetchedGuests = await response.json()
        this.guests = fetchedGuests
      }
    } catch (error) {
      throw new Error('There was an error fetching invitees.', error.body)
    } finally {
      this.loading = false
    }
  },

  methods: {
    /**
     * Get the RSVP status for a party member.
     *
     * - If they have already responded that they plan on attending, return true.
     * - If they responded but are not going to be attending, return false.
     * - Return null if the member has not responded yet.
     *
     * @param {object} guest - the name of a guest
     * @returns {boolean} - rsvp response
     */
    getRSVPResponse(guest) {
      const newResponse = this.newResponses.find(_guest => _guest.id === guest.id)
      const latestResponse = newResponse ? newResponse.response : guest.response
      return latestResponse || null
    },

    /**
     * Update the guest's response.
     * This information will be sent to Notion on submit.
     */
    respond(guest, response) {
      // First, check if the guest is already in the list.
      // We use filter to only run one array method true or false.
      const filteredResponses = this.newResponses.filter(_guest => _guest.id !== guest.id)

      const arrayToUse = filteredResponses.length < this.newResponses.length
        ? filteredResponses
        : this.newResponses

      this.newResponses = [
        ...arrayToUse,
        {
          ...guest,
          response: response
        }
      ]
    },

    searchForGuest() {
      this.searchResults = this.guestOptions.filter(guest => {
        const guestLastName = guest.name.split(' ')[1]
        if (guestLastName) {
          if ( guestLastName.toLowerCase() === this.searchString.toLowerCase() ) {
            return true
          }
          if ( guestLastName.toLowerCase().includes(this.searchString.toLowerCase()) ) {
            return true
          }
          if ( this.searchString.toLowerCase().includes(guestLastName.toLowerCase()) ) {
            return true
          }
        }
        return false
      })
      this.showSearchResults = true
    },

    selectGuest(guest) {
      this.selectedGuest = guest
      this.resetSearchField()
    },

    resetSearchField() {
      this.searchString = '',
      this.searchResults = []
      this.showSearchResults = false
    },

    backToSearch() {
      this.selectedGuest = null
      this.newResponses = []
    },

    async handleSubmit() {
      try {
        this.newResponses.map(async guest => {
          const data = {
            id: guest.id,
            response: guest.response
          }
          const response = await fetch('/.netlify/functions/update-guest-response/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          if (!response.ok) {
            throw new Error(`${response.status} Error: ${response.statusText}`)
          }
          // Success
          console.log('Submissions completed successfully');
          this.error = false
          this.success = true
          this.selectedGuest = ''
        })
      } catch(error) {
        this.error = true
        throw new Error('There was a problem with one or more of your responses.', error.body)
      }
    },
  }
}
</script>

<template>
  <div
    v-if="loading"
    class="spinner-container"
  >
    <img class="spinner" src="~/assets/img/spinner.svg" width="48" height="48">
    <p>Loading guests...<br /> The RSVP form will be ready in a moment.</p>
  </div>
  <div
    v-else
    class="rsvp-form"
  >
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

      <form
        v-if="!selectedGuest"
        name="guest-search"
        class="search"
        @submit.prevent="searchForGuest"
      >
        <div class="field search-field">
          <label for="last-name">Last Name:</label>
          <div>
            <input type="text" name="last-name" id="last-name" v-model="searchString" />
            <button
              type="submit"
              :disabled="searchString.length < 1"
            >
              Search
            </button>
          </div>
        </div>
        <div
          v-if="showSearchResults && searchResults.length"
          class="field"
        >
          <p class="instructions">
            Select your name from this list to continue.
          </p>
          <p class="subtext">(You will be able to RSVP for other members of your party.)</p>
          <div
            v-for="guest in searchResults"
            :key="guest.id"
            class="guest"
            @click="selectGuest(guest)"
          >
            <p>{{ guest.name }}</p>
          </div>
        </div>
        <p
          v-else-if="showSearchResults && searchResults.length === 0"
          class="no-results"
        >
          There were no invitations found matching this last name.<br />
          Please check your spelling and try again.
        </p>
      </form>

      <form
        v-if="selectedGuest"
        name="guest-rsvp"
        class="guest-rsvp"
        @submit.prevent="handleSubmit"
      >
        <button
          type="button"
          class="back-button"
          @click="backToSearch"
        >
          Back to Guest Search
        </button>
        <div
          v-if="selectedFamily"
          class="field"
        >
          <p class="instructions">You may RSVP for any of the following guests:</p>
          <div
            v-for="familyMember in selectedGuestFamilyMembers"
            :key="familyMember.id"
            class="guest"
          >
            <label for="is-attending">{{ familyMember.name }}</label>
            <div class="guest-actions">
              <button
                type="button"
                :aria-pressed="getRSVPResponse(familyMember) === 'Yes'"
                @click="respond(familyMember, 'Yes')"
              >
                Accept{{ getRSVPResponse(familyMember) === 'Yes' ? 'ed' : '' }}
              </button>
              <button
                type="button"
                :aria-pressed="getRSVPResponse(familyMember) === 'No'"
                @click="respond(familyMember, 'No')"
              >
                Decline{{ getRSVPResponse(familyMember) === 'No' ? 'd' : '' }}
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          :disabled="newResponses.length < 1"
        >
          Submit
        </button>
      </form>
      <!--
      <select
        v-model="selectedGuest"
        name="guest-name"
        aria-hidden="true"
        tabindex="-1"
        class="visually-hidden"
      >
        <option
          v-for="guest in guests"
          :key="guest.id"
          :value="guest"
        >
          {{ guest.name }}
        </option>
      </select>
      -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner-container {
  padding: 5rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  p {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-size: .875rem;
    line-height: 1.75;
  }
}

.spinner {
  fill: $dusty-blue;
}

.rsvp-form {
  width: 100%;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 2px 5px 2px rgba(0,0,0,.15);
  border-radius: 4px;
  transition: all .3s;

  .instructions {
    margin: 0;
    padding: 0;
  }

  .subtext {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: .875rem;
    font-weight: 400;
  }
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
    border-color: $dusty-blue;
    background: rgba($dusty-blue, .25);

    strong {
      color: $dusty-blue;
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

  &:last-of-type {
    margin-bottom: 0;
  }

  &.search-field > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
      width: 100%;
    }

    button {
      width: max-content;
      margin-left: .5rem;
    }
  }

  label {
    font-weight: bold;
    margin-bottom: .5rem;
  }

  input {
    min-height: 2.5rem;
    padding: .5rem;
    border: 1px solid rgba(black, .25);
    border-radius: 4px;
    box-shadow: inset 0px 0px 4px 1px rgba(black, 0.15);
    font-size: 1rem;
    font-weight: 500;
  }
}

.no-results {
  margin-top: 2rem;
  color: $red;
  font-size: .875rem;
  text-align: center;
}

button {
  padding: .75rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.15);
  background: $blue;
  color: white;
  font-size: .825rem;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.15);
  }

  &.back-button {
    float: right;
    margin-bottom: 2rem;
    background: transparent;
    border: 1px solid $dusty-blue;
    color: black;

    &:hover {
      background: $dusty-blue;
      color: white;
    }
  }
}

.guest-rsvp .field .instructions {
  margin-bottom: 1rem;
}

.guest {
  width: 100%;
  padding: .75rem;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  margin-bottom: .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search .guest {
  cursor: pointer;

  &:hover {
    border-color: $blue;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.15);
  }
}

.guest label {
  display: block;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.guest button {
  padding: .5rem .75rem;
  border: 1px solid $peach;
  border-radius: 4px;
  background-color: transparent;
  color: black;

  &:hover {
    color: $peach;
  }

  &[aria-pressed='true'] {
    background-color: $peach;
    color: white;

    /* Remove feedback since no action will occur! */
    &:hover {
      cursor: default;
      box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.15);
    }
  }
}

button[type="submit"] {
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}

.guest-rsvp [type="submit"] {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: .5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: font-size .15s;
}
</style>
