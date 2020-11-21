
const Category = require('../Models/categoryModel')

const { errorHandler } = require('../helpers/helpers')


exports.create = (req, res) =>{

    const category = new Category(req.body)

    category.save((err, data)=>{
        if(err){
            return res.status(400).json({error: "Name should be Unique"})
        }
        res.json({data})
    })

}

exports.categoryById = (req, res, next, id) =>{

    Category.findById(id).exec((err, category)=>{

        if(err){
            return res.status(400).json({
                message: "Category doesnt Exit"
            })
        }

        req.category = category

        next();
    })

}


    exports.read = (req, res)=>{
        
        return res.status(200).json({
            
            SingleCategory: req.category

        })

    }

    exports.remove = (req, res) =>{

        let category = req.category

        category.remove((err, removed)=>{
            if(err){

                return res.status(400).json({
                    message: "category cant be removed"
                })
            } else{
                return res.status(200).json({
                    message: "category removed successfully"
                })
            }
        })
    }

    exports.getAllCategory = (req, res) =>{

            Category.find((err, category)=>{
                if(err){
                    return res.status(400).json({
                        message: "could not fetched Data"
                    })
                }else{
                    return res.status(200).json(category)
                }

            })
    }

    exports.updated = (req, res) =>{

        let category = req.category

        category.name = req.body.name

        category.save()       
        .then(category =>{
            return res.status(200).json({
                UpdatedCategory: category
            })
        })
        .catch(err =>{
            return res.status(400).json({
                error: errorHandler(err)
            })
        })


    }