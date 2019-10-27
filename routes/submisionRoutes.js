const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const db = require('../db');

module.exports = (app) => {
 
    app.get('/api/submission', requireLogin, requireAdmin, async (req, res) =>{
        const submission = await db.getSubmission(req.query.id);
        res.send(submission);
    });

    app.post('/api/submission', requireLogin, async (req, res) => {
        const submission = await db.insertSubmission(req.body);
        res.send(submission);
    });

    app.put('/api/submission', requireLogin, requireAdmin, async (req, res) =>{
        const submission = await db.insertSubmission(req.body.id, req.body.submission);

        res.send(submission);

    });

    app.get('/api/submissions', requireLogin, requireAdmin, async (req, res) =>{
        const submissionList = await db.getSubmissions();
        res.send(submissionList);
    });

    app.post('/api/submission/edit', requireLogin, requireAdmin, async (req, res) =>{
        const submission = await db.updateSubmission(req.body.id, req.body.values);
        res.send(submission);
    });

    app.get('/api/find/pending', requireLogin, requireAdmin, async (req, res) =>{
        const records = await db.getPengingSubmissionUsers();
        res.send(records);
    })

    
}