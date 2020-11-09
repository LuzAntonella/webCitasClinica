const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/moduloU',(req, res) => {
    res.render('panelAdmin/tableroAdmin');
});
router.get('/usuariosAdmin',(req, res) => {
    res.render('panelAdmin/usuariosAdmin');
});


module.exports = router;