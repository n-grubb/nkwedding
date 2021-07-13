const { Client } = require('@notionhq/client')
require("dotenv").config()

exports.handler = async function(event) {
  const { id, name = null, response } = JSON.parse(event.body)

  if (!id || !response) {
    console.error('Bad Request: Guest ID or Response missing.');
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 'Bad Request: Guest ID or Response missing.'
      })
    }
  }

  const propertiesToUpdate = {
    'Response': {
      rich_text: [
        {
          type: 'text',
          text: {
            content: response
          }
        }
      ]
    }
  }
  console.log('submitted name: ', name)
  if (name) {
    propertiesToUpdate['Name'] = {
      title: [
        {
          type: 'text',
          text: {
            content: name
          }
        }
      ]
    }
  }


  try {
    // make request to Notion
    const notion = new Client({ auth: process.env.NOTION_KEY })
    await notion.pages.update({
      page_id: id,
      properties: propertiesToUpdate
    })
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: `Guest ${id} submitted a response of: ${response}`
      })
    }
  } catch (error) {
    console.log('Error: ', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: `There was an error processing your request. ${error}`
      })
    }
  }
}
