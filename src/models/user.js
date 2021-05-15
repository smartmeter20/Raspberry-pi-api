const db = require('../config/db');
require('dotenv').config();

const {     CreatQuery,
    SelectQuerytable,
    DeletQuerytable,
    UpdateQuerytable } = require('../config/CRUD');

const creat = async(table, data) => {
    try {
        const colval = Object.keys(data).map(function(key) {
            return data[key];
        });
        const QueryUser = CreatQuery(table, data);
        const { rows } = await db.query(`${QueryUser}`, colval);
        return rows[0].id;
    } catch (err) {
        console.log(err);
        throw err.detail;
    }
}


const find = async(table, data) => {
    try {
        if (data) {
            const colval = Object.keys(data).map(function(key) {
                return data[key];
            });
            const SelectQuery = SelectQuerytable(table, data);
            const { rows } = await db.query(`${SelectQuery}`, colval);
            return rows;
        } else {
            const { rows } = await db.query(`select * from ${table}`);
            return rows;
        }


    } catch (err) {
        throw err;
    }

}

const findOneUser = async(username) => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1 ', [username])
        return rows[0];
    } catch (err) {
        throw "bad request"
    }

}

const findByCredentials = async(username, password) => {
    try {
        const user = await findOneUser(username);
        console.log(user.password)
        if (user.password!=password) {
            throw "Unable to login ";
        }
        return user;

    } catch (err) {
        throw "Unable to login ";
    }
}

const deletOne = async(table, data) => {
    try {
        const colval = Object.keys(data).map(function(key) {
            return data[key];
        });
        const deletQuery = DeletQuerytable(table, data);
        console.log(deletQuery)
        const { rows } = await db.query(`${deletQuery}`, colval);
        console.log(rows)
        return rows;
    } catch (err) {
        throw err;
    }

}


const update = async(table, username, data) => {

    try {


        const colval = Object.keys(data).map(function(key) {
            return data[key];
        });
        const UpdateQuery = UpdateQuerytable(table, username, data);
        console.log(UpdateQuery);
        console.log(colval);
        const row = await db.query(`${UpdateQuery}`, colval);
        return row
    } catch (err) {
        console.log(err);
        throw err;
    }


}

module.exports = {
    creat,
    find,
    update,
    deletOne,
    findByCredentials
}