var mysql = require('mysql');

var con;
class Db {


    constructor() {
        con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "atros"
        });
         try {
            con.connect();
        } catch (error) {
            console.log(error)
        }
    }

    async queryAsync(sql, CallBack) {    

         con.query(sql, async (error, results, fields) => {// remplacer la fonction par le CallBack serais une bonne id�e ? mois de tick cpu plus optimiser
            if (error) 
               return console.log(error)
            if ( CallBack != null )//dans le cas ou on ne veut aucune �x�cution apr�s le insert
               CallBack( results)
        });

    }

}

exports.Db = Db 