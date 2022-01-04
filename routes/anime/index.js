const express = require('express');

const router = express.Router();

router.get('/', ((req, res) => {
    res.send("WELCOME TO THE ANIME API")
}));

router.use('/latest', require('./latest'))
router.use('/details', require('./details'))

module.exports = router;