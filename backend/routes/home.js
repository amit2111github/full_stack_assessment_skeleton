const express = require('express');
const { getAllHomeForUser, updateUsers } = require('../controller/home');
const router = express.Router();

// all home of a user
router.get('/find-by-user/:userId', getAllHomeForUser);

router.put('/update-users', updateUsers);

module.exports = router;
