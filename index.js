// JavaScript source code
const express = require('express')
const app = express()
app.use(express.json())
let totalBudget = 2500
const { envelopes, calculateTotalPlannedBudget } = require('./envelopes.js')
const e = require('express')

app.param('envName', (req, res, next, envName) => {
    const envIndex = envelopes.findIndex(e => e.name == envName)
    if (envIndex === -1) {
        const err = new Error('Envelope does not exist.')
        err.status = 404
        return next(err)
    } else {
        req.envIndex = envIndex
        next()
    }
})
app.get('/personalBudget', (req, res, next) => {
    if (!envelopes) {
        const err = new Error('No envelope found.')
        err.status = 404
        return next(err)
    }
    res.status(200).json(envelopes)
})

app.get('/personalBudget/:envName', (req, res, next) => {
    res.status(200).json(envelopes[req.envIndex])
})

app.post('/personalBudget', (req, res, next) => {
    const newEnvelope = {
        name: req.body.name,
        budget: Number(req.body.budget),
        spent: Number(req.body.spent) || 0,
        balance : req.body.budget - req.body.spent
    }
    if (calculateTotalPlannedBudget() + newEnvelope.budget > totalBudget) {
        const err = new Error('Cannot add envelope, out of budget')
        err.status = 400
        return next(err)
    } else {
        envelopes.push(newEnvelope)
        res.status(201).json({message : 'New envelope created.'})
    }
})

app.put('/personalBudget/:envName/:amount', (req, res, next) => {
    if (req.params.amount > envelopes[req.envIndex].balance) {
        const err = new Error('Cannot withdraw, out of budget')
        err.status = 400
        return next(err)
    }
    if (isNaN(req.params.amount)) {
        const err = new Error('Amount must be a number')
        err.status = 400
        return next(err)
    }
    envelopes[req.envIndex].spent += Number(req.params.amount)
    envelopes[req.envIndex].balance = Number(envelopes[req.envIndex].budget) - Number(envelopes[req.envIndex].spent)
    res.status(200).json({message : `Envelope updated. New balance : ${envelopes[req.envIndex].balance}.`})
})
app.delete('/personalBudget/:envName', (req, res, next) => {
    envelopes.splice(req.envIndex, 1)
    res.status(204).send()

})
app.use((err, req, res, next) => res.status(err.status).json({message :`Error ${err.status} : ${err.message}`}))
app.listen(3000, () => console.log('Server listening on port 3000...'))