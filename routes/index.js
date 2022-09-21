const router = require("express").Router()

// 权限
router.use("/auth", require("./auth"))

// 用户相关
router.use("/user", require("./user"))

module.exports = router