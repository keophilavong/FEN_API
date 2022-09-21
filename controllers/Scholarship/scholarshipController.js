const Scholarship = require('../../models/Scholarships/scholarship')
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).json({
        message: "Scholarship Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    let ScholarshipList = await Scholarship.find();

    if (!ScholarshipList) {
        res.status(200).json({
            message: "Not Found Any Data"
        })
    }

    res.send(ScholarshipList);
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
        const ScholarshipOne = await Scholarship.findById(id);

        if (!ScholarshipOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        } 
        
        res.status(200).send(ScholarshipOne);

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
        const existScholarship = await Scholarship.exists({title: title})
        if (existScholarship) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        let scholarship = new Scholarship({
            title: title,
            link: link,
        })

        if (!scholarship) {
            res.status(404).json({
                message: "Not Found Any Data"
            })
        }

        await scholarship.save();

        res.status(201).json({
            message: "Insert Scholarship Successfully"
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

        const ScholarshipOne = await Scholarship.deleteOne({_id: id})

        if (!ScholarshipOne) {
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
        const existScholarship = await Scholarship.exists({title: title})
        if (existScholarship) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        const ScholarshipOne = await Scholarship.updateOne(
            {
                _id: id
            }, 
            {
                title: title,
                link: link,
            }
        )

        if (!ScholarshipOne) {
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