const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('200', { title: 'Trabajo de Programación III',alumno: 'Mateo Barbato Fitzsimons', fecha: '2022-01-01', rutasHabilitadas:['/games','/developers'] });
});

module.exports = router;
