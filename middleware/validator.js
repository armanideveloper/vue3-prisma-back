module.exports = (req, res, next) => {
    let reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,6}$/i;
    if(req.body.name !== undefined && req.body.name.length === 0) {
        return res.status(400).json({
            message: 'Name is required'
        })
    }

    if(req.body.email.length === 0) {
        return res.status(400).json({
            message: 'Username is required'
        })
    } else if(req.body.email.match(reg) === null){
        return res.status(400).json({
            message: 'Username is not valid'
        })
    }

    if(req.body.password.length === 0) {
        return res.status(400).json({
            message: 'Password is required'
        })
    } else if(req.body.password.length < 6){
        return res.status(400).json({
            message: 'Password must be 6 or more characters'
        })
    }

    if(req.body.confirmPassword !== undefined){
        if(req.body.confirmPassword.length === 0) {
            return res.status(400).json({
                message: 'Confirm Password is required'
            })
        } else if(req.body.confirmPassword.length < 6){
            return res.status(400).json({
                message: 'Confirm Password must be equal Password'
            })
        }
    }


    next();
}