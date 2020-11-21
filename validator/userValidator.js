
exports.userSignUpValidator = (req, res, next) => {

    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'email must be between 3 to 32 characters')
    .matches(	
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        })

        req.check('password', 'Password is Required').notEmpty()
        req.check('password').isLength({min: 8}).withMessage('Password must contain at least 8 characters').matches(/\d/)
        .withMessage('Password must contain a Number')
    
        const errors = req.validationErrors()
        if (errors){
            const firstError = errors.map(error => error.msg)[0];
            return res.status(500).json({
                error: firstError
            })
        }
        next();
 }