const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// mongo connection function
async function connect() {
  await mongoose.connect(dbUrl);
}

module.exports = { connect };
