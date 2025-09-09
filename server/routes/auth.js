const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/auth');
const multer = require('multer');
const upload = multer();

router.post('/register',upload.none(), register);
router.post('/login',upload.none(), login);

module.exports = router;