<script>
import { Client } from "@notionhq/client"

export default {
  data () {
    return {
      // component data
      invitees: [],
      selectedGuest: null,
      newResponses: [],
      error: false,
      success: false
    }
  },
  computed: {
    guests() {
      return this.invitees.map(guest => {
        return {
          id: guest.id,
          name: guest.properties["Name"].title[0].plain_text,
          family: guest.properties["Family"].number,
          response: guest.properties["Response"].rich_text[0]?.plain_text
        }
      })
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

  async fetch() {
    // Use the client to retrieve a list of invitees
    try {
      const notion = new Client({ auth: process.env.NOTION_KEY })
      const databaseID = process.env.NOTION_DATABASE_ID
      const response = await notion.databases.query({ database_id: databaseID })
      this.invitees = response.results
    } catch (error) {
      throw new Error('There was an error fetching invitees.', error.body)
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

    async handleSubmit() {
      try {
        await this.newResponses.map(async guest => {
          const data = {
            id: guest.id,
            response: guest.response
          }
          const response = await fetch('/api/respond', {
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
  <form
    name="rsvp"
    class="rsvp"
    @submit.prevent="handleSubmit"
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
      <div class="field">
        <label for="guest-name">Full Name:</label>
        <select
          v-model="selectedGuest"
          name="guest-name"
        >
          <option
            v-for="guest in guests"
            :key="guest.id"
            :value="guest"
          >
            {{ guest.name }}
          </option>
        </select>
      </div>

      <fieldset
        v-if="selectedFamily"
        class="field"
      >
        <legend>You may RSVP for:</legend>
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
      </fieldset>

      <button type="submit">Submit</button>
    </div>
  </form>
</template>

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
