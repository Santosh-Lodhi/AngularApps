var sql = function(){

    this.getSql = function(reqestType,callback){
        // passing user longin crediatal.
        //var reqParam = user.reqData.split(',');

        // creating connection with mySql
        var mysql = require("mysql");
        var connection = mysql.createConnection({
            "host": "localhost",
            "user": "root",
            "password": "root",
            "database": "itcc_test"
        });

        connection.connect();

        var sqlQuery = "";

        if (reqestType == "requirement") {
            sqlQuery = "SELECT name, details, created_on, last_modified_on FROM requirement";
        }else if (reqestType == "release") {
            sqlQuery = "SELECT name, description, start_date, end_date FROM releases";
        }else if (reqestType == "testcase") {
            sqlQuery = "SELECT id, name, tag, creation_date FROM testcase";
        }else if (reqestType == "users") {
            sqlQuery = "SELECT username, first_name, last_name, city, country, email FROM users";
        }
        
        // executing query
        connection.query(sqlQuery, function(err, rows, fields) {
          if (err) throw err;
          console.log('The solution is: ');
          console.log(rows);
          callback(rows);
        });
        // connection end
        connection.end();
    }

}

module.exports = new sql();