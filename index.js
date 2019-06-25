const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "0401234567"
    },
    {
        id: 2,
        name: "Joonas Partanen",
        number: "0405067852"
    },
    {
        id: 3,
        name: "Nuutti Kissa",
        number: "0405142560"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000000000))
}

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelon etusivu</h1>')
})

app.get('/info', (req, res) => {
    const numbers = persons.length
    res.send(`<p>Puhelinluettelossa on ${numbers} henkilön tiedot.</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    morgan.token('body', (req) => {
        return JSON.stringify(req.body)
    })

    if (!body.name) {
        return res.status(400).json({
            error: 'Henkilön nimi puuttuu'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'Henkilön numero puuttuu'
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'Henkilö on jo luettelossa'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    res.json(person)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})