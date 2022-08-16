const con = require('../config/config');

class fileManageModel {
    static async getFilesData(req, res, next) {
        let query = `SELECT * FROM ${'`file-management`'}.files`;
        // let data = await con.query(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
          });
    }

    static getOneData(req, res, next) {
        let id = req.body.id
        let query = `SELECT * FROM ${'`file-management`'}.files WHERE id =` + id;
        // let data = await con.query(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
          });
    }

    static uploadData(req, res, next) {
        let formData = {
            owner: req.body.owner,
            file_number: req.body.file_number,
            date: req.body.date,
            path: req.body.path,
            telephone: req.body.telephone,
            notes: req.body.notes
        }
        let query = `INSERT INTO ${'`file-management`'}.files SET ?`;
        con.query(query, formData, function(err, result) {
            if (err) throw err;
            res.send(result);
        })
    }

    static updateData(req, res, next) {
        let { id, owner, file_number, date, path, telephone, notes } = req.body;
        
        //VALIDASI  id
        if(!id) res.send('Error, id tidak boleh kosong!');
        
        //QUERY UPDATE
        let query = `UPDATE ${'`file-management`'}.files SET `;

        //QUERY SET
        if(owner) query += ` owner = '${owner}',`;
        if(file_number) query += ` file_number = '${file_number}',`;
        if(date) query += ` date = '${date}',`;
        if(path) query += ` path = '${path}',`;
        if(telephone) query += ` telephone = ${telephone},`;
        if(notes) query += ` notes = '${notes}',`;

        //QUERY WHERE
        query = query.slice(0, -1);
        query += ` WHERE id = ${id}`;
        //Execute query
        con.query(query, function(err, result,fields) {
            if (err) throw err;
            res.send(result);
        })
    }

    static deleteData(req, res, next) {
        let id = req.body.id;
        let query = `DELETE FROM ${'`file-management`'}.files WHERE id = ` + id;
        // let data = await con.query(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
          });
        
    }
}

module.exports = fileManageModel