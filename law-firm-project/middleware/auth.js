

function reqAuth(req, res, next ){
    
    if(req.session?.user) return next();
    return res.status(401).json({message : `Not authenticated`});
};

function reqRole(...roles){

    return(req, res, next ) =>{
        const role = req.session.user?.role;
        console.log(role)
        console.log(req.session.user);
        console.log("Role check:", role, "Allowed:", roles);
        if(!req.session?.user) return res.status(401).json({message: 'Not authenticated'});
        if(!roles.includes(role)) return res.status(403).json({message: 'Forbidden'});
        next();
    };

};

export {reqAuth, reqRole};