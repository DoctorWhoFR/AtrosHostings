var mysql = require('mysql');

class  Db{

    con;

    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "onsetrp"
        });
    }
    
   async queryAsync(sql){
        this.con.connect(function (err) {
            if (err) throw err;
            
            var resultaza = this.con.query(sql, function (err, result, fields) {
                if (err) throw err;
                return result
            });
            console.log(resultaza[0] )
            return  resultaza
        });
    }

}

exports.Db = Db 