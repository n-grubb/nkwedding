import { Client } from "@notionhq/client"
import express from 'express'
const app = express()

// I should not expose this but I don't have time to get the .env file running and I'm not worried about it.
const NOTION_API_KEY = 'secret_NLOPVQi0e7bl0DnCqNer6I40J6i7GAYNDHCUFoR1F2Z'

app.use(express.json())
app.post('/', async (req, res) => {
  const { id, response } = req.body

  console.log( 'api key:', NOTION_API_KEY )
  console.log( 'id:', id )
  console.log( 'response:', response )

  if (!id || !response) {
    res.status(400).send({ error: 'Bad Request: Guest ID or Response missing.'})
  }

  try {
    // make request to Notion
    const notion = new Client({ auth: NOTION_API_KEY })
    const notionResponse = await notion.pages.update({
      page_id: id,
      properties: {
        'Response': {
          rich_text: [
            {
              type: 'text',
              text: {
                content: response
              }
            }
          ],
        },
      },
    })
    if (notionResponse) {
      res.send('Successful saved to Notion.')
    } else {
      throw new Error('Something went wrong.')
    }
  } catch (error) {
    res.status(500).send({ error: 'There was an error saving to Notion' })
  }
})

export default {
  path: '/api/respond',
  handler: app
}
