const con = require('../config/config');
const bcrypt = require('bcrypt');

class userModel {
    static async registerUser(req, res, next) {
        try {
            let { full_name, email, telephone, address, institution_name, join_date } = req.body;
            let password = await bcrypt.hash(req.body.password, 10)
            let security_code = await bcrypt.hash(req.body.security_code, 10)
            //QUERY1
            let query = `SELECT * FROM ${'`file-management`'}.user`;
            con.query(query, function (err, result, fields) {
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
                con.query(query2, function (err2, result2, fields2) {
                    if (err2) throw err2;
                    res.send(result2);
                });
            })
        } catch {
            res.status(500).send()
        }
    };

    static loginUser(req, res, next) {
        try {
            let { email, password } = req.body;
            //VALIDASI
            if (!email) return res.send('Email empty, please try again!');
            if (!password) return res.send('Password empty, please try again!');
            //QUERY
            let query = `SELECT *
                    FROM ${'`file-management`'}.user 
                    WHERE email = '${email}'`;
            //EXECUTION QUERY
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                if (result == 0) return res.send('Account not found');
                if (bcrypt.compareSync(req.body.password, result[0].password)) {
                    res.send(result)
                } else {
                    res.send('Password wrong!')
                }
            });
        } catch {
            res.send(500).send()
        }
    };

    static async updatePassUser(req, res, next) {
        let { email, password, security_code } = req.body;
        let newPass = await bcrypt.hash(req.body.newPass, 10)
        //VALIDASI
        if (!email) return res.send('Email empty, please try again!');
        if (!password) return res.send('Password empty, please try again!');
        if (!newPass) return res.send('New password empty, please try again!');
        if (!security_code) return res.send('Security code  empty, please try again!');
        //QUERY
        let query2 = `SELECT password, security_code
                    FROM ${'`file-management`'}.user
                    WHERE email = '${email}'`
        con.query(query2, function (err2, result2, fields2) {
            if (bcrypt.compareSync(password, result2[0].password)) {
                if (bcrypt.compareSync(security_code, result2[0].security_code)) {
                    let query = `UPDATE ${'`file-management`'}.user
                                SET password = '${newPass}'
                                WHERE email = '${email}'
                                AND password = '${result2[0].password}'`;
                    //EXECUTION QUERY
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                        //result.message[15] => if 0 account not found, if 1 account found
                        if (result.message[15] == 0) return res.send('Account not found!')
                        if (result.changedRows === 1) return res.send('Password Changed!')
                        res.send(result)
                    })
                } 
            } else {
                res.send('Password wrong!')
            }
        })
    };
}

module.exports = userModel;