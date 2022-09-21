const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema (
    {
        fullname_la: {type: String, require: true},
        fullname_en: {type: String, require: true},
        position: {type: String, require: true},
        email: {type: String, require: true},
        tel: {type: String, require: true},
        address: {type: String, require: true},
        profile_img: {type: String, require: true},
        department: {type: Schema.Types.ObjectId, ref: "Department", require: true}, // Department is Foreign key (FK)
        research: [{type: Schema.Types.ObjectId, ref: "Research"}]
    },  
    {
        toJSON: {virtuals: true},
        timestamps: true,
        collection: "teachers"
    }
);

const Teacher = mongoose.model("Teacher", UserSchema)

module.exports = Teacher;