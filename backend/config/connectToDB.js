const mongoose = require("mongoose")

async function connectToDB() {
    try {
     await mongoose.connect(process.env.DB_URL);
     console.log("connected to DB")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB;