require("dotenv").config();
const dns = require("node:dns")
const app = require("./src/app");
const connectDB = require("./src/config/db");

dns.setServers(["1.1.1.1","1.0.0.1"])

connectDB()

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})