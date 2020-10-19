const express = require('express');
const router = express.Router();

router.get('/cita',(req, res) => {
    res.send('Cita from database');
});

module.exports = router;