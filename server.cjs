require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const OpenAIApi = require('openai')

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY })

app.post('/chat', async (req, res) => {
  const messages = res.body.messages

  try {
    if (messages === null) {
      throw new Error('No messages provided')
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })

    const completion = response.data.choices[0].message
    return res.status(200).json({ success: true, message: completion })
  } catch (err) {
    console.log(err.message)
  }
})

app.listen(port, () => console.log(`Server has started on port ${port}`))
