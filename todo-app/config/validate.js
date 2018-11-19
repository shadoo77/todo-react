"use strict";

const Joi = require('joi');

function validateEntries(something, url) {
    const objectArray = Object.keys(something);
    const result = objectArray.includes('task');
    if(!result && url === 'signup') {
        const schema = Joi.object().keys({
            firstName: Joi.string().alphanum().min(3).max(30).required(),
            lastName: Joi.string().alphanum().min(3).max(30).required(),
            userName: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        });
        return Joi.validate(something, schema);
    }else if(!result && url === 'login') {
        if (objectArray.includes('username')) {
            const schema = Joi.object().keys({
                username: Joi.string().alphanum().min(3).max(30).required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
            });
            return Joi.validate(something, schema);
        } else if(objectArray.includes('email')) {
            const schema = Joi.object().keys({
                email: Joi.string().email({ minDomainAtoms: 2 }),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
            });
            return Joi.validate(something, schema);
        }
    }else if(url === 'update') {
        const schema = Joi.object().keys({
            task: Joi.string().min(4).required(),
            done: Joi.boolean()
        });
        return Joi.validate(something, schema); 
    }else {
        const schema = Joi.object().keys({
            id: Joi.string().guid(),
            task: Joi.string().min(4).required(),
            done: Joi.boolean()
        });
        return Joi.validate(something, schema); 
    }
}

module.exports = validateEntries;