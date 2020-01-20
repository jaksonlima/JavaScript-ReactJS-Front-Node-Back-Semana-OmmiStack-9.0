const express = require('express');
const multer = require('multer');
const uplaodConfig = require('./config/upload');

const { store }  = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController');
const DashBoardController = require('./controllers/DeshboardController');
const BookingController = require('./controllers/BookingController');
const ApprovelController = require('./controllers/ApprovelController');
const RejectController = require('./controllers/RejectControlller');

const routes = express.Router();
const upload = multer(uplaodConfig);

routes.post('/sessions', store);

routes.post('/spots' , upload.single('thumbnail'),  SpotController.store);

routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashBoardController.show);

routes.post('/spost/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovelController.store);

routes.post('/bookings/:booking_id/rejections', RejectController.store);

routes.post('/teste/:id', function(resquest, response){
});

routes.post('testev3/:id', (request, response) => {
});

module.exports = routes;