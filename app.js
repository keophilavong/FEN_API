const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var logger = require('morgan');
const mongoose = require("mongoose");

//import middleware
const errorHandler = require("./middleware/errorHandler");

//require config
const config = require("./config/index");

const indexRouter = require('./routes/index');
const researchRouter = require('./routes/Research/research');
const departmentRouter = require('./routes/Research/department')
const teacherRouter = require('./routes/Research/teacher')
const newsRouter = require('./routes/News/news')
const categoryRouter = require('./routes/News/category')
const scholarshipRouter = require('./routes/Scholarship/scholarship')
const careerRouter = require('./routes/Career/career')
const partnerRouter = require('./routes/Partner/partner')
const calendarRouter = require('./routes/Calendar/calendar')
const userRouter = require('./routes/User/user');

var app = express();
app.use(cors());

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true, //for delete warning from console
    useUnifiedTopology: true, //for delete warning from console
    useCreateIndex: true, //for delete warning from console
    useFindAndModify: false, //for delete warning from console
}).then(() => {
    console.log("Database Connection is Ready...")
}).catch((err) => {
    console.log(err)
});

app.use(logger('dev'));
app.use(
    express.json({
        limit: "50mb",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//access can get public file
app.use('/public', express.static(path.resolve(__dirname + '/public')));

app.use('/', indexRouter);
app.use('/api/research', researchRouter)
app.use('/api/department', departmentRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/news', newsRouter)
app.use('/api/category', categoryRouter)
app.use('/api/scholarship', scholarshipRouter)
app.use('/api/career', careerRouter)
app.use('/api/partner', partnerRouter)
app.use('/api/calendar', calendarRouter)
app.use('/api/user', userRouter)

//use errorHandler middleware
app.use(errorHandler);

module.exports = app;