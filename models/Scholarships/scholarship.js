const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScholarshipSchema = new Schema (
    {
        title: {type: String, require: true},
        link: {type: String, require: true}
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
        collection: "scholarship"
    }
)

const Scholarship = mongoose.model("Scholarship", ScholarshipSchema);

module.exports = Scholarship;