var bcrypt = require('bcrypt')

function hash_password(password){
    var hash = bcrypt.hashSync(password,10);
    return hash
}

function compare_passwword(password,hash){
    return bcrypt.compareSync(password,hash);
}

module.exports={
    hash_password:hash_password,
    compare_passwword:compare_passwword
}