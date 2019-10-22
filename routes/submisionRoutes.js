const requireLogin = require('../middlewares/requireLogin');
const db = require('../db');

module.exports = (app) => {
 
    app.get('/api/submission', requireLogin, async (req, res) =>{
        const submission = await db.getSubmission(req.query.id);
        res.send(submission);
    });

    app.post('/api/submission', requireLogin, async (req, res) => {
        const submission = await db.insertSubmission(req.body);
        res.send(submission);
    });

    app.put('/api/submission', requireLogin, async (req, res) =>{
        const submission = await db.insertSubmission(req.body.id, req.body.submission);

        res.send(submission);

    });

    app.get('/api/submissions', requireLogin, async (req, res) =>{
        const submissionList = await db.getSubmissions();
        res.send(submissionList);
    });

    app.post('/api/submission/edit', requireLogin, async (req, res) =>{
        const submission = await db.updateSubmission(req.body.id, req.body.formValues);
        console.log('Ret Sub: '. submission);
        res.send(submission);
    })

    
}