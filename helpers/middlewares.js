function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}
function checkFieldsCar(req, res, next) {
    const { name, model, number } = req.body
    if (name && model && number) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}
module.exports = {
    mustBeInteger,
    checkFieldsCar
}