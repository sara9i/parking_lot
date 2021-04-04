const filename = '../data/cars.json'
let cars = require(filename)
const helper = require('../helpers/helper.js')
function getCars() {
    return new Promise((resolve, reject) => {
        if (cars.length === 0) {
            reject({
                message: 'no cars available',
                status: 202
            })
        }
        resolve(cars)
    })
}
function getCar(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}
function insertCar(newCar) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(cars) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newCar = { ...id, ...date, ...newCar }
        cars.push(newCar)
        helper.writeJSONFile(filename, cars)
        resolve(newCar)
    })
}
function updateCar(id, newCar) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
        .then(post => {
            const index = cars.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            } 
            cars[index] = { ...id, ...date, ...newCar }
            helper.writeJSONFile(filename, cars)
            resolve(cars[index])
        })
        .catch(err => reject(err))
    })
}
function deleteCar(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(cars, id)
        .then(() => {
            cars = cars.filter(p => p.id !== id)
            helper.writeJSONFile(filename, cars)
            resolve()
        })
        .catch(err => reject(err))
    })
}
module.exports = {
    insertCar,
    getCars,
    getCar, 
    updateCar,
    deleteCar
}