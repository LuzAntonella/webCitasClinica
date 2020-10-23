const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/moduloU',(req, res) => {
    res.render('gimnasio/separarCurso');
});

module.exports = router;