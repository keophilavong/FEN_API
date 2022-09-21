const Research = require('../../models/Research/research');
const Teacher = require('../../models/Research/teacher');
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).send({
        message: "Research Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    let ResearchList = await Research.find().populate('teacher');

    if (!ResearchList) {
        res.status(200).json({
            message: "Not Found Any Data"
        })
    }

    res.send(ResearchList);
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
        const ResearchOne = await Research.findById(id).populate('teacher').populate('department');

        if (!ResearchOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        } 
        
        res.status(200).send(ResearchOne);

    } catch (error) {
        next(error);
    }
}

exports.getByTeacher = async (req, res, next) => {
    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        const searchField = req.query.fullname_en;
        const Researches = await Research.find().populate({path: 'teachers', match: {fullname_en: searchField}});

        if (!Researches) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        } 
        
        res.status(200).send(Researches);

    } catch (error) {
        next(error);
    }
}

exports.insert = async (req, res, next) => {

    const {name_research, link, etc, teacher} = req.body;

    const file = req.files['research_file'][0];
    if (!file) {
        return res.status(400).send('No File Research in the request')
    }
  
    const fileName = req.files['research_file'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/researches/`;

    try {

        //Validation data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Data Format are not correct");
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        // //check exist department name
        // const existResearch = await Research.exists({name_research: name_research})
        // if (existResearch) {
        //     const error = new Error("This name has exist");
        //     error.statusCode = 400;
        //     throw error;
        // }

        let research = new Research({
            name_research: name_research,
            research_file: `${basePath}${fileName}`,
            link: link,
            etc: etc,
            teacher: teacher,
        })

        if (!research) {
            res.status(404).json({
                message: "Not Found Any Data"
            })
        }

        const rs = await research.save();
        await Teacher.updateOne({
            _id: teacher
            }, {
                $push: {
                    research: rs._id
                }
            }
        )

        res.status(201).json({
            message: "Insert Research Successfully"
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

        const ResearchOne = await Research.deleteOne({_id: id})

        if (!ResearchOne) {
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

    const {name_research, link, etc, teacher} = req.body;

    const file = req.files['research_file'][0];
    if (!file) {
        return res.status(400).send('No File Research in the request')
    }
  
    const fileName = req.files['research_file'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/researches/`;

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

        const ResearchOne = await Research.updateOne(
            {
                _id: id
            }, 
            {
                name_research: name_research,
                research_file: `${basePath}${fileName}`,
                link: link,
                etc: etc,
                teacher: teacher,
            }
        )

        if (!ResearchOne) {
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