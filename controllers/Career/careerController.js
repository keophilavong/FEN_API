const Career = require('../../models/Career/career')
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).json({
        message: "Career Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    let CareerList = await Career.find();

    if (!CareerList) {
        res.status(200).json({
            message: "Not Found Any Data"
        })
    }

    res.send(CareerList);
}

exports.getByID = async (req, res, next) => {
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
        const CareerOne = await Career.findById(id);

        if (!CareerOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        } 
        
        res.status(200).send(CareerOne);

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

        const {title, link} = req.body;

        //check exist department name
        const existCareer = await Career.exists({title: title})
        if (existCareer) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        let career = new Career({
            title: title,
            link: link,
        })

        if (!career) {
            res.status(404).json({
                message: "Not Found Any Data"
            })
        }

        await career.save();

        res.status(201).json({
            message: "Insert Career Successfully"
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

        const CareerOne = await Career.deleteOne({_id: id})

        if (!CareerOne) {
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

        const {title, link} = req.body;

        //check exist department name
        const existCareer = await Career.exists({title: title})
        if (existCareer) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        const CareerOne = await Career.updateOne(
            {
                _id: id
            }, 
            {
                title: title,
                link: link,
            }
        )

        if (!CareerOne) {
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