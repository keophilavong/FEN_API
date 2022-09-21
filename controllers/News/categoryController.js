const Category = require('../../models/News/category');
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).json({
        message: "News Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    let categoryList = await Category.find().populate('news_list');

    if (!categoryList) {
        res.status(200).json({
            message: "Not Found Any Data"
        })
    }

    res.send(categoryList)
}

exports.getById = async (req, res, next) => {
    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        const {id} = req.params;
        const CategoryOne = await Category.findById(id).populate('news_list');

        if (!CategoryOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        }

        res.status(200).send(CategoryOne)

    } catch (error) {
        next(error);
    }
}

exports.insert = async (req, res, next) => {
    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        const {category_name} = req.body;

        //check exist department name
        const existCategory = await Category.exists({category_name: category_name})
        if (existCategory) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        let category = new Category ({
            category_name: category_name
        })

        if (!category) {
            res.status(404).json({
                message: "Not Found Any Data"
            })
        }

        await category.save();

        res.status(201).json({
            message: "Insert Category Successfully"
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteById = async (req, res, next) => {
    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        const {id} = req.params;

        const CategoryOne = await Category.deleteOne({_id: id})

        if (!CategoryOne) {
            res.status(404).json({
                message: "Not Found This Item"
            })
        }

        res.status(200).json({
            message: "Delete This Item Successfully"
        })

    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        const {id} = req.params;

        const {category_name} = req.body;

        //check exist department name
        const existCategory = await Category.exists({category_name: category_name})
        if (existCategory) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        const CategoryOne = await Category.updateOne(
            {
                _id: id
            }, 
            {
                category_name: category_name
            }
        )

        if (!CategoryOne) {
            res.status(404).json({
                message: "Not Found This Item"
            })
        }

        res.status(200).json({
            message: "Update This Item Successfully"
        })

    } catch (error) {
        next(error)
    }
}