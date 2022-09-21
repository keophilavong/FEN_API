const Teacher = require('../../models/Research/teacher');
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).send({
        message: "Teacher Route is everything OK"
    })
}

exports.getAll = async (req, res, next) => {
    let teacherList = await Teacher.find().populate('department').populate('research');

    if (!teacherList) {
        res.status(500).json({message: "Not Found Any Data"})
    }

    res.send(teacherList);
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
        const TeacherOne = await Teacher.findById(id).populate('department');

        if (!TeacherOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        } 
        
        res.status(200).send(TeacherOne);

    } catch (error) {
        next(error);
    }
}

exports.insert = async (req, res, next) => {

    const {fullname_la, fullname_en, position, email, tel, address, department} = req.body;

    const file = req.files['profile_img'][0];
    if (!file) {
        return res.status(400).send('No File Research in the request')
    }
  
    const fileName = req.files['profile_img'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/profiles/`;

    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        //check exist department name
        // const existTeacher = await Teacher.exists({fullname_la: fullname_la, fullname_en: fullname_en});
        // if (existTeacher) {
        //     const error = new Error("This name has exist");
        //     error.statusCode = 400;
        //     throw error;
        // }

        let teacher = new Teacher ({
            fullname_la: fullname_la,
            fullname_en: fullname_en,
            position: position,
            email: email,
            tel: tel,
            address: address,
            profile_img: `${basePath}${fileName}`,
            department: department
        })

        await teacher.save();

        if (!teacher) {
            res.status(200).json({
                message: "Not Found Any Data"
            })
        }

        res.status(201).json({
            message: "Insert Teacher Successfully"
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

        const TeacherOne = await Teacher.deleteOne({_id: id})

        if (!TeacherOne) {
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

    const {id} = req.params;

    const {fullname_la, fullname_en, position, email, tel, address, department, research} = req.body;

    const file = req.files['profile_img'][0];
    if (!file) {
        return res.status(400).send('No File Research in the request')
    }
  
    const fileName = req.files['profile_img'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/profiles/`;

    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        //check exist department name
        // const existDept = await Department.find({department_la: department_la, department_en: department_en})
        // if (existDept) {
        //     const error = new Error("This name has exist");
        //     error.statusCode = 400;
        //     throw error;
        // }

        const TeacherOne = await Teacher.updateOne(
            {
                _id: id
            }, 
            {
                fullname_la: fullname_la,
                fullname_en: fullname_en,
                position: position,
                email: email,
                tel: tel,
                address: address,
                profile_img: `${basePath}${fileName}`,
                department: department,
            }
        )

        if (!TeacherOne) {
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