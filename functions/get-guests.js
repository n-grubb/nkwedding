const { Client } = require('@notionhq/client')
require("dotenv").config()

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseID = process.env.NOTION_DATABASE_ID

exports.handler = async function() {
  try {
    const results = await getGuestsFromDatabase()
    const guests = results
      .filter(guest => guest.properties)
      .map(guest => {
        return {
          id: guest.id,
          name: guest.properties["Name"] ? guest.properties["Name"].title[0].plain_text : 'unknown',
          family: guest.properties["Family"]?.number,
          response: guest.properties["Response"].rich_text[0]?.plain_text
        }
      })
    console.log('Guests found: ', guests.length)
    return {
      statusCode: 200,
      body: JSON.stringify(guests)
    }
  } catch(error) {
    console.log('Error: ', error)
    return {
      statusCode: 500,
      body: `There was an error processing your request. ${error}`
    }
  }
}

// Get a paginated list of Tasks currently in a the database.
async function getGuestsFromDatabase() {
  const guests = []
  async function getPageOfGuests(cursor) {
    const queryParams = {
      database_id: databaseID
    }
    // Create the request payload based on the presence of a start_cursor.
    if (cursor !== undefined) {
      queryParams.start_cursor = cursor
    }
    const paginatedGuests = await notion.databases.query(queryParams)
    guests.push(...paginatedGuests.results)
    if (paginatedGuests.has_more) {
      await getPageOfGuests(paginatedGuests.next_cursor)
    }
  }
  await getPageOfGuests()
  return guests
}
