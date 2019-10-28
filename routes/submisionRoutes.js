const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const db = require('../db');

module.exports = (app) => {
 
    app.get('/api/submission', requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const submission = await db.getSubmission(req.query.id);
            res.send(submission);
            next();
        }catch(error){
            next();
        }
        
    });

    app.post('/api/submission', requireLogin, async (req, res, next) => {
        try{
            const submission = await db.insertSubmission(req.body);
            res.send(submission);
            next();
        }catch(error){
            next(error);
        }
        
    });

    app.put('/api/submission', requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const submission = await db.insertSubmission(req.body.id, req.body.submission);
            res.send(submission);
            next();
        }catch(error){
            next(error);
        }
        

    });

    app.get('/api/submissions', requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const submissionList = await db.getSubmissions();
            res.send(submissionList);
            next();
        }catch(error){
            next(error);
        }
        
    });

    app.post('/api/submission/edit', requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const submission = await db.updateSubmission(req.body.id, req.body.values);
            res.send(submission);
            next();
        }catch(error){
            next(error);
        }
        
    });

    app.get('/api/find/pending', requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const records = await db.getPengingSubmissionUsers();
            res.send(records);
            next();
        }catch(error){
            next(error);
        }
        
    })

    
}