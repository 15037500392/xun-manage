const axios = require("axios")
const config = require("../../config")
const jwt = require("jsonwebtoken")
const { User } = require("../../models/admin/User")
const { response } = require("express")

let generateToken = function(user) {
    return jwt.sign(user,config.secret,{
        expiresIn: 7200
    })
}

exports.login = async (req,res,next) => {
    try {
        if(JSON.stringify(req.body) === '{}'){
            return res.status(400).json({
                code: 405,
                data: null,
                msg: 'code不能为空'
            })
        }
        const queryString = `appid=${config.weChat.appId}&secret=${config.weChat.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`;
        const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`;
        console.log(wxAPI,'wxAPI')
         axios.get(wxAPI).then( async response =>{
             let user = await User.findOne({ openid: response.data.openid })
             if(!user){
                // 创建实例
                user =  new User({
                    ...response.data
                })
                user.insertOne()
             }
             return res.status(200).json({
                code: 200,
                data: generateToken({openid: response.data.openid}),
                msg: "登录成功"
            })
        }).catch(err => {
            console.log(err,'登录失败')
        })

    } catch (err) {
        next()
    }
}

exports.checkToken = (req) => {
    let token = req.headers.token
    if(token){
        let openid = null
        jwt.verify(token, config.secret,(err, decoded) => {
            if(!err){
                openid = decoded.openid
            }
        })

        return openid

    } else {
       return null
    }
}

