const mongoose = require('mongoose');
const {Schema} = mongoose;

const DepartmentSchema = new Schema (
    {
        department_la: {type: String, require: true},
        department_en: {type: String, require: true}
    },
    {
        toJSON: { virtuals: true },
        timestamps: true,
        collection: "departments"
    }
)    

const Departments = mongoose.model("Department", DepartmentSchema);

module.exports = Departments;