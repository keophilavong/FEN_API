const Department = require('../../models/Research/department');
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).send({
        message: "Department Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    const DeptList = await Department.find();

    if (!DeptList) {
        res.status(500).json({
            message: "Not Found Any Data"
        })
    }

    res.send(DeptList)
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
        const DepartmentOne = await Department.findById(id);

        if (!DepartmentOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        } 
        
        res.status(200).send(DepartmentOne);

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

        const {department_la, department_en} = req.body;

        //check exist department name
        const existDept = await Department.exists({department_la: department_la, department_en: department_en})
        if (existDept) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        let dept = new Department({
            department_la: department_la,
            department_en: department_en
        })

        await dept.save();

        res.status(201).json({
            message: "Insert Department Successfully"
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

        const DepartmentOne = await Department.deleteOne({_id: id})

        if (!DepartmentOne) {
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

        const {department_la, department_en} = req.body;

        //check exist department name
        const existDept = await Department.exists({department_la: department_la, department_en: department_en})
        if (existDept) {
            const error = new Error("This name has exist");
            error.statusCode = 400;
            throw error;
        }

        const DepartmentOne = await Department.updateOne(
            {
                _id: id
            }, 
            {
                department_la: department_la,
                department_en: department_en
            }
        )

        if (!DepartmentOne) {
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