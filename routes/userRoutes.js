const mongoose = require('mongoose');
var Hash = require('password-hash');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/user',requireLogin, requireAdmin, async (req, res) =>{
        const { username, password } = req.body;
        const user = new User({
            username,
            password: Hash.generate(password)
        });
        res.send(await user.save());
    });

    app.post('/api/branch',requireLogin, requireAdmin, async (req, res) =>{
        const { username, password, branchName } = req.body;
        const user = new User({
            username,
            password: Hash.generate(password),
            branchName
        });
        res.send(await user.save());
    });

    app.get('/api/branches',requireLogin, requireAdmin, async (req, res) =>{
        const branches = await User.find({isAdmin: false});

        res.send(branches);
    })
}