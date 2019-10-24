const MongoClient = require('mongodb').MongoClient;
const keys = require('./config/keys');
var ObjectId = require('mongodb').ObjectId; 



function insertSubmission(sub){
    return new Promise(function (resolve, reject) {
        MongoClient.connect(keys.mongoURI, {useNewUrlParser: true}, (error, client) => {
            if(error){
                reject('unable to connect');
            }
        
             const db = client.db('test');
        
             db.collection('submissions').insertOne(sub, function(error, result) {
                if(error){ reject('unable to reqest'); }
                resolve(result.ops);
             });
             
             client.close();
        });
    })
}

function getSubmission(id){
    return new Promise(function (resolve, reject) {
        MongoClient.connect(keys.mongoURI, {useNewUrlParser: true}, (error, client) => {
            if(error){
                reject('unable to connect');
            }
            const db = client.db('test');
            var o_id = new ObjectId(id);
             db.collection('submissions').find({_id: o_id}).toArray(function(error, docs){
                if(error){ reject('unable to request'); }
                resolve(docs);
             })
         
 
             client.close();
        });
    })
}

function updateSubmission(id, newSubmission){
    return new Promise(function (resolve, reject) {
        MongoClient.connect(keys.mongoURI, {useNewUrlParser: true}, (error, client) => {
            if(error){
                reject('unable to connect');
            }
        
             const db = client.db('test');
             var o_id = new ObjectId(id);
             db.collection('submissions').findOneAndUpdate({_id: o_id},
                                            {$set: newSubmission},{},{}), (err, res)=> {
                if(err){ reject('unable to request'); }
                console.log('*** RES: ', res);
                resolve(res);
             }
             client.close();
        });
    })
}

function getSubmissions(){
    return new Promise(function (resolve, reject) {
        MongoClient.connect(keys.mongoURI, {useNewUrlParser: true}, (error, client) => {
            if(error){
                reject('unable to connect');
            }
        
             const db = client.db('test');
             const currentDate = new Date();
             const currentMonth = currentDate.getMonth() ;
             const year = currentDate.getFullYear();
            const startDate = new Date("2018-09-01") 
             db.collection('submissions').find({}).toArray(function(error, docs){
                if(error){ reject('unable to request'); }
                resolve(docs);
             })
         
 
             client.close();
        });
    })
    
}


module.exports = {
    insertSubmission,
    getSubmission,
    updateSubmission,
    getSubmissions
}

