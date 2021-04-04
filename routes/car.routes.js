const express = require('express')
const router = express.Router()
const car = require('../models/car.model')
const m = require('../helpers/middlewares')

/* All cars */
router.get('/', async (req, res) => {
    await car.getCars()
    .then(cars => res.json(cars))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A car by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await car.getCar(id)
    .then(car => res.json(car))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new car */
router.post('/', m.checkFieldsCar, async (req, res) => {
    await car.insertCar(req.body)
    .then(car => res.status(201).json({
        message: `The car #${car.id} has been created`,
        content: car
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a car */
router.put('/:id', m.mustBeInteger, m.checkFieldsCar, async (req, res) => {
    const id = req.params.id

    await car.updateCar(id, req.body)
    .then(car => res.json({
        message: `The car #${id} has been updated`,
        content: car
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a car */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await car.deleteCar(id)
    .then(car => res.json({
        message: `The car #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router