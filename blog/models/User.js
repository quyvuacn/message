var q = require('q')
var mysql = require('mysql');
let con = mysql.createConnection({
host: "localhost",
user: "blog",
password: "123456",
database: "usermess",
port:3306
});  


function addUser(user){
    if(user){
        var defer = q.defer()
        console.log("Connected!");
        var sql = "SELECT email FROM users WHERE ?"
        con.query(sql,user.email,function (err,fields) {
        if (err){
            defer.reject(err)
        }
            else{
                if(!fields[0]){       
                        sql = "INSERT INTO users SET ?";
                        con.query(sql,user,function (err, result) {
                        if (err){
                            defer.reject(err)
                        } else {
                            defer.resolve(result)
                        }
                        });   
                }
                else{
                    defer.reject(err)
                }
            }

        });

        return defer.promise
    }

    return false    
}

function checkUser(email){
    if(email){
        var defer = q.defer()
        var sql = "SELECT * FROM users WHERE email = ?"
        con.query(sql,email,function (err,result) {
        if (err){
            defer.reject(err)
        }
        else{
            defer.resolve(result)
        }    
        });
        return defer.promise
    }

    return false

}




module.exports = {
    addUser : addUser,
    checkUser : checkUser
}

