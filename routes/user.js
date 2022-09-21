const router = require("express").Router()
const userController = require("../controller/auth/user")

// 更新用户信息
router.post("/update",userController.update)

module.exports = router