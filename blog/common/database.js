var config =  require('config')
var mysql = require('mysql');


var con = mysql.createConnection({
host: config.get('mysql.host'),
user: config.get('mysql.user'),
password: config.get('mysql.password'),
database: config.get('mysql.database'),
port:config.get('mysql.port')
});  

con.connect()

function getConnection(){
    if(!con.connect()){
        con.connect()
    }

    return con
}


module.exports = {
    getConnection : getConnection
}