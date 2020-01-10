var mysql = require('mysql');

class Db {

    con;

    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "donate"
        });
         try {
            this.con.connect();
        } catch (error) {
            console.log(error)
        }
    }

    async queryAsync(sql, CallBack) {    

         this.con.query(sql, async (error, results, fields) => {
            if (error) 
               return console.log(error)
           CallBack( results)
        });

    }

}

exports.Db = Db 