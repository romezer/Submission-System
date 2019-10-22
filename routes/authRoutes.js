const passport = require('passport');

module.exports = (app) => {

    app.post('/api/login', 
        passport.authenticate('local', { failureRedirect: '/' }),
        function(req, res) {
        // if(req.user.isAdmin){
        //     console.log('Admin');
        //     res.redirect('/');
        // }else{
        //   //  console.log('Not Admin');
        //     res.redirect('/');
        // }

        res.redirect('/');
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

}
