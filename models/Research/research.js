const mongoose = require('mongoose');
const {Schema} = mongoose;

const ResearchSchema = new Schema (
    {
        name_research: {type: String, require: true},
        research_file: {type: String, require: true},
        link: {type: String, require: true},
        etc: {type: String, require: true},
        teacher: {type: Schema.Types.ObjectId, ref: "Teacher", require: true}
    },
    {
        toJSON: {virtuals: true},
        timestamps: true,
        collection: "researches"
    }
);

const Research = mongoose.model("Research", ResearchSchema);

module.exports = Research;