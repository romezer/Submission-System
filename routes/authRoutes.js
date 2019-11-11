const passport = require('passport');

module.exports = (app) => {

    app.post('/api/login', 
        passport.authenticate('local', { failureRedirect: '/Login' }),
        function(req, res) {

        res.send();
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/Login');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

}
