const {MongoClient} = require('mongodb')
let sucess_connection

module.exports = {
    connectionDb: (cd) => {
        MongoClient.connect('mongodb://localhost:27017/try')
        .then(result => {
            sucess_connection =  result.db()
            return cd()
        })
        .catch(err => {
           return cd(err)
        })
    },
    getDb: () => sucess_connection
}