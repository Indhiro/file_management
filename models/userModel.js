const con = require('../config/config');

class userModel {
    static registerUser(req, res, next) {
        let { full_name, email, telephone, address, institution_name, join_date, password, security_code} = req.body;
        //QUERY1
        let query = `SELECT * FROM ${'`file-management`'}.user`;
        con.query(query, function(err, result, fields) {
            if (err) throw err;
            //VALIDASI
            if (!full_name) return res.send('Full name coloumn cant be empty!');           
            if (!email) return res.send('Email coloumn cant be empty!');           
            if (!telephone) return res.send('Telephone coloumn cant be empty!');           
            if (!address) return res.send('Address coloumn cant be empty!');           
            if (!institution_name) return res.send('Institution name coloumn cant be empty!');           
            if (!join_date) return res.send('Join date coloumn cant be empty!');           
            if (!password) return res.send('Password coloumn cant be empty!');           
            if (!security_code) return res.send('Security code coloumn cant be empty!');  
            for (let i = 0; i < result.length; i++) {
                if (email == result[i].email) return res.send('Email used!, please use another email!');
            };     
            //QUERY2
            let query2 = `INSERT INTO ${'`file-management`'}.user SET
                        full_name = '${full_name}', email = '${email}', telephone = '${telephone}', address = '${address}', institution_name = '${institution_name}', 
                        join_date = '${join_date}', password = '${password}', security_code = '${security_code}'`;
            con.query(query2, function(err2, result2, fields2) {
                if (err2) throw err2;
                res.send(result2);
            });
        })
    };

    static loginUser(req, res, next) {
        let { email, password } = req.body;
        //VALIDASI
        if (!email) return res.send('Email empty, please try again!');
        if (!password) return res.send('Password empty, please try again!');
        //QUERY
        let query = `SELECT *
                    FROM ${'`file-management`'}.user 
                    WHERE email = '${email}'
                    AND password = '${password}'`;
        //EXECUTION QUERY
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            if (result == 0) return res.send('Account not found');
            res.send(result);
        });
    };

    static updatePassUser(req, res, next) {
        let { email, password, newPass } = req.body;
        //VALIDASI
        if (!email) return res.send('Email empty, please try again!');
        if (!password) return res.send('Password empty, please try again!');
        if (!newPass) return res.send('New Password empty, please try again!');
        //QUERY
        let query = `UPDATE ${'`file-management`'}.user
                    SET password = '${newPass}'
                    WHERE email = '${email}'
                    AND password = '${password}'`;
        //EXECUTION QUERY
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            //result.message[15] => if 0 account not found, if 1 account found
            if (result.message[15] == 0) return res.send('Account not found!')
            if (result.changedRows === 0) return res.send('Password same, please try again!')
            if (result.changedRows === 1) return res.send('Password Changed!')
            res.send(result)
        })
    };
}

module.exports = userModel;