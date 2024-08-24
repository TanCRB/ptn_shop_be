const mongoose = require("mongoose");

async function Connect () {
      try {
            const connect = await mongoose.connect("mongodb://localhost:27017/pnt_shop");
            if(connect) {
                  console.log("Connected SuccessFully!");
            }
      } catch (error) {
            console.log("Connected Failure!");
      }
}

module.exports = { Connect };
