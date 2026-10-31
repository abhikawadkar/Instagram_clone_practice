const imageKit = require("imagekit")

const imageKitClient = new imageKit({
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
    urlEndpoint: process.env.IK_URL ,
})

async function uploadFile(file){
   const result = await  imageKitClient.upload({
     file,
    fileName : "media" + Date.now(),
   })

   return result;
}

module.exports = uploadFile;