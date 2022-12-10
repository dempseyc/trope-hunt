const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const db = require("mongoose");
const cors = require("cors");
const async = require("async");

const dbURL = process.env.DB_URL;
console.log(dbURL);
db.connect(dbURL, {});

const Trope = require("../models/Trope");

db.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

function log(error, results) {
  if (error) {
    console.log("ERROR:", error);
  } else {
    console.log("results:", JSON.stringify(results));
  }
}

const removeWhereNull = async () => {
  try {
    let tropes = await Trope.findById(null).remove().exec();
    console.log(tropes);
    log(null, tropes);
  } catch (error) {
    log(error);
  }
};

async.series([removeWhereNull], function (error, results) {
  if (error) {
    console.log("FINAL ERR:", error);
  } else {
    console.log("removed ?");
  }
  db.connection.close();
});
