const mongoose = require('mongoose');
var Hash = require('password-hash');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/user',requireLogin, requireAdmin, async (req, res, next) =>{
        const { username, password } = req.body;
        const user = new User({
            username,
            password: Hash.generate(password)
        });
        try{
            res.send(await user.save());
            next();
        }catch(error){
            next(error);
        }
        
    });

    app.post('/api/branch',requireLogin, requireAdmin, async (req, res, next) =>{
        const { username, password, branchName } = req.body;
        const user = new User({
            username,
            password: Hash.generate(password),
            branchName
        });
        try{
            res.send(await user.save());
            next();
        }catch(error){
            next(error);
        }
    });

    app.get('/api/branches',requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const branches = await User.find({isAdmin: false});

            res.send(branches);
            next();
        }catch(error){
            next(error);
        }
    })

    app.get('/api/branch', requireLogin, requireAdmin, async(req, res, next) =>{
        try{
            const branch = await User.findById(req.query.id);

            res.send(branch);
            next();
        }catch(error){
            next(error);
        }
    });

    app.put('/api/branch', requireLogin, requireAdmin, async(req, res, next) =>{
        try{

            const { id, branchName, username, password} = req.body;
            const pass = Hash.generate(password);
            const branch = await User.findByIdAndUpdate(id , {branchName, username, password: pass });
            res.send(branch);
            next();
        }catch(error){
            next(error);
        }
    });

    app.delete('/api/branch', requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const response = await User.findByIdAndRemove(req.body.id);
            res.send(response);
            next();
        }catch(error){
            next(error);
        }
        
    });
}