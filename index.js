require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')

app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

/*
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
*/

app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelon etusivu</h1>')
})

app.get('/info', (req, res) => {
    Person.countDocuments({}, function (error, numOfDocs) {
        res.send(`<p>Puhelinluettelossa on ${numOfDocs} henkilön tiedot.</p>
        <p>${new Date()}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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

    /*    if (persons.find(p => p.name === body.name)) {
            return res.status(400).json({
                error: 'Henkilö on jo luettelossa'
            })
        } */

    const person = new Person({
        //  id: generateId(),
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'Vääränmuotoinen id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})