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
             db.collection('submissions').findOneAndUpdate(
                                            {_id: o_id},
                                            {$set: newSubmission},
                                            {returnNewDocument : true}, function(error, result) {
                if(error){ reject('unable to request'); }
                resolve(result);
             })
             client.close();
        });
    })
}

function deleteSubmission(id){
    return new Promise(function (resolve, reject) {
        MongoClient.connect(keys.mongoURI, {useNewUrlParser: true}, (error, client) => {
            if(error){
                reject('unable to connect');
            }
            const db = client.db('test');
            var o_id = new ObjectId(id);
            db.collection('submissions').deleteOne({_id: o_id}, function(error, result) {
                if(error){ reject('unable to request'); }
                resolve(result);
            })
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


function getPengingSubmissionUsers(){
    return new Promise(function(resolve, reject){
        MongoClient.connect(keys.mongoURI, {useNewUrlParser: true}, (error, client) => {
            if(error){
                reject('unable to connect');
            }
            const db = client.db('test');
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const fulleYear = currentDate.getFullYear();
            
            // db.collection('submissions').find({"date": {$gte: "2019-"+currentMonth+"-01T00:00:00.000Z"}}).toArray(function(error, docs){
            //      console.log('Docs Length: '  + docs.length)
            //     console.log('##### DOCS: ' + JSON.stringify(docs));
            // })

            db.collection('users').aggregate([
                {
                    $lookup:
                    {
                        from:"submissions",
                        localField: "username", 
                        foreignField: "authProp",
                        as: "userJoinSubs"
                    }
                },
                {
                    $project:
                    {
                        username:1,
                        branchName: 1,
                        userJoinSubs:{
                            $filter:{
                                input: "$userJoinSubs",
                                as: "userJoinSubs",
                                cond: {$gte: [ "$$userJoinSubs.date", fulleYear+"-"+currentMonth+"-01T00:00:00.000Z" ]}
                            }
                        }
                    }
                }
             ]).toArray(function(error, docs){
                 if(error){
                    reject('unable to request');
                 }
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
    getSubmissions,
    getPengingSubmissionUsers,
    deleteSubmission
}

