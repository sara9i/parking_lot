const express = require('express')
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.post('/api/v1/park', async (req, res) => {
    return parkingController.park(req, res);
});
router.get('/api/v1/unpark/', async (req, res) => {
    return parkingController.unpark(req, res);
});
router.delete('/api/v1/get-info', async (req, res) => {
    return parkingController.get_info(req, res);
});

router.use('/api/v1/cars', require('./car.routes'))

module.exports = router