const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/createBet',ctrlUser.createBet);
router.post('/changepassword',ctrlUser.changepassword);
router.post('/forgotpassword',ctrlUser.forgotpassword);
router.post('/changepublickeyapi',ctrlUser.changepublickey)

router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/betDetails', ctrlUser.betDetails);

module.exports = router;



