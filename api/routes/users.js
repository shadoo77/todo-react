"use strict";

const db = require('../../config/db-config');
const validateEntries = require('../../config/validate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuidv4 = require('uuid/v4');
const router = express.Router();

// Sign up a new user :
router.post('/signup', (req, res, next) => {
    const {error} = validateEntries(req.body, 'signup');
    if(error) return res.status(400).json({errorMessage: error.details[0].message});
    findDataForSignup(req.body.userName, req.body.email)
     .then(data => {
        if(data.length >= 1) {
            return res.status(409).json({Oeps: 'This user is already existed'});
        }else {
            const { firstName, lastName, userName, email, password } = req.body;
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) {
                    res.status(500).json({error: err});
                }else {
                    let addQuery1 = `INSERT INTO hashes (hash) VALUES(?)`;
                    let addQuery2 = `INSERT INTO users (id, firstname, lastname, username, email, pass_id) VALUES(?, ?, ?, ?, ?, LAST_INSERT_ID());`;
                    db.query(addQuery1, [hash], (err, results, fields) => {
                        if(err) throw err;
                    });
                    db.query(addQuery2, [uuidv4(), firstName, lastName, userName, email], (err, results, fields) => {
                        if(err) throw err;
                    });
                    res.status(200).json(
                        {
                            message: 'A new user added !',
                            user: {
                                userId: uuidv4(),
                                username: req.body.userName,
                                password: hash
                            }
                        }
                    );
                }
            });
        }
     })
     .catch(err => res.status(500).json({error: err}));
});

// Log in interface 

router.post('/login', (req, res, next) => {
    const {error} = validateEntries(req.body, 'login');
    if(error) return res.status(400).json({errorMessage: error.details[0].message});
    const request = req.body.username ? req.body.username : req.body.email;
    findData(request)
     .then(data => {
        if(data.length < 1) return res.status(401).json({ErroMessage: 'Authorization failed'});
        else{
            findHash(data[0].pass_id)
              .then(subData => {
                bcrypt.compare(req.body.password, subData[0].hash, (err, result) => {
                    if(err) return res.status(401).json({ErroMessage: 'Authorization failed'});
                    else if(result) {
                        const token = jwt.sign({userId: data[0].id, username: data[0].username},
                            process.env.JWT_KEY,
                                { expiresIn: '1h' });  
                        return res.status(200).json({message: 'Authorization successful!', token: token});
                    }else return res.status(401).json({ErroMessage: 'Authorization failed'});
                });
              })
              .catch(err => res.status(500).json({error: err}));
        }
     })
     .catch(err => res.status(500).json({error: err}));
});

// retrieve data to check for signup form
function findDataForSignup(username, email) {
    return new Promise ((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username =? OR email=?";
        db.query(query, [username, email], (err, results, fields) => {
            if(!err) resolve(results);
            else reject(err);
        });
    });
}

// retrieve data to check
function findData(usernameOrEmail) {
    return new Promise ((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username =? OR email=?";
        db.query(query, [usernameOrEmail, usernameOrEmail], (err, results, fields) => {
            if(!err) resolve(results);
            else reject(err);
        });
    });
}

function findHash(hashIndex) {
    return new Promise ((resolve, reject) => {
        const query = "SELECT hash FROM hashes WHERE id =?";
        db.query(query, [hashIndex], (err, results, fields) => {
            if(!err) resolve(results);
            else reject(err);
        });
    });
}


module.exports = router;