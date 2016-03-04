var cozydb = require('cozydb');

module.exports = {
    
    debt : {
        all: cozydb.defaultRequests.all,
        byCreditor: cozydb.defaultRequests.by('creditor'),
        byCreditorDate: cozydb.defaultRequests.by('creditor', 'dueDate')
    }

};
