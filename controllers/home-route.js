const router = require('express').Router();
const { posts, user } = require('../models');

router.get('/', async (req, res) => {
    res.render('home');
});

router.get("/login", async (req, res) => {
    res.render('login');
});

module.exports = router;