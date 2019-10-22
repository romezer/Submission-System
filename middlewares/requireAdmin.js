module.exports = (req, res, next) =>{
    if(!req.user.isAdmin){
        return res.status(401).send({ error: 'You must login as Admin'});
    }
    
    next();
};