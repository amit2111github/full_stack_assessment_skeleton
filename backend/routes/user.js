const express = require('express');
const { getAllUser, getAllUserForHome } = require('../controller/user');
const router = express.Router();

// all users listing
router.get('/find-all', getAllUser);

// all user for a home
router.get('/find-by-home/:homeId', getAllUserForHome);

module.exports = router;
