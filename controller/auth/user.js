const { User } = require("../../models/admin/User")
const login = require("./login")
exports.update = async (req,res,next) => {
    try {
        const openid = login.checkToken(req)
        if(openid){
            await User.updateOne({openid:openid},{$set:{
                nickName: req.body.nickName,
                avatar: req.body.avatarUrl,
                phone: req.body.phoneNumber
            }})
            let user = await User.findOne({ openid: openid })
            return res.status(200).json({
                code: 200,
                data: null,
                msg: '保存成功'
            })
        }else {
            return res.status(500).json({
                code: 500,
                data: null,
                msg: '操作失败'
            }) 
        }
    } catch (err) {
        next()
    }
}