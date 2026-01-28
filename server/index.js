const express = require('express')
const cors = require('cors')
const fs = require('node:fs')
const path = require('node:path')

const app = express()
const PORT = 3001

app.use(cors())

const dataPath = path.join(__dirname, 'data', 'reviews.json')

app.get('/api/reviews', (req, res) => {
    try {
        const d = fs.readFileSync(dataPath, 'utf-8')
        const data = JSON.parse(d)
        res.json(data.reviews)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to load reviews' })
    }
})

app.listen(PORT, () => {
    console.log(`Success - ${PORT}`)
})
