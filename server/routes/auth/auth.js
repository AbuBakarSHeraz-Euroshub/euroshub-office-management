const express = require('express');
const router = express.Router();
const {register, login, getProfile} = require('../../controllers/auth/auth');
const multer = require('multer');
const upload = multer();
const authenticate = require('../../utils/authMiddleware');

router.post('/register',upload.none(), register);
router.post('/login',upload.none(), login);
router.get('/profile',authenticate, getProfile);


module.exports = router;