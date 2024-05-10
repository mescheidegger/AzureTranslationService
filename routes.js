// routes.js
const express = require('express');
const translationController = require('./controllers');
const limiter = require('./rateLimit');
const router = express.Router();

router.get('/languages', limiter, translationController.getSupportedLanguages);
router.post('/translate-batch', limiter, translationController.translateBatch); 
router.post('/translate', limiter, translationController.translate);
router.post('/detect', limiter, translationController.detect);

module.exports = router;
