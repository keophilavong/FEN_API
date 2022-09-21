const Partner = require('../../models/Partner/partner')
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).json({
        message: "Partner Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    let PartnerList = await Partner.find();

    if (!PartnerList) {
        res.status(200).json({
            message: "Not Found Any Data"
        })
    }

    res.send(PartnerList);
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
        const PartnerOne = await Partner.findById(id);

        if (!PartnerOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        } 
        
        res.status(200).send(PartnerOne);

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
        const existPartner = await Partner.exists({title: title})
        if (existPartner) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        let partner = new Partner({
            title: title,
            link: link,
        })

        if (!partner) {
            res.status(404).json({
                message: "Not Found Any Data"
            })
        }

        await partner.save();

        res.status(201).json({
            message: "Insert Partner Successfully"
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

        const PartnerOne = await Partner.deleteOne({_id: id})

        if (!PartnerOne) {
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
        const existPartner = await Partner.exists({title: title})
        if (existPartner) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        const PartnerOne = await Partner.updateOne(
            {
                _id: id
            }, 
            {
                title: title,
                link: link,
            }
        )

        if (!PartnerOne) {
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