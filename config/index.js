module.exports = {
    app: {
        port: process.env.PORT || 9000
    },

    // 数据库配置
    db:{
        url: process.env.MONGODB_URL || "mongodb://localhost:27017/xun-manage"
    },

    // jwt 密钥
    secret: "d5df8f5d-5dd4-4e70-8763-33877c953298",
    weChat:{
        appId:'wx54b783900c853842',
        appSecret:'9a6382a74ad212da701985b42865b06c'
    }
}