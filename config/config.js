var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Indhiro123"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("database connected!");
});

module.exports = con