


exports.categoryValidator = (req, res, next) =>{
    req.check('name', "Category Name is Required").notEmpty()
  
    const errors = req.validationErrors()
    if (errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(500).json({
            error: firstError
        })
    }
    next();
}