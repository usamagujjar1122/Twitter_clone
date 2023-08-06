const express = require('express')
const router = express.Router()
const { signup_step_1, signup_step_2, signup_step_3, signup_step_4, loaduser, test, forgot_step_1, forgot_step_2, forgot_step_3, login_via_password, signup_via_google, login_via_google, create_post, get_profile, follow } = require("../Controllers/userController")
router.get('/test', test)
router.get('/loaduser', loaduser)
router.post('/signup_step_1', signup_step_1)
router.post('/signup_step_2', signup_step_2)
router.post('/signup_step_3', signup_step_3)
router.post('/signup_step_4', signup_step_4)
router.post('/signup_via_google', signup_via_google)
router.post('/forgot_step_1', forgot_step_1)
router.post('/forgot_step_2', forgot_step_2)
router.post('/forgot_step_3', forgot_step_3)
router.post('/login_via_password', login_via_password)
router.post('/login_via_google', login_via_google)
router.post('/create_post', create_post)
router.post('/follow', follow)

router.get('/:id', get_profile)







module.exports = router