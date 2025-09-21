const express = require('express');
const router = express.Router();
const compile_newsletter = require('../compile_newsletter');

// to compile a newsletter
router.post('/', async function(req, res, next) {
  try {
    res.json(await compile_newsletter.compileNewsletter(req.body.newsletterId));
  } catch (err) {
    console.error(`Error while compiling newsletter`, err.message);
    next(err);
  }
});

// to fetch a compiled newsletter
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await compileNewsletter(req.params.id));
  } catch (err) {
    console.error(`Error while compiling newsletter`, err.message);
    next(err);
  }
});


module.exports = router;
