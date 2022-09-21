const News = require('../../models/News/news');
const Category = require('../../models/News/category');
const { validationResult } = require("express-validator");

exports.index = (req, res) => {
    res.status(200).json({
        message: "News Route is everything OK"
    })
}

exports.getAll = async (req, res) => {
    let newsList = await News.find().populate('category').sort({_id: -1})

    if (!newsList) {
        res.status(404).json({
            message: "Not Found Any Data"
        })
    }

    res.send(newsList);
}

exports.getByCategory = async (req, res) => {

    let filter = {}
    if (req.query.categories) {
        filter = {category: req.query.categories.split(',')}
    }

    // console.log(filter)

    let categoryList = await News.find(filter).populate('category');

    if (!categoryList) {
        res.status(200).json({
            message: "Not Found Any Data"
        })
    }

    res.send(categoryList)
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
        const NewsOne = await News.findById(id);

        if (!NewsOne) {
            res.status(404).json({
                message: "Not Found This Item"
            });
        }

        res.status(200).send(NewsOne)

    } catch (error) {
        next(error);
    }
}

exports.insert = async (req, res, next) => {
    const {title, content, isFeature, category} = req.body;

    const file = req.files['cover'][0];
    if (!file) {
        return res.status(400).send('No cover in the request')
    }
  
    const fileName = req.files['cover'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/news/`;

    const files = req.files['images']
    // if (files) {
    //     return res.status(400).send('No images in the request')
    // }

    let imagePaths = []
    
    if (files) {
        files.map(file => {
            imagePaths.push(`${basePath}${file.filename}`)
        })
    }

    try {

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

        let news = new News ({
            title: title,
            content: content,
            cover: `${basePath}${fileName}`,
            images: imagePaths,
            isFeature: isFeature,
            category: category,
        })

        if (!news) {
            res.status(404).json({
                message: "Not Found Any Data"
            })
        }

        await news.save();

        const cate = await news.save();
        await Category.updateOne({
            _id: category
            }, {
                $push: {
                    news_list: cate._id
                }
            }
        )

        res.status(201).json({
            message: "Insert News Successfully"
        })

    } catch (error) {
        next(error)
    }
}

exports.insertImage = async (req, res, next) => {

    const file = req.files['image'][0];
    if (!file) {
        return res.status(400).send('No Image in the request')
    }
  
    const fileName = req.files['image'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/news/`;

    try {

        //Validation Data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error('Information not correct');
        error.statusCode = 422; //message type not collect
        error.validation = errors.array();
        throw error;
        }

        res.status(201).json({
            image_url: `${basePath}${fileName}`
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

        const NewsOne = await News.deleteOne({_id: id})

        if (!NewsOne) {
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

    const {title, content, isFeature, category} = req.body;

    const file = req.files['cover'][0];
    if (!file) {
        return res.status(400).send('No cover in the request')
    }
  
    const fileName = req.files['cover'][0].filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/news/`;

    const files = req.files['images']
    // if (files) {
    //     return res.status(400).send('No images in the request')
    // }

    let imagePaths = []
    
    if (files) {
        files.map(file => {
            imagePaths.push(`${basePath}${file.filename}`)
        })
    }

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

        const newsOne = await News.updateOne(
            {
                _id: id
            }, 
            {
                title: title,
                content: content,
                cover: `${basePath}${fileName}`,
                images: imagePaths,
                isFeature: isFeature,
                category: category,
            }
        )

        if (!newsOne) {
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