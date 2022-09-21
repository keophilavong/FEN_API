const mongoose = require('mongoose');
const {Schema} = mongoose;

const CareerSchema = new Schema (
    {
        title: {type: String, require: true},
        link: {type: String, require: true}
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
        collection: "career"
    }
)

const Career = mongoose.model("Career", CareerSchema);

module.exports = Career;