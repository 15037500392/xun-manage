const router = require("express").Router()
const loginController = require("../controller/auth/login")
router.post("/login",loginController.login)

module.exports = router