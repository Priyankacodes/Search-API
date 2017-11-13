const controllers = require('./controllers');
const router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/providers', controllers.providers.get);

module.exports = router;