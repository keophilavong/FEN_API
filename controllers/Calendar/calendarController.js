const Calendar = require('../../models/Calendar/calendar');
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).json({
        message: "Calendar Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    let CalendarList = await Calendar.find()

    if (!CalendarList) {
        res.status(200).json({
            message: "Not Found Any Data"
        })
    }

    res.send(CalendarList);
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
        const CalendarOne = await Calendar.findById(id);

        if (!CalendarOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        }

        res.status(200).send(CalendarOne)

    } catch (error) {
        next(error);
    }
}

exports.insert = async (req, res, next) => {

    try {

        const {category, semester} = req.body;

        const file = req.files['cover'][0];
        if (!file) {
            const file = req.files['cover'][0];
            return res.status(400).send('No Calendar cover in the request')
        }
    
        const fileName = req.files['cover'][0].filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/calendar/`;

        //Validation Data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Information not correct');
            error.statusCode = 422; //message type not collect
            error.validation = errors.array();
            throw error;
        }

        //check exist title news
        // const existNews = await News.exists({title: title})
        // if (existNews) {
        //     const error = new Error("This name has exist");
        //     error.statusCode = 400;
        //     throw error;
        // }

        let calendar = new Calendar ({
            cover: `${basePath}${fileName}`,
            category: category,
            semester: semester
        })

        if (!calendar) {
            res.status(404).json({
                message: "Not Found Any Data"
            })
        }

        await calendar.save();

        res.status(201).json({
            message: "Insert Calendar Semester Successfully"
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

        const CalendarOne = await Calendar.deleteOne({_id: id})

        if (!CalendarOne) {
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

exports.update = async (req, res) => {

    const {id} = req.params;

    const {category, semester} = req.body;

    const file = req.files['cover'][0];
    if (!file) {
        return res.status(400).send('No cover in the request')
    }
  
    const fileName = req.files['cover'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/calendar/`;

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

        const CalendarOne = await Calendar.updateOne(
            {
                _id: id
            }, 
            {
                cover: `${basePath}${fileName}`,
                category: category,
                semester: semester
            }
        )

        if (!CalendarOne) {
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