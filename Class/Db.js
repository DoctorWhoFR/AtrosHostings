var mysql = require('mysql');

class Db {

    con;

    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "onsetrp"
        });

    }

    queryAsync(sql) {

        try {
            this.con.connect();
        } catch (error) {
            console.log(error)
        }

        this.con.query(sql, function (error, results, fields) {
            if (error) throw error;
            return results;
        });

    }

}

exports.Db = Db 