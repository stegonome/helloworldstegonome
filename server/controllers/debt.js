var express = require('express');
var router = express.Router();
var Debt = require('../models/debt');

// Create a new debt
router.post('/debts', function(req, res, next) {
    Debt.create(req.body, function(err, debt){
        if(err){
            next(err);
        } else {
            res.status(201).send(debt);
        }
    });
});


// Fetch an existing debt
router.get('/debts/:id', function(req, res, next) {
    Debt.find(req.params.id, function(err, debt){
        if(err){
            next(err);
        } else if (!debt){
            res.sendStatus(404);
        } else {
            res.status(200).send(debt);
        }
    });
});


// Update an existing debt
router.put('/debts/:id', function(req, res, next) {
    Debt.find(req.params.id, function(err, debt){
        if(err){
            next(err);
        } else if (!debt) {
            res.sendSatus(404);
        } else {
            debt.updateAttributes(req.body, function(err, debt){
                if(err) {
                    next(err);
                } else {
                    res.status(200).send(debt);
                }
            });
        }
    });
});


// Remove an existing debt
router.delete('/debts/:id', function(req, res, next) {
    Debt.destroy(req.params.id, function(err){
        if(err){
            next(err);
        } else {
            res.sendStatus(204);
        }
    });
});


// List of all debts, for a given creditor
router.get('/debts', function(req, res, next) {
    
    var options = {
        startkey: ['denis', '1990-01-01'],
        endkey: ['denis', '2018-01-01']
    };
    
    Debt.request('byCreditorDate', options, function(err,debts){
        if(err){
            next(err);
        } else {
            res.status(200).json(debts);
        }
    });
});


// Export the router instance to make it available from other files.
module.exports = router;
